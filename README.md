# Vue Dynamic Component Wrapper

Reactive wrapper for dynamically loaded Vue.js 2 components.

## Installation

```shell script
npm install --save vue-dynamic-component-wrapper
```

or

```shell script
yarn add vue-dynamic-component-wrapper
```

## Usage

First you need to define your asynchronous `ComponentLoaderD`,
which is basically a function of type `(name: string) => Promise<Component>`.

In this context `Component` can be for example `ComponentOptions` object you could pass to `Vue.extend()`.

```typescript
// src/services/exampleAsyncComponentLoader.ts
import { Component } from "vue";
import { ComponentLoader } from "vue-dynamic-component-wrapper";

export const ExampleAsyncComponentLoader: ComponentLoader = {
  load(name: string): Promise<Component> {
    return new Promise<Component>(resolve => {
      // in real world application, you would probably load the component from the server
      setTimeout(() => {
        resolve({
          name: name,
          template: "<div>{{ this.message }}</div>",
          props: {  message: { type: String, default: "Hello world" } }
        });
      }, 1000);
    });
  }
};
```

Create a Vue component using `DynamicComponent` factory using the `ComponentLoaderD` you just defined.

```typescript
// src/components/exampleAsyncComponent.ts
import { DynamicComponent } from "vue-dynamic-component-wrapper";
import { ExampleAsyncComponentLoader } from "@/services/exampleAsyncComponentLoader";

export default DynamicComponent(ExampleAsyncComponentLoader);
```

```vuejs
<template>
  <div>
    <p>
      <label>Message:</label>
      <input v-bind="message" />
    </p>
    <ExampleAsyncComponent name="test" :message="message" />
  </div>
</template>

<script>
import ExampleAsyncComponent from "@/components/exampleAsyncComponent";

export default {
  name: "Example",
  components: { ExampleAsyncComponent },
  data() {
    return {
      message: "Hi there!"
    };
  }
};
</script>
```

### Running tests

Following commands will clone the repository, install dependencies and run tests.

```shell script
git clone git@github.com:tomas-pecserke/vue-dynamic-component-wrapper.git
cd vue-dynamic-component-wrapper
yarn install
yarn test
```
