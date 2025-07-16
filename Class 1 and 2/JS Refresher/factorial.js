// Using Recursion

function fact(num) {
  if (num == 0 || num == 1) return 1;
  else {
    return num * fact(num - 1);
  }
}

// Using Loops

/* function fact(num) {
  if (num == 0 || num == 1) return 1;
  let fact = 1;

  for (let i = 2; i <= num; i++) {
    fact *= i;
  }
  return fact;
} */

console.log(fact(6));
