// extends
function myExtents (Target, Original) {
  function Fn () {}
  Fn.prototype = new Target();
  Original.prototype = new Fn();
  Original.prototype.constructor = Original;
}

function testMyExtents () {
  function Father () { this.name = 'father'; }
  Father.prototype.eat = function () { console.log('eat'); }

  function Child () {}

  myExtents(Father, Child);
  var child = new Child();
  
  return child;
}

// myCall
Function.prototype.myCall = function (that, ...args) {
  that.a = this;
  that.a(...args);
  delete that.a;
}

function testMyCall () {
  var thatA = { value: 1 };
  var thatB = {
    value: 2,
    consoleValue: function() {
      console.log(this.value);
    }
  };

  thatB.consoleValue(); // 2
  thatB.consoleValue.myCall(thatA); // 1
}

// myBind
Function.prototype.myBind = function (that, ...arg) {
  return function () {
    this.call(that, ...arg);
  }
}

// Object.create
Object.prototype.myCreate = function (proto, props) {
  var obj = {};
  var toStringProto = Object.prototype.toString.call(proto);
  if (toStringProto === '[object Object]' || toStringProto === '[object Null]') {
    function Fn () {};
    Fn.prototype = proto;
    obj = new Fn();
  }

  if (props && Object.prototype.toString.call(props) === '[object Object]') {
    Object.keys(props).forEach(key => {
      if (Object.prototype.toString.call(props[key]) !== '[object Object]') {
        throw new Error(`Property description must be an object: ${props[key]}`);
      } else {
        obj[key] = props[key].value;
      }
    })
  }
 
  return obj;
}

function testMyCreate () {
  var proto = { protoTypeTest: function() { console.log('protoTypeTest'); } }
  var props = { userName: { value: 'yingxu.wang' } };
  var obj = Object.myCreate(proto, props);
  
  return obj;
}

// Array.reduce
Array.prototype.myReduce = function (fn, defaultValue) {
  var arr = this;
  defaultValue = defaultValue !== undefined ? defaultValue : 0;
  for (var i = 0; i < arr.length; i ++) {
    defaultValue = fn(defaultValue, arr[i], i, arr);
  }
  return defaultValue;
}

function testMyReduce() {
  var sumArr = [9,1,8];
  console.log(sumArr.myReduce((last, current) => last + current));
  var unEqualArr = [1,2,4,4,7,8,8];
  var unEqualMap = unEqualArr.myReduce((last, current) => {
    if (!last[current]) { last[current] = true; }
    return last;
  }, {});
  console.log(Object.keys(unEqualMap));
}

// Promise.all
Promise.prototype.myAll = function (arr) {
  var resultArr = [];
  var count = 0;
  return new Promise((resolve, reject) => {
    arr.forEach((item, index) => {
      item
      .then(itemRes => {
        resultArr[index] = itemRes;
        count += 1;
        if (count === arr.length) {
          resolve(resultArr);
        }
      })
      .catch(rej => { reject(rej); });
    })
  });
}

// new
function myNew(Fn) {
  var obj = {};
  obj.__proto__ = Fn.prototype;
  var result = Fn.call(obj);
  if (typeof result == 'object' || typeof result == 'function') {
    return result;
  }
  return obj;
}
