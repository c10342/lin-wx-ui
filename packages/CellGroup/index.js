// Component Object
Component({
  externalClasses: ['custom-class', 'title-class'],
  relations: {
    '../Cell/index': {
      type: 'descendant',
      linked () {
        this.setCellBorder();
      }
    }
  },
  options: {
    addGlobalClass: true
  },
  properties: {
    title: String,
    border: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    setCellBorder () {
      const nodes = this.getRelationNodes('../Cell/index');
      nodes.forEach((cell, index) => {
        if (index + 1 === nodes.length) {
          cell.setBorder(false);
        } else {
          cell.setBorder(true);
        }
      });
    }
  },
  created () {},
  attached () {},
  ready () {
    this.setCellBorder();
  },
  moved () {},
  detached () {}
});
