// min(8)(5) -> return 3
const thunkProfill = (function() {
  let value = 0;
  return function thunk(v) {
    if (v) {
      value = value ? value -= v : v;
      return thunk;
    }

    return value;
  }
})();

function testThunkProfill () {
  console.log(thunkProfill(5)(4)(3)());
}
