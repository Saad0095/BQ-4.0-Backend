// Using Recursion

/* function fib(num) {
  if (num == 0) {
    return 0;
  } else if (num == 1) {
    return 1;
  } else {    
    return fib(num - 1) + fib(num - 2);
  }
} */

// Using Loops
function fib(num) {
  if (num == 0) return 0;
  if (num == 1) return 1;

  let prev = 0;
  let current = 1;

  for (let i = 2; i <= num; i++) {
    let sum = prev + current;
    prev = current;
    current = sum;
  }
  return current;
}

console.log(fib(8));
