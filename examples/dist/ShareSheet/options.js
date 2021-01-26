Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'options-class', 'option-class', 'button-class', 'image-class', 'icon-class', 'name-class', 'description-class'],
  properties: {
    options: {
      type: Array,
      value: []
    },
    showBorder: Boolean
  },
  data: {},
  methods: {
    onSelect (event) {
      const { index } = event.currentTarget.dataset;
      const option = this.properties.options[index];
      this.triggerEvent('select', { ...option, index });
    }
  },
  created () { },
  attached () { },
  ready () { },
  moved () { },
  detached () { }
});
