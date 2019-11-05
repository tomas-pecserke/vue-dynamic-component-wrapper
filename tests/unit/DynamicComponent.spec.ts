import { mount, shallowMount } from "@vue/test-utils";
import { DynamicComponent } from "../../src/DynamicComponent";
import { ComponentLoader } from "../../src/index";
import { Component } from "vue";

describe("DynamicComponent.ts", () => {
  it("renders dynamic component", () => {
    const ExampleAsyncComponentLoader: ComponentLoader = {
      load(name: string): Promise<Component> {
        return new Promise<Component>(resolve => {
          // in real world application, you would probably load the component from the server
          resolve({
            name: name,
            render: function(h) {
              // @ts-ignore
              return h("div", this.message);
            },
            props: { message: { type: String, default: "Hello world" } }
          });
        });
      }
    };

    const message = "new message";
    const wrapper = shallowMount(
      DynamicComponent(ExampleAsyncComponentLoader),
      { propsData: { name: "Test", message } }
    );

    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toMatch(message);
    });
  });
});
