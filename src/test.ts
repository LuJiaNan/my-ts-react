// class Square {
//   // Previously both of these were any
//   area;
// // ^ = (property) Square.area: number
//   sideLength;
// // ^ = (property) Square.sideLength: number
//   constructor(sideLength: number) {
//     this.sideLength = sideLength;
//     this.area = sideLength ** 2;
//   }
// }

// class Square {
//     sideLength;
//   // ^ = (property) Square.sideLength: number | undefined

//     constructor(sideLength: number) {
//       if (Math.random()) {
//         this.sideLength = sideLength;
//       }
//     }

//     get area() {
//       return this.sideLength ** 2;
//     }
//   }

// class Square {
//     // definite assignment assertion
//     //        v
//     sideLength!: number;
//     // type annotation

//     constructor(sideLength: number) {
//       this.initialize(sideLength);
//     }

//     initialize(sideLength: number) {
//       this.sideLength = sideLength;
//     }

//     get area() {
//       return this.sideLength ** 2;
//     }
//   }


let X = 1;
let Y = 2;

let x = X && Y;
let y = X || Y;
let z = X ?? Y;

console.log(x)
console.log(y)
console.log(z)