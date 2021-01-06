// ---------- Question ----------
/**
Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass?
 */


// ---------- Approach ----------
// k = 17
// 10 --> have we seen a 7?
// 5 --> have we seen a 12?

// Keep a hash to store the complement of each number
// On each iteration, check if hash contains its complement from k


// ---------- Solution ----------
// One pass
//  O(n) time
//  O(n) space
const twoSum = (nums, k) => {
  if (!nums.length) return false;

  const seenComplements = {};

  for (let num of nums) {
    if (seenComplements[num]) return true;

    seenComplements[k - num] = true;
  }

  return false;
}

// Two passes
//  O(n) + (n) = O(n) time
//  O(n) space
const twoSum = (nums, k) => {
  if (!nums.length) return false;

  const seenComplements = {};

  for (let num of nums) {
    seenComplements[k - num] = true;
  }

  for (let num of nums) {
    if (seenComplements[num]) return true;
  }

  return false;
}