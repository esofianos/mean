var a = [];

function f() {
  a.push(1);
  a.push(2);
}

setTimeout(f, 10);
setTimeout(f, 10);

console.log('a: ', a);
