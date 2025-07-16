// Reverse a String

const string = "Karachi - The City of lights!";

function reverseString() {
  return string.split("").reverse().join("");
}

console.log(reverseString());

// Find Largest Number in Array

const numArr = [2, 41223, 324, 231, 512, 13134];

function LargestNumFind() {
  console.log(...numArr);
  return Math.max(...numArr);
}

console.log(LargestNumFind());

// Count Vowels

// function countVowels(str){
//     return str.match(/[aeiou]/gi)?.length
// }

// OR
function countVowels(str) {
  const vowels = ["a", "e", "o", "u", "i"];
  let count = 0;
  for (const ch of str.toLocaleLowerCase()) {
    if (vowels.includes(ch)) {
      count++;
    }
  }
  return count;
}
console.log("The number of vowels are: ", countVowels("Saad Bin Khalid"));

// JavaScript Program to Check Whether a String is Palindrome or Not
function chackPalindrom(string) {
  const reversed = string.split("").reverse().join("");
  return string == reversed ? "Palindrome" : "Not a Palindrome";
}

console.log(chackPalindrom("madam"));


var isPalindrome = function(x) {
    const string = x.toString();
    console.log(string);
    
    const reversed = string.split("").reverse().join("");
    console.log(reversed);
    return string === reversed;
};

console.log(isPalindrome(-1314223));
