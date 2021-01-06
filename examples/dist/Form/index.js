
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  relations: {
    '../FormItem/index': {
      type: 'descendant',
      linked (child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateChildren();
      },
      unlinked (child) {
        this.children = (this.children || []).filter((it) => it !== child);
        // this.updateChildren();
      }
    }
  },
  externalClasses: ['custom-class'],
  properties: {
    labelWidth: {
      type: [String, Number],
      observer: 'updateChildren'
    },
    flexDirection: {
      type: String,
      value: 'row',
      options: ['column', 'row'],
      observer: 'updateChildren'
    },
    validator: {
      type: Boolean,
      observer: 'updateChildren'
    },
    rules: {
      type: Object,
      value: {}
    },
    model: {
      type: Object,
      value: {},
      observer (newVal, oldVal) {
        const diffData = this.findDiffData(newVal, oldVal);
        Object.keys(diffData).forEach(key => {
          const child = (this.children || []).find(childItem => childItem.properties.name === key);
          if (child) {
            child.checkValue();
          }
        });
      }
    }
  },
  data: {},
  methods: {
    updateChildren () {
      (this.children || []).forEach(child => {
        child.update();
      });
    },
    checkValue (callback) {
      const { rules } = this.properties;
      const tasks = (this.children || [])
        .filter((child) => {
          const name = child.properties.name;
          return name && rules[name];
        })
        .map((child) => child.checkValue());

      Promise.all(tasks).then(res => {
        if (typeof callback === 'function') {
          callback(res.every(Boolean));
        }
      }).catch(() => {
        if (typeof callback === 'function') {
          callback(false);
        }
      });
    },
    clearValidate () {
      (this.children || []).forEach(child => {
        child.clearValidate();
      });
    },
    emitValidate (data) {
      this.triggerEvent('validate', data);
    },
    findDiffData (newVal, oldVal) {
      const diffData = {};
      Object.keys(newVal).forEach(key => {
        if (newVal[key] !== oldVal[key]) {
          diffData[key] = newVal[key];
        }
      });
      return diffData;
    }
  },
  created: function () {
    this.updateChildren();
  },
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {}
});
