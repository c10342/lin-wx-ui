Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    icon: {
      type: String,
      require: true,
      value: "",
    },
    type: {
      type: String,
      value: "default",
    },
    size: {
      type: String,
      value: "",
    },
    color: {
      type: String,
      value: "",
    },
  },
  data: {},
  methods: {},
});
