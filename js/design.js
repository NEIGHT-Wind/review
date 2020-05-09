// Publish Subscribe
class PubSubEvent {
  constructor() {
    this.eventMap = {};
  }
 
  subscribe = (type = '', func = () => {}) =>{
    if (!eventMap[type]) {
      eventMap[type] = [];
    }
    eventMap[type].push(func);
  }

  remove = (type = '', func) => {
    if (!this.eventMap[type]) { return; }
    if (func && typeof func === 'function') {
      this.eventMap[type] = this.eventMap[type].filter(item => item !== func);
    } else {
      this.eventMap[type] = [];
    }
  }

  publish() {
    const type = Array.prototype.shift.call(arguments);
    if (!this.eventMap[type]) { return; }
    const params = arguments
    this.eventMap[type].forEach(item => {
      item.apply(this, arguments);
    });
  }
}

const pubSubEvent = new PubSubEvent()