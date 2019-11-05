import Vue, { Component, VueConstructor } from "vue";
import { ComponentLoader } from "./index";

export const DynamicComponent = (loader: ComponentLoader): VueConstructor => {
  let resolveComponent: (component: Component<any, any, any, any>) => void;
  let rejectComponent: (reason: any) => void;

  return Vue.extend({
    name: "DynamicComponent" as string,
    components: {
      ChildComponent: (resolve, reject) => {
        resolveComponent = resolve;
        rejectComponent = reject;
      }
    },
    props: {
      name: {
        type: String,
        required: true
      }
    },
    mounted(): void {
      loader
        .load(this.name)
        .then(resolveComponent)
        .catch(rejectComponent);
    },
    template: '<component is="ChildComponent" v-bind="$attrs"></component>'
  });
};
