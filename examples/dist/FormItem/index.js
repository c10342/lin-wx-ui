import Schema from './async-validator';
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  relations: {
    '../Form/index': {
      type: 'ancestor',
      linked (parent) {
        this.parent = parent;
        this.update();
      },
      unlinked () {
        this.parent = null;
      }
    }
  },
  externalClasses: ['custom-class'],
  properties: {
    label: String,
    name: String,
    required: Boolean,
    labelWidth: {
      type: [String, Number]
    },
    flexDirection: {
      type: String,
      value: 'row',
      options: ['column', 'row']
    }
  },
  data: {
    errorMessage: '',
    width: '',
    direction: '',
    validator: false
  },
  methods: {
    update () {
      if (this.parent) {
        const { labelWidth, flexDirection, validator } = this.parent.properties;
        this.setData({
          width: labelWidth,
          direction: flexDirection,
          validator
        });
      }
    },
    checkValue () {
      if (this.parent) {
        const { rules, model } = this.parent.properties;
        const { name } = this.properties;
        if (!name) {
          return;
        }
        if (Array.isArray(rules[name])) {
          const value = model[name];
          const schema = new Schema({ [name]: rules[name] });
          return schema
            .validate({ [name]: value })
            .then(() => {
              this.parent.emitValidate({
                result: true,
                [name]: value
              });
              this.setData({ errorMessage: '' });
              return true;
            })
            .catch(({ fields }) => {
              this.parent.emitValidate({
                result: false,
                [name]: value,
                ...fields
              });
              this.setData({ errorMessage: fields[name][0].message });
              return false;
            });
        }
      }
    },
    clearValidate () {
      this.setData({ errorMessage: '' });
    }
  },
  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {}
});
