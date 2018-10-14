import { Component, OnInit, forwardRef, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  FormControl
} from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import {
  subDays,
  subMonths,
  subYears,
  differenceInCalendarDays,
  parse,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
  isDate,
  isValid,
  isFuture
} from "date-fns";
import { isValidDate } from "../../utils/date.uitl";

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}
export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: "app-age-input",
  templateUrl: "./age-input.component.html",
  styleUrls: ["./age-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgeInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  selectedUnit = AgeUnit.Year;
  ageUnits = [
    { value: AgeUnit.Year, label: "岁" },
    { value: AgeUnit.Month, label: "月" },
    { value: AgeUnit.Day, label: "天" }
  ];
  form: FormGroup;
  sub: Subscription;
  private propagateChange = (_: any) => {};
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ["", this.validateDate],
      age: this.fb.group(
        {
          ageNum: [],
          ageUnit: [AgeUnit.Year]
        },
        { validator: this.validateAge("ageNum", "ageUnit") }
      )
    });
    const birthday = this.form.get("birthday");
    const ageNum = this.form.get("age").get("ageNum");
    const ageUnit = this.form.get("age").get("ageUnit");
    const birthday$ = birthday.valueChanges
      .map(d => {
        return { date: d, from: "birthday" };
      })
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(_ => birthday.valid);
      console.log(ageNum)
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(300)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(300)
      .distinctUntilChanged();
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({ age: _n, unit: _u });
    })
      .map(d => {
        return { date: d, from: "age" };
      })
      .filter(_ => this.form.get("age").valid);
    const merge$ = Observable.merge(birthday$, age$).filter(
      _ => this.form.valid
    );
    this.sub = merge$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === "birthday") {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false });
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, { emitEvent: false });
          this.propagateChange(d.date);
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, "YYYY-MM-DD");
      this.form.get("birthday").patchValue(date);
      const age = this.toAge(date);
      this.form
        .get("age")
        .get("ageNum")
        .patchValue(age.age);
      this.form
        .get("age")
        .get("ageUnit")
        .patchValue(age.unit);
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  toDate(age: Age): string {
    const now = new Date();
    const dateFormat = "YYYY-MM-DD";
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), dateFormat);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), dateFormat);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), dateFormat);
      }
      default: {
        return null;
      }
    }
  }
  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, 90), date) ? {
      age: differenceInDays(now, date), unit: AgeUnit.Day
    } : isBefore(subMonths(now, 24), date) ? {
      age: differenceInMonths(now, date),unit: AgeUnit.Month
    } : {
      age: differenceInYears(now, date),unit: AgeUnit.Year 
    }
    // if (isBefore(subDays(now, 90), date)) {
    //   return {
    //     age: differenceInDays(now, date),
    //     unit: AgeUnit.Day
    //   };
    // } else if (isBefore(subMonths(now, 24), date)) {
    //   return {
    //     age: differenceInMonths(now, date),
    //     unit: AgeUnit.Month
    //   };
    // } else {
    //   return {
    //     age: differenceInYears(now, date),
    //     unit: AgeUnit.Year
    //   };
    // }
  }
  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    };
  }
  validateDate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    return isValidDate(val)
      ? null
      : {
          birthdayInvalid: true
        };
  }
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= 1 && ageNumVal < 150;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= 1 && ageNumVal < 24;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= 0 && ageNumVal < 90;
          break;
        }
        default: {
          break;
        }
      }
      return result ? null : { ageInvalid: true };
    };
  }
}
