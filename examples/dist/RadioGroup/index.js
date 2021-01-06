Component({
  behaviors: ['wx://form-field'],
  relations: {
    '../Radio/index': {
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
      type: null,
      observer: 'updateChildren'
    },
    disabled: {
      type: Boolean,
      observer: 'updateChildren'
    },
    name: String
  },
  data: {},
  methods: {
    updateChild (child) {
      const { value, disabled } = this.properties;
      child.setData({
        value: value === child.data.name,
        parentDisabled: disabled
      });
    },
    updateChildren () {
      (this.children || []).forEach((child) => this.updateChild(child));
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
