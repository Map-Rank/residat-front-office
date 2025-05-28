<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-full max-w-sm">
      <!-- Image Section -->
      <img 
        src="/assets/images/AuthView/paymentImg.png" 
        alt="Payment Illustration" 
        class="w-52 h-auto mb-6"
      />
      <!-- Text Section -->
      <p class="text-center text-gray-800 text-base font-medium">
        Please check your message to complete <br />
        the payment process
      </p>
    </div>
  </div>
</template>

<script>
export default {
    name: "PaymentMessage",
    data () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>