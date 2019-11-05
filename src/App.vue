<template>
  <div id="app">
    <p>
      <label for="messageInput">Message:</label>
      <input id="messageInput" type="text" v-model="message" required />
    </p>
    <p>
      <DynamicComponent name="test" :message="message"></DynamicComponent>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  private message: string = "Hi there";
}
</script>
