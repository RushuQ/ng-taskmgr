// import { Observable } from 'rxjs/Observable';
// import { environment } from "../../environments/environment";


// Observable.prototype.debug = function (message: any) {
//     return this.do(
//         (next) => {
//             if (!environment.production) {
//                 console.log(message, next);
//             }
//         },
//         (err) => {
//             if (!environment.production) {
//                 console.error(message, err)
//             }
//         },
//         () => {
//             if (!environment.production) {
//                 console.info("Observable completed", message)
//             }
//         }
//     );
// };

// declare module 'rxjs/Observable' {
//     interface Observable<T> {
//         debug: (...any) => Observable<T>
//     }
// } 