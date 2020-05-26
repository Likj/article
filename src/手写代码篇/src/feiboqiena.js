/**
 * 
 * 斐波拉契数列j
*/

function Fibonacci(n) {
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 1
    }
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
//
function Fibonacci2(n, sum1 = 1, sum2 = 1,) {
    if (n === 1) {
        return sum2;
    }
    if (n === 2) {
        return sum2;
    }
    return Fibonacci2(n-1, sum2, sum1 + sum2);
}