import { Weapp } from "./weapp";

type RecordToAny<T> = { [K in keyof T]: any };

export type CombinedComponentInstance<Data, Props, Methods> = Methods &
  WechatMiniprogram.Component.TrivialInstance &
  Weapp.FormField & {
    data: Data & RecordToAny<Props>;
  };

export interface LinComponentOptions<Data, Props, Methods, Instance> {
  data?: Data;
  field?: boolean;
  classes?: string[];
  mixins?: string[];
  props?: Props & Weapp.PropertyOption;
  relation?: Weapp.RelationOption<Instance> & {
    type: "ancestor" | "descendant";
    name: string;
  };
  relations?: {
    [componentName: string]: Weapp.RelationOption<Instance>;
  };
  methods?: Methods & Weapp.MethodOption<Instance>;

  watch?: Methods & Weapp.MethodOption<Instance>;

  // lifetimes
  beforeCreate?: (this: Instance) => void;
  created?: (this: Instance) => void;
  mounted?: (this: Instance) => void;
  destroyed?: (this: Instance) => void;
}
