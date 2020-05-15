// 斐波那契数列
function FibonacciFn (n) {
  if (n <= 0) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  return (FibonacciFn(n - 1) + FibonacciFn(n - 2));
}

function FibonacciFnOpt (n) {
  if (n === 0) {
    return 0;
  }
  var f = 0;
  var s = 1;
  for (var i = 0; i < n; i ++) {
    s += f;
    f = s - f;
  }
  return f;
} 

// Bubbling and mySort
function bubbling(arr) {
  for (var i = 0; i < arr.length; i ++) {
    for (var j = 0; j < arr.length - 1 - i; j ++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

Array.prototype.mySort = function (fn) {
  var arr = this;
  for (var i = 0; i < arr.length; i ++) {
    for (var j = 0; j < arr.length - 1 - i; j ++) {
      if (fn(arr[j], arr[j + 1]) > 0) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function testMySort () {
  var arr = [3,1,7];
  console.log(arr.mySort((a,b) => a - b))
}

// quickSort
function quickSort (arr) {
  if (arr.length <= 1) { return arr; }

  var pivot = arr[0];
  var left = [];
  var right = [];

  for(var i = 1; i < arr.length; i ++){
    if(arr[i] <= pivot){
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [
    ...quickSort(left),
    pivot,
    ...quickSort(right),
  ];
}

function testQuickSort() {
  var arr = [5,1,3,7,6,9,0,1,4,2];
  console.log(quickSort(arr));
}

function quickSortOpt (propsArr) {
  if (propsArr.length <= 1) { return arr; }

  var sortArr = Array.from(propsArr);
  var temp = '';
  var index = '';
  var pivot = '';

  function exchange (arr, i, j) {
    if (i === j) { return; }
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    temp = '';
  }

  function getPivotIndex (arr, left, right) {
    index = left;
    pivot = arr[right];
    for (var i = left; i < right; i ++) {
      if (arr[i] < pivot) {
        exchange(arr, i, index);
        index ++;
      }
    }
    exchange(arr, right, index);
    return index;
  }

  function sort (arr, left, right) {
    if (left >= right) { return; }
    var pivotIndex = getPivotIndex(arr, left, right);
    sort(arr, left, pivotIndex - 1);
    sort(arr, pivotIndex + 1, right);
  }

  sort(sortArr, 0, sortArr.length - 1);
  return sortArr;
}

function testQuickSortOpt() {
  var arr = [5,1,3,7,6,9,0,1,4,2];
  var sortArr = quickSortOpt(arr);
  console.log(arr, sortArr);
}

// 链表反转
function reverseList (head) {
  if (head === undefined || head === null) { return head; }
  var originalHead = head;
  var result = {};
  function reverse (father) {
    if (father.next !== null) {
      var child = reverse(father.next);
      child.next = father;
      if (originalHead === father) {
        father.next = null;
        return result;
      } else {
        return father;
      }
    } else {
      result = father;
      return father;
    }
  }
  return reverse(head);
}

function testReverseList () {
  var c = { next: null, key: 'this is c' };
  var b = { next: c, key: 'this is b' };
  var a = { next: b, key: 'this is a' };

  console.log(reverseList(a));
}

// 二分查找法
function dichotomy (arr, value) {
  var startIndex = 0;
  var endIndex = arr.length - 1;
  var midIndex = '';

  function deep () {
    if (startIndex >= endIndex) {
      return null;
    }
    midIndex = Math.floor((startIndex + endIndex) / 2);
    if (arr[midIndex] === value) {
      return midIndex;
    } else if (arr[midIndex] > value) {
      endIndex = midIndex - 1;
    } else if (arr[midIndex] < value) {
      startIndex = midIndex + 1;
    }
    return deep();
  }

  return deep();
}

function testDichotomy () {
  var arr = [1, 4, 7, 8, 12, 34, 67, 88, 99, 100];
  var findValue = 4;
  
  console.log(dichotomy(arr, findValue));
}