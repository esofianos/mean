var a = [];

function f(num1, num2) {
	  a.push(num1);
	  a.push(num2);
}

setTimeout(f(1,2), 5000);
setTimeout(f(4,5), 1);

console.log('a: ', a);
