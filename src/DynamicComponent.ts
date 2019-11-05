import Vue, { Component } from "vue";

export interface ComponentLoader {
  load(name: string): Promise<Component>;
}

export function DynamicComponent(loader: ComponentLoader) {
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
    template: '<component is="ChildComponent" v-bind="$attrs"></component>',
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
    }
  });
}
