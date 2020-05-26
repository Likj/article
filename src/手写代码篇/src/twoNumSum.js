/**
 * 
 给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
*/

function Sum(arr, result) {
    const map = new Map();
    for (let i = 0; i <arr.length; i++) {
        let k = result - arr[i];
        if (map.has(k)) {
            return [map.get(k), i];
        }
        map.set(arr[i], i);
    }
    return [];
}

var twoSum = function(nums, target) {
    let map = new Map()
    for(let i = 0; i< nums.length; i++) {
        let k = target-nums[i]
        if(map.has(k)) {
            return [map.get(k), i]
        }
        map.set(nums[i], i)
    }
    return [];
};
