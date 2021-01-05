Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  relations: {
    '../CollapseItem/index': {
      type: 'descendant',
      linked (child) {
        this.children = this.children || [];
        this.children.push(child);
      },
      unlinked (child) {
        this.children = (this.children || []).filter((it) => it !== child);
      }
    }
  },
  properties: {
    value: {
      type: null,
      observer: 'updateExpanded'
    },
    accordion: {
      type: Boolean,
      observer: 'updateExpanded'
    },
    border: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    updateExpanded () {
      (this.children || []).forEach((child) => {
        child.updateExpanded();
      });
    },
    switch (currentName, expanded) {
      const { accordion, value } = this.properties;
      const changeItem = currentName;
      if (!accordion) {
        currentName = expanded
          ? (value || []).concat(currentName)
          : (value || []).filter((activeName) => activeName !== currentName);
      } else {
        currentName = expanded ? currentName : '';
      }
      if (expanded) {
        this.triggerEvent('open', changeItem);
      } else {
        this.triggerEvent('close', changeItem);
      }
      this.triggerEvent('change', currentName);
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
