// Component Object
Component({
  behaviors: ['wx://form-field'],
  externalClasses: ['custom-class'],
  relations: {
    '../Checkbox/index': {
      type: 'descendant',
      linked (child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateChild(child);
      },
      unlinked (child) {
        this.children = (this.children || []).filter((it) => it !== child);
      }
    }
  },
  properties: {
    value: {
      type: Array,
      observer: 'updateChildren'
    },
    disabled: {
      type: Boolean,
      observer: 'updateChildren'
    },
    max: Number,
    name: String,
    direction: {
      type: String,
      value: 'column',
      options: ['column', 'row']
    }
  },
  data: {},
  methods: {
    updateChildren () {
      (this.children || []).forEach((child) => this.updateChild(child));
    },
    updateChild (child) {
      const { value, disabled } = this.properties;
      child.setData({
        value: value.indexOf(child.data.name) !== -1,
        parentDisabled: disabled
      });
    },
    emitChange (value) {
      this.triggerEvent('change', value);
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
