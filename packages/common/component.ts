import { LinComponentOptions, CombinedComponentInstance } from "./types/index";

const relationFunctions = {
  ancestor: {
    linked(parent) {
      // @ts-ignore
      this.parent = parent;
    },
    unlinked() {
      // @ts-ignore
      this.parent = null;
    }
  },
  descendant: {
    linked(child) {
      // @ts-ignore
      this.children = this.children || [];
      // @ts-ignore
      this.children.push(child);
    },
    unlinked(child) {
      // @ts-ignore
      this.children = (this.children || []).filter((it) => it !== child);
    }
  }
};

function mapKeys(source: object, target: object, map: object) {
  Object.keys(map).forEach((key) => {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function makeRelation(options, LinOptions, relation) {
  const { type, name, linked, unlinked, linkChanged } = relation;
  const { beforeCreate, destroyed } = LinOptions;
  if (type === "descendant") {
    options.created = function () {
      beforeCreate && beforeCreate.bind(this)();
      this.children = this.children || [];
    };
    options.detached = function () {
      this.children = [];
      destroyed && destroyed.bind(this)();
    };
  }
  options.relations = Object.assign(options.relations || {}, {
    [`../${name}/index`]: {
      type,
      linked(node) {
        relationFunctions[type].linked.bind(this)(node);
        linked && linked.bind(this)(node);
      },
      linkChanged(node) {
        linkChanged && linkChanged.bind(this)(node);
      },
      unlinked(node) {
        relationFunctions[type].unlinked.bind(this)(node);
        unlinked && unlinked.bind(this)(node);
      }
    }
  });
}

function LinComponent<Data, Props, Methods>(
  LinOptions: LinComponentOptions<
    Data,
    Props,
    Methods,
    CombinedComponentInstance<Data, Props, Methods>
  > = {}
): void {
  const options: any = {};

  mapKeys(LinOptions, options, {
    data: "data",
    props: "properties",
    mixins: "behaviors",
    methods: "methods",
    beforeCreate: "created",
    created: "attached",
    mounted: "ready",
    relations: "relations",
    destroyed: "detached",
    classes: "externalClasses",
    watch: "observers"
  });

  const { relation } = LinOptions;
  if (relation) {
    makeRelation(options, LinOptions, relation);
  }

  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push("custom-class");

  // map field to form-field behavior
  if (LinOptions.field) {
    options.behaviors = options.behaviors || [];
    options.behaviors.push("wx://form-field");
  }

  if (options.properties) {
    Object.keys(options.properties).forEach((name) => {
      if (Array.isArray(options.properties[name])) {
        // miniprogram do not allow multi type
        options.properties[name] = null;
      }
    });
  }

  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true
  };

  Component(options);
}

export { LinComponent };
