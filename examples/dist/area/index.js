Component({
  name: 'Area',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    // 省市区数据
    areaList: {
      type: Object,
      value: {},
      observer: 'updateColumns'
    },
    // 当前选中的省市区 code
    value: {
      type: String,
      observer: 'updateColumns'
    },
    // 顶部栏标题
    title: String,
    // 省市区显示列数，3-省市区，2-省市，1-省
    columnsNum: {
      type: Number,
      value: 3,
      observer: 'updateColumns'
    },
    // 列占位提示文字
    columnsPlaceholder: {
      type: Array,
      value: [],
      observer: 'updateColumns'
    },
    // 是否显示加载状态
    loading: Boolean,
    // 选项高度
    itemHeight: {
      type: Number,
      value: 44
    },
    // 可见的选项个数
    visibleItemCount: {
      type: Number,
      value: 6
    },
    // 确认按钮文字
    confirmButtonText: {
      type: String,
      value: '确定'
    },
    // 取消按钮文字
    cancelButtonText: {
      type: String,
      value: '取消'
    }
  },
  data: {
    // 每一列
    columns: []
  },
  methods: {
    // 点击确定按钮
    onConfirm(event) {
      this.triggerEvent('confirm', event.detail.value);
    },
    // 点击取消按钮
    onCancel() {
      this.triggerEvent('cancel');
    },
    // 选中的值发生变化
    onChange(event) {
      this.triggerEvent('change', event.detail);
      const { index, picker } = event.detail;
      // index是变化的列索引
      if (index === 0) {
        // 省
        this.provinceChange(picker);
      } else if (index === 1) {
        // 市
        this.cityChange(picker, index);
      }
    },
    // 处理省值发生变化
    provinceChange(picker) {
      const { columnsNum } = this.properties;
      if (columnsNum < 2) {
        // 列数小于2说明只有省这一列
        return;
      }
      // 找出选中的值
      const selectProvice = picker.getColumnValue(0);
      // 获取对应的市数组
      const cityList = this.getCity(selectProvice);
      // 设置第二列，也就是市这一列的数据
      picker.setColumnValues(1, cityList);
      // 市发生变化了，区也要对应发生变化
      this.cityChange(picker);
      // 设置第二列，也就是市的值，默认为数组第一个
      picker.setColumnIndex(1, 0);
    },
    // 市发生变化
    cityChange(picker) {
      const { columnsNum } = this.properties;
      if (columnsNum < 3) {
        // 列数小于3，说明只有省市2列
        return;
      }
      // 找出市选中的值
      const selectCity = picker.getColumnValue(1);
      // 找出市下面对应的区数组
      const countyList = this.getCounty(selectCity);
      // 设置第三列，也就是区的数据
      picker.setColumnValues(2, countyList);
      // 设置第三列，也就是区的值，默认为数组的第一个
      picker.setColumnIndex(2, 0);
    },
    // 更新列数据
    updateColumns() {
      const { columnsNum, value } = this.properties;
      // 省编号
      let provinceCode = '';
      // 市编号
      let cityCode = '';
      // 区编号
      let countyCode = '';
      if (value) {
        // 前2位是省，中间2位是市，后面2位是区
        provinceCode = value.substring(0, 2);
        cityCode = value.substring(0, 4);
        countyCode = value.substring(0, 6);
      }
      const columns = [];
      if (columnsNum >= 1) {
        // 列数大于等于1，说明有省这一列，设置省数据
        const provinceList = this.getProvince();
        let provinceIndex = 0;
        if (provinceCode) {
          // 找出选中的省的索引
          provinceIndex = provinceList.findIndex((item) => {
            const code = (item.code || '').toString().substring(0, 2);
            return provinceCode === code;
          });
          // 没有就默认选中第一个
          provinceIndex = provinceIndex > -1 ? provinceIndex : 0;
        }
        // 设置省数据
        columns.push({
          values: provinceList,
          defaultIndex: provinceIndex
        });
        if (columnsNum >= 2) {
          // 列数大于等于2，说明有市这一列
          // 根据上面选中的省，找出该省下面的市数据
          const cityList = this.getCity(provinceList[provinceIndex]);
          let cityIndex = 0;
          if (cityCode) {
            // 找出选中的市索引
            cityIndex = cityList.findIndex((item) => {
              const code = (item.code || '').toString().substring(0, 4);
              return cityCode === code;
            });
            // 没有找到就默认第一个
            cityIndex = cityIndex > -1 ? cityIndex : 0;
          }
          // 设置市数据
          columns.push({
            values: cityList,
            defaultIndex: cityIndex
          });
          if (columnsNum >= 3) {
            // 列数大于等于3，说明有区这一列
            // 根据上面选中的市，找出该市下面的区数据
            const countyList = this.getCounty(cityList[cityIndex]);
            let countyIndex = 0;
            if (countyCode) {
              // 找出选中的区数据
              countyIndex = countyList.findIndex((item) => {
                const code = (item.code || '').toString().substring(0, 6);
                return countyCode === code;
              });
              // 没有就默认为第一个
              countyIndex = countyIndex > -1 ? countyIndex : 0;
            }
            // 设置区数据
            columns.push({
              values: countyList,
              defaultIndex: countyIndex
            });
          }
        }
      }
      this.setData({
        columns
      });
    },
    // 获取省数据
    getProvince() {
      const { areaList = {}, columnsPlaceholder = [] } = this.properties;
      const { province_list = {} } = areaList;
      const provinceList = [];
      if (columnsPlaceholder[0]) {
        // 如果有省列占位符，就将它放在第一位
        provinceList.push({
          text: columnsPlaceholder[0],
          code: -1
        });
      }
      Object.keys(province_list).forEach((key) => {
        provinceList.push({
          text: province_list[key],
          code: key
        });
      });
      return provinceList;
    },
    // 根据省获取，该省下面的市数据
    getCity(province) {
      const { areaList = {}, columnsPlaceholder = [] } = this.properties;
      const { city_list = {} } = areaList;
      const cityList = [];
      if (columnsPlaceholder[1]) {
        // 如果有市列占位符，就需要显示列占位符
        cityList.push({
          text: columnsPlaceholder[1],
          code: -1
        });
      }
      if (!province || (province && province.code === -1)) {
        // 如果没有选中省，或者在选中省数据的情况下，选中的是列占位符，就不用找出市的数据了
        return cityList;
      }
      // 获取该省的编码
      const code = province.code.substring(0, 2);
      Object.keys(city_list).forEach((key) => {
        if (key.substring(0, 2) === code) {
          cityList.push({
            text: city_list[key],
            code: key
          });
        }
      });
      return cityList;
    },
    // 根据选中的市，获取该市下面的区数据
    getCounty(city) {
      const { areaList = {}, columnsPlaceholder = [] } = this.properties;
      const { county_list = {} } = areaList;
      const countyList = [];
      if (columnsPlaceholder[2]) {
        // 有区列占位符
        countyList.push({
          text: columnsPlaceholder[2],
          code: -1
        });
      }
      if (!city || (city && city.code === -1)) {
        // 没有选中市，或者在选中市的情况下，选中的是列占位符，就不用找出区数据了
        return countyList;
      }

      // 获取该市的编码
      const code = city.code.substring(0, 4);

      Object.keys(county_list).forEach((key) => {
        if (key.substring(0, 4) === code) {
          countyList.push({
            text: county_list[key],
            code: key
          });
        }
      });
      return countyList;
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
Component({
  name: 'Area',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    // 省市区数据
    areaList: {
      type: Object,
      value: {},
      observer: 'updateColumns'
    },
    // 当前选中的省市区 code
    value: {
      type: String,
      observer: 'updateColumns'
    },
    // 顶部栏标题
    title: String,
    // 省市区显示列数，3-省市区，2-省市，1-省
    columnsNum: {
      type: Number,
      value: 3,
      observer: 'updateColumns'
    },
    // 列占位提示文字
    columnsPlaceholder: {
      type: Array,
      value: [],
      observer: 'updateColumns'
    },
    // 是否显示加载状态
    loading: Boolean,
    // 选项高度
    itemHeight: {
      type: Number,
      value: 44
    },
    // 可见的选项个数
    visibleItemCount: {
      type: Number,
      value: 6
    },
    // 确认按钮文字
    confirmButtonText: {
      type: String,
      value: '确定'
    },
    // 取消按钮文字
    cancelButtonText: {
      type: String,
      value: '取消'
    }
  },
  data: {
    // 每一列
    columns: []
  },
  methods: {
    // 点击确定按钮
    onConfirm(event) {
      this.triggerEvent('confirm', event.detail.value);
    },
    // 点击取消按钮
    onCancel() {
      this.triggerEvent('cancel');
    },
    // 选中的值发生变化
    onChange(event) {
      this.triggerEvent('change', event.detail);
      const { index, picker } = event.detail;
      // index是变化的列索引
      if (index === 0) {
        // 省
        this.provinceChange(picker);
      } else if (index === 1) {
        // 市
        this.cityChange(picker, index);
      }
    },
    // 处理省值发生变化
    provinceChange(picker) {
      const { columnsNum } = this.properties;
      if (columnsNum < 2) {
        // 列数小于2说明只有省这一列
        return;
      }
      // 找出选中的值
      const selectProvice = picker.getColumnValue(0);
      // 获取对应的市数组
      const cityList = this.getCity(selectProvice);
      // 设置第二列，也就是市这一列的数据
      picker.setColumnValues(1, cityList);
      // 市发生变化了，区也要对应发生变化
      this.cityChange(picker);
      // 设置第二列，也就是市的值，默认为数组第一个
      picker.setColumnIndex(1, 0);
    },
    // 市发生变化
    cityChange(picker) {
      const { columnsNum } = this.properties;
      if (columnsNum < 3) {
        // 列数小于3，说明只有省市2列
        return;
      }
      // 找出市选中的值
      const selectCity = picker.getColumnValue(1);
      // 找出市下面对应的区数组
      const countyList = this.getCounty(selectCity);
      // 设置第三列，也就是区的数据
      picker.setColumnValues(2, countyList);
      // 设置第三列，也就是区的值，默认为数组的第一个
      picker.setColumnIndex(2, 0);
    },
    // 更新列数据
    updateColumns() {
      const { columnsNum, value } = this.properties;
      // 省编号
      let provinceCode = '';
      // 市编号
      let cityCode = '';
      // 区编号
      let countyCode = '';
      if (value) {
        // 前2位是省，中间2位是市，后面2位是区
        provinceCode = value.substring(0, 2);
        cityCode = value.substring(0, 4);
        countyCode = value.substring(0, 6);
      }
      const columns = [];
      if (columnsNum >= 1) {
        // 列数大于等于1，说明有省这一列，设置省数据
        const provinceList = this.getProvince();
        let provinceIndex = 0;
        if (provinceCode) {
          // 找出选中的省的索引
          provinceIndex = provinceList.findIndex((item) => {
            const code = (item.code || '').toString().substring(0, 2);
            return provinceCode === code;
          });
          // 没有就默认选中第一个
          provinceIndex = provinceIndex > -1 ? provinceIndex : 0;
        }
        // 设置省数据
        columns.push({
          values: provinceList,
          defaultIndex: provinceIndex
        });
        if (columnsNum >= 2) {
          // 列数大于等于2，说明有市这一列
          // 根据上面选中的省，找出该省下面的市数据
          const cityList = this.getCity(provinceList[provinceIndex]);
          let cityIndex = 0;
          if (cityCode) {
            // 找出选中的市索引
            cityIndex = cityList.findIndex((item) => {
              const code = (item.code || '').toString().substring(0, 4);
              return cityCode === code;
            });
            // 没有找到就默认第一个
            cityIndex = cityIndex > -1 ? cityIndex : 0;
          }
          // 设置市数据
          columns.push({
            values: cityList,
            defaultIndex: cityIndex
          });
          if (columnsNum >= 3) {
            // 列数大于等于3，说明有区这一列
            // 根据上面选中的市，找出该市下面的区数据
            const countyList = this.getCounty(cityList[cityIndex]);
            let countyIndex = 0;
            if (countyCode) {
              // 找出选中的区数据
              countyIndex = countyList.findIndex((item) => {
                const code = (item.code || '').toString().substring(0, 6);
                return countyCode === code;
              });
              // 没有就默认为第一个
              countyIndex = countyIndex > -1 ? countyIndex : 0;
            }
            // 设置区数据
            columns.push({
              values: countyList,
              defaultIndex: countyIndex
            });
          }
        }
      }
      this.setData({
        columns
      });
    },
    // 获取省数据
    getProvince() {
      const { areaList = {}, columnsPlaceholder = [] } = this.properties;
      const { province_list = {} } = areaList;
      const provinceList = [];
      if (columnsPlaceholder[0]) {
        // 如果有省列占位符，就将它放在第一位
        provinceList.push({
          text: columnsPlaceholder[0],
          code: -1
        });
      }
      Object.keys(province_list).forEach((key) => {
        provinceList.push({
          text: province_list[key],
          code: key
        });
      });
      return provinceList;
    },
    // 根据省获取，该省下面的市数据
    getCity(province) {
      const { areaList = {}, columnsPlaceholder = [] } = this.properties;
      const { city_list = {} } = areaList;
      const cityList = [];
      if (columnsPlaceholder[1]) {
        // 如果有市列占位符，就需要显示列占位符
        cityList.push({
          text: columnsPlaceholder[1],
          code: -1
        });
      }
      if (!province || (province && province.code === -1)) {
        // 如果没有选中省，或者在选中省数据的情况下，选中的是列占位符，就不用找出市的数据了
        return cityList;
      }
      // 获取该省的编码
      const code = province.code.substring(0, 2);
      Object.keys(city_list).forEach((key) => {
        if (key.substring(0, 2) === code) {
          cityList.push({
            text: city_list[key],
            code: key
          });
        }
      });
      return cityList;
    },
    // 根据选中的市，获取该市下面的区数据
    getCounty(city) {
      const { areaList = {}, columnsPlaceholder = [] } = this.properties;
      const { county_list = {} } = areaList;
      const countyList = [];
      if (columnsPlaceholder[2]) {
        // 有区列占位符
        countyList.push({
          text: columnsPlaceholder[2],
          code: -1
        });
      }
      if (!city || (city && city.code === -1)) {
        // 没有选中市，或者在选中市的情况下，选中的是列占位符，就不用找出区数据了
        return countyList;
      }

      // 获取该市的编码
      const code = city.code.substring(0, 4);

      Object.keys(county_list).forEach((key) => {
        if (key.substring(0, 4) === code) {
          countyList.push({
            text: county_list[key],
            code: key
          });
        }
      });
      return countyList;
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
