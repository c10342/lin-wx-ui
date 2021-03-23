// Component Object
Component({
  name: 'CellGroup',
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class', 'title-class'],
  relations: {
    '../Cell/index': {
      type: 'descendant',
      linked () {
        this.setCellBorder();
      }
    }
  },
  properties: {
    // 分组标题
    title: String,
    // 是否显示外边框
    border: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    // 设置LinCell组件底部边框
    setCellBorder () {
      const nodes = this.getRelationNodes('../Cell/index');
      // 不是最后一个LinCell组件才需要设置底部边框
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
