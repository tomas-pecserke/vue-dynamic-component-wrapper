import Vue, { Component } from "vue";
import App from "./App.vue";
import { ComponentLoader, DynamicComponent } from "@/DynamicComponent";

Vue.config.productionTip = false;

const loader: ComponentLoader = {
  load(name: string): Promise<Component> {
    return new Promise<Component>(resolve => {
      setTimeout(() => {
        resolve({
          name: name,
          template: "<div>{{ message }}</div>",
          props: {
            message: {
              type: String,
              default: "Hello world"
            }
          }
        });
      }, 1000);
    });
  }
};
Vue.component("DynamicComponent", DynamicComponent(loader));

new Vue({
  render: h => h(App)
}).$mount("#app");
