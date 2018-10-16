import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from "@angular/animations";

export const slideToRight = trigger("routerAnim", [
  state("void", style({ width: "100%", height: "86%", position: "fixed" })),
  state(
    "*",
    style({
      width: "100%",
      height: "86%",
      position: "fixed"
    })
  ),
  transition(":enter", [
    style({ transform: "translateX(-100%)" }),
    group([
      animate(".5s ease-in-out", style({ transform: "translateX(0)" })),
      animate(".3s ease-in", style({ opacity: 1 }))
    ])
  ]),

  transition(":leave", [
    style({ transform: "translateX(0)" }),
    group([
      animate(".5s ease-in-out", style({ transform: "translateX(100%)" })),
      animate(".3s ease-in", style({ opacity: 0 }))
    ])
  ])
]);
