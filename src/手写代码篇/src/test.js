const fucArr = [
	next => {
		setTimeout(() => {
			console.log(1);
			next()
		}, 300)
	},
	next => {
		setTimeout(() => {
			console.log(2);
			next()
		}, 200)
	},
	next => {
		setTimeout(() => {
			console.log(3);
			next()
		}, 100)
	}
]

var run = arr=>{

  

}
// 实现一个run方法,使得run(fucArr)能顺序输出1、2、3.
run = arr => {
    let i = 0;
    function next() {
        if (i >= arr.length) {
            return;
        }
        arr[i++](next);
    };
    next();
};

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (!s || s.length === 1) {return s}
    function isHui(str) {
        return str === str.split('').reverse().join('');
    }
    var result = [];
    function getResult(s) {
        if(!s) {
            return;
        }
        let i = 0, j = 1;
        while(j <= s.length) {
            if (isHui(s.slice(i, j))) {
                result.push(s.slice(i, j));
            } 
            j++
        }
        return getResult(s.slice(1));
    }
    getResult(s);
    result = result.sort((a, b) => b.length - a.length)
    return result[0];
};

var longestPalindrome = function(s) {
    if (!s || s.length === 1) {return s}
    function isHui(str) {
        return str === str.split('').reverse().join('');
    }
    var result = [];
    for (var i = 0; i < s.length; i++) {
        for (j = 1; j <= s.length; j++) {
            const c = s.slice(i, j);
            if (isHui(c)) {
                result.push(c)
            }
        }
    }
    result = result.sort((a, b) => b.length - a.length)
    return result[0];
};

var longestPalindrome = function(s) {
    let ans = '';
     let n = s.length;
     let dp = Array.from(new Array(n), () => new Array().fill(0));
     for(let i = n-1; i >=0; i--) {
         for(let j = i; j < n; j++) {
             dp[i][j] = s[i] === s[j] && ( j - i < 2 || dp[i+1][j-1])
             if(dp[i][j] && j - i + 1 > ans.length) {
                 ans = s.substr(i,j - i + 1);
             }
         }
     }
     return ans;
 }
 var longestPalindrome = function(s) {
    if(!s || s.length < 2){
        return s;
    }
    var s_f = s.split('').reverse().join('');
    var resultStr = s[0];
    var maxLen = 1;
    var tmpLen = 1;
    var maxStrIndex = 0;
    var len = s.length;
    //判断字符串是否回文
    function isPalinerome(i,r){
        if(len - i - 1 == r -tmpLen + 1){
            return true
        }
        return false;
    }
    //初始化二维数组
    var len = s.length;
    var arr = new Array(len);
    for(var i = 0;i<len;i++){
        arr[i] = [];
        for(var r = 0;r<len;r++){
            arr[i][r] = 0
        }
    }
    for(var i = 0;i<len;i++){
        for(var r=0;r<len;r++){
            if(s[i] == s_f[r]){
                if(i==0 || r==0){
                    arr[i][r] = 1
                }else{
                    arr[i][r] = arr[i-1][r-1] + 1
                    tmpLen = arr[i][r]
                }
                if(tmpLen > maxLen && isPalinerome(i,r)){
                    maxStrIndex = r;
                    maxLen = tmpLen;
                    resultStr =  s.substring(i-tmpLen+1,i+1);
                }
            }
        }
    }
    return resultStr;
};


function reverse(n) {
    let result = 0;
    while(n > 0) {
        let current = n % 10;
        result = result * 10 + current;
        n = Math.floor(n / 10);
    }
    return result;
}

 abcddefghijkl

 
 lkjihgfeddcba