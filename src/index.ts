import { Component } from "vue";

export interface ComponentLoader {
  load(name: string): Promise<Component>;
}

export { DynamicComponent } from "./DynamicComponent";
