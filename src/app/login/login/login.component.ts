import { Component, OnInit } from "@angular/core";
import { Quote } from "./../../domain/quote";
import { QuoteService } from "./../../services/quote.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  quote: Quote = {
    cn:
      "我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。",
    en:
      "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.",
    pic: "/assets/img/quotes/0.jpg"
  };
  form: FormGroup;
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    this.quoteService$.getQuote().subscribe(q => {
      this.quote = q;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        "crs@qq.com",
        Validators.compose([Validators.required, Validators.email, this.validate])
      ],
      password: ["", Validators.required]
    });
  }
  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
  }
  validate(c: FormControl): {[key: string]: any} {
    if(!c.value) {
      return null;
    }
    const pattern = /^crs+/;
    if(pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'The email must start with crs'
    }
  }
}
