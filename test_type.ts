// function add(x:string,y:string):string;
// function add(x:number, y:number):number;
// function add(x:string|number|Function, y: number|string): number | string{
//   if(typeof x === 'string'){
//     return x + ',' + y;
//   }else {
//    return 1;
//   }
// }
// let x = add(1,2)
// let z = add(() => {},1) // 报错

// function fn(arg: { x: string | null }) {
//     if (arg.x !== null) {
//         alert(arg);
//         console.log(arg.x.substr(3)); //1. 这里的arg.x被设置为null了，所以这里会导致runtime error
//     }
// }
// function alert(a:any) {
//     a.x = null;
// }

// function fn(arg: { x: string | null }) {
//     if (arg.x !== null) {
//         alert(arg);
//         console.log(arg.x.substr(3)); //1. 这里的arg.x被设置为null了，所以这里会导致runtime error
//     }
// }
// // 假想的语法，没有支持
// pure function alert(a:any)  {
//     a.x = null;
// }

// fn({x: '1'})

// class Foo {
//   method(input: string): number { return 1 }
// }
// class Bar {
//   method(input: string): number { return 1 }
// }
// let foo: Foo = new Bar(); // OK


// function distance(p: {x:number,y:number}){
//   return p.x*p.x + p.y*p.y
// }
// distance({x:1,y:2,z:3}) // error

// const params = {x: 1, y: 2, z: 3};

// distance(params) // ok