Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  // externalClasses: ["custom-class"],
  properties: {
    areaList: {
      type: Object,
      value: {},
      observer: 'updateColumns',
    },
    value: {
      type: String,
      observer: 'updateColumns',
    },
    title: String,
    columnsNum: {
      type: Number,
      value: 3,
      observer: 'updateColumns',
    },
    columnsPlaceholder: {
      type: Array,
      value: [],
      observer: 'updateColumns',
    },
    loading: Boolean,
    itemHeight: {
      type: Number,
      value: 44,
    },
    visibleItemCount: {
      type: Number,
      value: 6,
    },
    confirmButtonText: {
      type: String,
      value: '确定',
    },
    cancelButtonText: {
      type: String,
      value: '取消',
    },
  },
  data: {
    columns: [],
  },
  methods: {
    onConfirm(event) {
      this.triggerEvent('confirm', event.detail.value);
    },
    onCancel() {
      this.triggerEvent('cancel');
    },
    onChange(event) {
      this.triggerEvent('change', event.detail);
      const { index, picker } = event.detail;
      if (index === 0) {
        this.provinceChange(picker);
      } else if (index === 1) {
        this.cityChange(picker, index);
      }
    },
    provinceChange(picker) {
      const { columnsNum } = this.properties;
      if (columnsNum < 2) {
        return;
      }
      const selectProvice = picker.getColumnValue(0);
      const cityList = this.getCity(selectProvice);
      picker.setColumnValues(1, cityList);
      this.cityChange(picker);
      picker.setColumnIndex(1, 0);
    },
    cityChange(picker) {
      const { columnsNum } = this.properties;
      if (columnsNum < 3) {
        return;
      }
      const selectCity = picker.getColumnValue(1);
      const countyList = this.getCounty(selectCity);
      picker.setColumnValues(2, countyList);
      picker.setColumnIndex(2, 0);
    },
    updateColumns() {
      const { columnsNum, value } = this.properties;
      let provinceCode = '';
      let cityCode = '';
      let countyCode = '';
      if (value) {
        provinceCode = value.substring(0, 2);
        cityCode = value.substring(0, 4);
        countyCode = value.substring(0, 6);
      }
      const columns = [];
      if (columnsNum >= 1) {
        const provinceList = this.getProvince();
        let provinceIndex = 0;
        if (provinceCode) {
          provinceIndex = provinceList.findIndex((item) => {
            const code = (item.code || '').toString().substring(0, 2);
            return provinceCode === code;
          });
          provinceIndex = provinceIndex > -1 ? provinceIndex : 0;
        }
        columns.push({
          values: provinceList,
          defaultIndex: provinceIndex,
        });
        if (columnsNum >= 2) {
          const cityList = this.getCity(provinceList[provinceIndex]);
          let cityIndex = 0;
          if (cityCode) {
            cityIndex = cityList.findIndex((item) => {
              const code = (item.code || '').toString().substring(0, 4);
              return cityCode === code;
            });
            cityIndex = cityIndex > -1 ? cityIndex : 0;
          }
          columns.push({
            values: cityList,
            defaultIndex: cityIndex,
          });
          if (columnsNum >= 3) {
            const countyList = this.getCounty(cityList[cityIndex]);
            let countyIndex = 0;
            if (countyCode) {
              countyIndex = countyList.findIndex((item) => {
                const code = (item.code || '').toString().substring(0, 6);
                return countyCode === code;
              });
              countyIndex = countyIndex > -1 ? countyIndex : 0;
            }
            columns.push({
              values: countyList,
              defaultIndex: countyIndex,
            });
          }
        }
      }
      this.setData({
        columns,
      });
    },
    getProvince() {
      const { areaList = {}, columnsPlaceholder = [] } = this.properties;
      const { province_list = {} } = areaList;
      const provinceList = [];
      if (columnsPlaceholder[0]) {
        provinceList.push({
          text: columnsPlaceholder[0],
          code: -1,
        });
      }
      // for (const key in province_list) {
      //   provinceList.push({
      //     text: province_list[key],
      //     code: key,
      //   });
      // }
      Object.keys(province_list).forEach((key) => {
        provinceList.push({
          text: province_list[key],
          code: key,
        });
      });
      return provinceList;
    },
    getCity(province) {
      const { areaList = {}, columnsPlaceholder = [] } = this.properties;
      const { city_list = {} } = areaList;
      const cityList = [];
      if (columnsPlaceholder[1]) {
        cityList.push({
          text: columnsPlaceholder[1],
          code: -1,
        });
      }
      if (!province || (province && province.code === -1)) {
        return cityList;
      }
      const code = province.code.substring(0, 2);
      // for (const key in city_list) {
      //   if (key.substring(0, 2) === code) {
      //     cityList.push({
      //       text: city_list[key],
      //       code: key,
      //     });
      //   }
      // }
      Object.keys(city_list).forEach((key) => {
        if (key.substring(0, 2) === code) {
          cityList.push({
            text: city_list[key],
            code: key,
          });
        }
      });
      return cityList;
    },
    getCounty(city) {
      const { areaList = {}, columnsPlaceholder = [] } = this.properties;
      const { county_list = {} } = areaList;
      const countyList = [];
      if (columnsPlaceholder[2]) {
        countyList.push({
          text: columnsPlaceholder[2],
          code: -1,
        });
      }
      if (!city || (city && city.code === -1)) {
        return countyList;
      }

      const code = city.code.substring(0, 4);
      // for (const key in county_list) {
      //   if (key.substring(0, 4) === code) {
      //     countyList.push({
      //       text: county_list[key],
      //       code: key,
      //     });
      //   }
      // }
      Object.keys(county_list).forEach((key) => {
        if (key.substring(0, 4) === code) {
          countyList.push({
            text: county_list[key],
            code: key,
          });
        }
      });
      return countyList;
    },
  },
  created() {
    this.provinceList = [];
  },
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
