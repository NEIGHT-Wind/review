class Dep{ // 发布订阅工具类 每个key有一个Dep
  constructor() {
    this.subs = [];
  }

  notify() {
    const subs = this.subs.slice();
    subs.forEach(item => {
      item.update();
    })
  }

  addSub(sub) {
    if (this.subs.indexOf(sub) === -1) {
      this.subs.push(sub);
    }
  }

  addDepend() { // 找到当前的watcher，将watch放到自己的Dep里面 watcher里面才有_update
    Dep.target.addDep(this);
  }
}

// 全局的静态变量 实际时个[]，储存每个vue实例的watcher，只有init的时候有用
Dep.target = null;

const api = {
  replaceChild(oldElement, element) {
    return oldElement.parentElement.replaceChild(element, oldElement);
  },

  proxy(target, data, key) {
    Object.defineProperty(target, key, {
      get() {
        return data[key];
      },
      set(value) {
        return data[key] = value;
      }
    })
  },

  // 每个变量都有一个自己的defineReactive， 与dep
  defineReactive(target, key, value) {
    const dep = new Dep();

    Object.defineProperty(target, key, {
      get() {
        // 将vue实例中使用的数据，放在自己的dep里面，只有init-render的时候可以add
        if (Dep.target) {
          dep.addDepend();
        }
        return value;
      },
      set(newValue) {
        value = newValue;
        dep.notify();
      }
    })
  },

};

class Watcher { // 包了一层 Vue _update
  constructor(getter) {
    this.getter = getter;
    this.init();
  }

  init() {
    Dep.target = this; // 只有在init 的 render 时候给 每个key的dep添加sub
    this.getter(); // 会触发 definReactive 时 的get
    Dep.target = null; // render结束了要把开关关上
  }

  addDep(dep) {
    dep.addSub(this);
  }

  update() {
    this.getter();
  }
}

class Observer {
  constructor(obj) {
    this.walk(obj);
  }

  // 递归代理
  walk(obj) {
    Object.keys(obj).forEach(key => {
      if (Object.prototype.toString.call(obj[key]) === '[object Object]' && obj[key] !== null) {
        this.walk(obj[key]);
      }
      api.defineReactive(obj, key, obj[key]);
    });
    return obj;
  }
}

class Vue{
  constructor(options) {
    this.$el = document.querySelector(options.el);
    this._data = options.data && options.data();
    this.render = options.render;

    this.init();
  }

  init() {
    // 递归每个key挂上defineProperty 与 dep
    new Observer(this._data);

    // 单纯的把this._data数据挂在this上
    Object.keys(this._data).forEach(key => {
      api.proxy(this, this._data, key);
    });

    // 依赖分析
    new Watcher(() => {
      this._update();
    });
  }

  // render部分
  _update() {
    console.log('update');
    const root = this.render(this._createElement);
    api.replaceChild(this.$el, root);
    this.$el = root;
  }

  _createElement(tagName, data, children) {
    const tag = document.createElement(tagName);
    const { attrs = {} } = data;
    Object.keys(attrs).forEach(attr => {
      tag.setAttribute(attr, attrs[attr]);
    });

    if (Object.prototype.toString.call(children) !== '[object Array]') {
      let child = document.createTextNode(children);
      tag.appendChild(child);
    } else {
      children.forEach(child  => {
        tag.appendChild(child);
      });
    }

    return tag;
  }
}