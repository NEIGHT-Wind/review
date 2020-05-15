const app = new Vue({
  el: '#app',

  data() {
    return {
      name: 'wyx',
      infos: {
        title: 'fe',
        age: '18'
      }
    }
  },

  render(createElemnet) {
    return createElemnet(
      'div',
      {
        attrs: {
          title: this.infos.title
        }
      },
      [
        createElemnet('span', {}, this.name)
      ]
    );
  }
});