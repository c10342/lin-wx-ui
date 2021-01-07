import Schema from './async-validator';

import FormControls from '../behaviors/form-controls';

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
    },
    FormControls: {
      type: 'descendant', // 关联的目标节点应为子孙节点
      target: FormControls
    }
  },
  externalClasses: ['custom-class'],
  properties: {
    label: String,
    name: String,
    labelWidth: {
      type: [String, Number]
    },
    flexDirection: {
      type: String,
      options: ['column', 'row']
    },
    rules: {
      type: Array,
      value: [],
      observer: 'updateRules'
    },
    hideRequiredAsterisk: {
      type: Boolean,
      value: false,
      observer: 'updateChildren'
    },
    showMessage: {
      type: Boolean,
      value: true,
      observer: 'updateChildren'
    }
  },
  data: {
    errorMessage: '',
    width: '',
    direction: '',
    required: false,
    rulesList: []
  },
  methods: {
    updateRules () {
      let parentRules = [];
      if (this.parent) {
        const { rules = {} } = this.parent.properties;
        const { name } = this.properties;
        parentRules = rules[name] || [];
      }

      const { rules: childRules = [] } = this.properties;
      this.setData({
        rulesList: [...parentRules, ...childRules]
      });
    },
    isRequired () {
      if (this.parent) {
        const rulesArr = this.data.rulesList;
        this.setData({
          required: rulesArr.some(rule => rule.required)
        });
      }
    },
    update () {
      if (this.parent) {
        const { labelWidth, flexDirection } = this.parent.properties;
        this.setData({
          width: labelWidth,
          direction: flexDirection
        });
        this.isRequired();
        this.updateRules();
      }
    },
    filterRules (triggerType = 'change') {
      let rulesArr = this.data.rulesList;
      if (triggerType) {
        rulesArr = rulesArr.filter(rule => {
          if (rule.trigger) {
            return rule.trigger === triggerType;
          }
          return triggerType === 'change';
        });
      }
      return rulesArr;
    },
    checkValueByTrigger (triggerType) {
      if (this.parent) {
        const { model = {} } = this.parent.properties;
        const { name } = this.properties;
        const value = model[name];
        const rulesArr = this.filterRules(triggerType);
        const schema = new Schema({ [name]: rulesArr });
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
    },
    checkValue () {
      if (this.parent) {
        const { model = {} } = this.parent.properties;
        const { name } = this.properties;
        const value = model[name];
        const schema = new Schema({ [name]: this.data.rulesList });
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
    },
    clearValidate () {
      this.setData({ errorMessage: '' });
    },
    onChange () {
      return this.checkValueByTrigger('change');
    },
    onBlur () {
      return this.checkValueByTrigger('blur');
    }
  },
  created: function () {
  },
  attached: function () {},
  ready: function () {
    this.isRequired();
  },
  moved: function () {},
  detached: function () {}
});
