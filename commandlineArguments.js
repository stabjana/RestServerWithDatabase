'use strict';

console.log(process.argv);
console.log('length',process.argv.length)
console.log(process.argv[0]);

const [,, ...values]=process.argv;
console.log(values);
const [, , a, b, c] = process.argv;
console.log(a, b, c);

const [, , x, y, z, ...rest] = process.argv;
console.log(x, y, z, rest);

const [, , w, , q] = process.argv;
console.log(w, q);

for(let i=0; i<process.argv.length;i++){
    console.log(`argv[${i}]=${process.argv[i]}`);
}

console.log('##### values ######');
for (let i = 0; i < values.length; i++) {
    console.log(`values[${i}]=${values[i]}`);
}