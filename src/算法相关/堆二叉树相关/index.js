

// 初始有效序列长度为 1,上图中用 k 表示
var heapSize = 1
// 原地建堆
function buildHeap(items) {
    while (heapSize < items.length - 1) {
        heapSize++
        heapify(items, heapSize)
    }
}

function heapify(items, i) {
    // 自下而上式堆化
    while (Math.floor(i / 2) > 0 && items[i] < items[Math.floor(i / 2)]) {
        swap(items, i, Math.floor(i / 2)); // 交换 
        i = Math.floor(i / 2);
    }
}

function swap(items, i, j) {
    let temp = items[i]
    items[i] = items[j]
    items[j] = temp
}

// 测试
var items = [, 5, 2, 3, 4, 1]
buildHeap(items)
console.log(items)
// [empty, 1, 2, 3, 5, 4]





// 原地建堆
// items: 原始序列
// heapSize: 有效序列长度,上图用 k 表示
function buildHeap(items, heapSize) {
    // 从最后一个非叶子节点开始，自上而下式堆化
    for (let i = Math.floor(heapSize/2); i >= 1; --i) {    
        heapify(items, heapSize, i);  
    }
}
function heapify(items, heapSize, i) {
    // 自上而下式堆化
    while (true) {
        var maxIndex = i;
        if(2*i <= heapSize && items[i] > items[i*2] ) {
            maxIndex = i*2;
        }
        if(2*i+1 <= heapSize && items[maxIndex] > items[i*2+1] ) {
            maxIndex = i*2+1;
        }
        if (maxIndex === i) break;
        swap(items, i, maxIndex); // 交换 
        i = maxIndex; 
    }
}  
function swap(items, i, j) {
    let temp = items[i]
    items[i] = items[j]
    items[j] = temp
}

// 测试
var items = [,5, 2, 3, 4, 1]
// 因为 items[0] 不存储数据
// 所以：heapSize = items.length - 1
buildHeap(items, items.length - 1)
console.log(items)
// [empty, 1, 2, 3, 4, 5]