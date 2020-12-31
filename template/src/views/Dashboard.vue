<template>
  <div class="p-grid p-fluid">
    <Summary
      class="p-lg-6"
      title="Summary"
      detail="Summary Details"
      value="42"
      style="background-color: green"
    />
    <Button label="Show Toast" class="p-lg-12" @click="showToast" />
    <Button
      style="margin-top: 1em"
      label="Show SignIn Dialog"
      class="p-lg-12"
      @click="showSignInDialog"
    />
    <SignInDialog
      :visible="signInDialogVisible"
      @cancel="signInDialogVisible = false"
      @signin="onSignIn"
    />
  </div>
</template>

<script>
import Summary from "@/components/Summary";
import SignInDialog from "@/components/SignInDialog";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

export default {
  components: { Summary, SignInDialog, Button },
  setup() {
    const toast = useToast();
    const signInDialogVisible = ref(false);

    const showToast = () => {
      toast.add({
        severity: "info",
        summary: "The Title",
        detail: "Details",
        life: 3000,
      });
    };

    const showSignInDialog = () => {
      signInDialogVisible.value = true;
    };

    const onSignIn = (input) => {
      console.log("Input", input);
      signInDialogVisible.value = false;
    };

    return { showToast, signInDialogVisible, showSignInDialog, onSignIn };
  },
};
</script>

<style lang="scss" scoped></style>
