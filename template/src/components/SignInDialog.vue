<template>
  <Dialog
    header="Sign In"
    :visible="visible"
    :closable="false"
  >
    <span>Enter your credentials</span>
    <div class="p-inputgroup p-mt-2 dialog-input">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText v-model="userInput.username" placeholder="Username" />
    </div>
    <div class="p-inputgroup p-mt-2 dialog-input">
      <span class="p-inputgroup-addon">
        <i class="pi pi-lock"></i>
      </span>
      <Password
        v-model="userInput.password"
        promptLabel="Password"
        :feedback="false"
      />
    </div>

    <template #footer>
      <Button class="p-link dialog-button" label="Cancel" @click="onCancel" />
      <Button
        class="p-link dialog-button p-ml-4"
        label="Sign In"
        @click="onSignIn"
      />
    </template>
  </Dialog>
</template>

<script>
import { reactive } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

export default {
  components: { Dialog, Button, InputText, Password },
  props: {
    visible: Boolean
  },
  setup(props, { emit }) {
    const userInput = reactive({ username: null, password: null });

    const onCancel = () => {
      emit("cancel");
    };

    const onSignIn = () => {
      emit("signin", {
        username: userInput.username,
        password: userInput.password
      });
      userInput.username = null;
      userInput.password = null;
    };

    return { userInput, onCancel, onSignIn };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/dialogs.scss";
</style>
