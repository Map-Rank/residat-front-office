<template>
  <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
    <button-ui
      leftIcon="src\assets\icons\colored\google.svg"
      label="Google"
      color="bg-white-gray"
      textCss="text-black-dark text-center"
      customCss="flex justify-center"
      :isRoundedFull="true"
    >
    </button-ui>
    <button-ui
      leftIcon="src\assets\icons\colored\apple.svg"
      label="Apple"
      color="bg-white-gray"
      textCss="text-black-dark"
      customCss="flex justify-center"
      :isRoundedFull="true"
    >
    </button-ui>
    <button-ui
      leftIcon="src\assets\icons\colored\facebook.svg"
      label="Facebook"
      color="bg-white-gray"
      textCss="text-black-dark"
      customCss="flex justify-center"
      :isRoundedFull="true"
    >
    </button-ui>
  </div>
</template>
<script>
import ButtonUi from "@/components/base/ButtonUi.vue";
export default {
  components: {
    ButtonUi,
  },
};
</script>
