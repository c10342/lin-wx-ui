Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    areaList: {
      type: Object,
      value: {},
      observer: "updateColumns",
    },
  },
  data: {
    columns: [],
  },
  methods: {
    onConfirm() {},
    onCancel() {},
    onChange(event) {
      const { index, picker } = event.detail;
      if (index === 0) {
        this.provinceChange(picker);
      } else if (index === 1) {
        this.cityChange(picker);
      }
    },
    provinceChange(picker) {
      const selectProvice = picker.getColumnValue(0);
      const cityList = this.getCity(selectProvice);
      picker.setColumnValues(1, cityList);
      this.cityChange(picker);
      picker.setColumnIndex(1, 0);
    },
    cityChange(picker) {
      const selectCity = picker.getColumnValue(1);
      const countyList = this.getCounty(selectCity);
      picker.setColumnValues(2, countyList);
      picker.setColumnIndex(2, 0);
    },
    updateColumns() {
      const columns = [];
      const provinceList = this.getProvince();
      columns.push({
        values: provinceList,
      });
      if (provinceList.length > 0) {
        const cityList = this.getCity(provinceList[0]);
        columns.push({
          values: cityList,
        });
        if (cityList.length > 0) {
          const countyList = this.getCounty(cityList[0]);
          columns.push({
            values: countyList,
          });
        }
      }
      this.setData({
        columns,
      });
    },
    getProvince() {
      const { areaList = {} } = this.properties;
      const { province_list = {} } = areaList;
      const provinceList = [];
      for (const key in province_list) {
        provinceList.push({
          text: province_list[key],
          code: key,
        });
      }
      return provinceList;
    },
    getCity(province) {
      const code = province.code.substring(0, 2);
      const { areaList = {} } = this.properties;
      const { city_list = {} } = areaList;
      const cityList = [];
      for (const key in city_list) {
        if (key.substring(0, 2) === code) {
          cityList.push({
            text: city_list[key],
            code: key,
          });
        }
      }
      return cityList;
    },
    getCounty(city) {
      const code = city.code.substring(0, 4);
      const { areaList = {} } = this.properties;
      const { county_list = {} } = areaList;
      const countyList = [];
      for (const key in county_list) {
        if (key.substring(0, 4) === code) {
          countyList.push({
            text: county_list[key],
            code: key,
          });
        }
      }
      return countyList;
    },
  },
  created: function() {
    this.provinceList = [];
  },
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
