// ---------- Question ----------
/**
Given an array of integers, return a new array such that each element at index i of the new array
is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], 
the expected output would be [120, 60, 40, 30, 24].

If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?
 */

 
// Approach below Solution


// ---------- Solution ----------

// [1,2,3,4,5]
//   [1,1,2,6,24] -> [120,60,40,30,24]
// Trick: Keep track of endVal to multiply by

// 2 passes, 0 extra arrays
// O(n) + (n) = O(n) time
// O(1) space -- return value doesn't count as extra space
const productOfArrayExceptSelf = (nums) => {
  if (!nums.length) return nums;

  const productArr = new Array(nums.length);

  productArr[0] = 1;
  let startIndex = 1;

  while (startIndex < nums.length) {
    productArr[startIndex] = productArr[startIndex - 1] * nums[startIndex - 1];
    startIndex++;
  }

  let endIndex = nums.length - 2;
  let endVal = nums[endIndex + 1];  // endVal starts as last num in 'nums'
  while (endIndex >= 0) {
    productArr[endIndex] *= endVal;  // endVal is the product after endIndex in 'nums'
    endVal *= nums[endIndex];  // endVal multiplies by the num preceding endIndex in 'nums'
    endIndex--;
  }

  return productArr;
}


// 3 passes, 2 extra arrays
// O(n) + (n) + (n) = O(n) time
// O(n) + (n) = O(n) space
const productOfArrayExceptSelf = (nums) => {
  if (!nums.length) return nums;

  const productArr = [];

  const fromLeft = Array(nums.length);
  fromLeft[0] = 1;
  let startIndex = 1;

  const fromRight = Array(nums.length);
  fromRight[nums.length - 1] = 1;
  let endIndex = nums.length - 2;

  while (startIndex < nums.length) {
    fromLeft[startIndex] = fromLeft[startIndex - 1] * nums[startIndex - 1];
    startIndex++;
  }
  while (endIndex >= 0) {
    fromRight[endIndex] = fromRight[endIndex + 1] * nums[endIndex + 1];
    endIndex--;
  }

  for (let i = 0; i < nums.length; i++) {
    productArr[i] = fromLeft[i] * fromRight[i];
  }
  
  return productArr;
}


// ---------- Approach ----------

// [3,2,1]

// start with
// [1,_,_] left  -> [1] = 1 * 3, [2] = 3 * 2  -> [1,3,6]
// [_,_,1] right -> [1] = 1 * 1, [0] = 2 * 1  -> [2,1,1]


// [1,2,3,4,5]

// start with
// [1,_,_,_,_]  from left
// [_,_,_,_,1]  from right

// startIndex = 1
// left[startIndex] = left[startIndex - 1] * nums[startIndex - 1]
// left[1] = 1 * 1 = 1
// [1,1,_,_,_]
// startIndex = 2
// left[2] = left[1] * nums[1] = 1 * 2 = 2
// [1,1,2,_,_]
// startIndex = 3
// left[3] = left[2] * nums[2] = 2 * 3 = 6
// [1,1,2,6,_]
// startIndex = 4
// left[4] = 6 * 4 = 24
// [1,1,2,6,24]

// endIndex = 3
// right[endIndex] = right[endIndex + 1] * nums[endIndex + 1]
// right[3] = right[4] * nums[4]
// right[3] = 1 * 5 = 5
// [_,_,_,5,1]
// endIndex = 2
// right[2] = right[3] * nums[3] = 5 * 4 = 20
// [_,_20,5,1]
// endIndex = 1
// right[1] = 20 * 3 = 60
// [_,60,20,5,1]
// endIndex = 0
// right[0] = 60 * 2 = 120
// [120,60,20,5,1]

// [1,1,2,6,24] * [120,60,20,5,1] = [120,60,40,30,24]