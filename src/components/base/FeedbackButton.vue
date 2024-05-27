<!-- src/components/FeedbackButton.vue -->
<template>
  <div class="feedback-container">
    <button class="feedback-button" @click="toggleForm">
      <p v-if="!showForm">Feedback</p>
      <p v-if="showForm">Close</p>
    </button>
    <div v-if="showForm" class="feedback-form">
      <h3>Send us your feedback</h3>
      <textarea v-model="feedback" placeholder="Enter your feedback here..." rows="4"></textarea>
      <button @click="submitFeedback">Submit</button>
      <h3></h3>
      <a :href="'https://wa.me/690160047'" target="_blank">
        <!-- <img src="/assets/icons/chat.svg" alt="Whatsapp icon"/> -->
        Get to us on Whatsap
      </a>
    </div>
    <div v-if="showMessage" class="feedback-message hidden sm:block">Get to us if you have any problem.</div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default {
  name: 'FeedbackButton',
  data() {
    const toast = useToast()

    return {
      showForm: false,
      toast,

      feedback: null,
      showMessage: false,
      feedbackContainer: null
    }
  },
  mounted() {
    this.startHideShowCycle()
    this.showFeedbackMessage()
    // document.addEventListener('click', this.handleClickOutside);
    // this.feedbackContainer = this.$refs.feedbackContainer;
  },
  beforeUnmount() {
    clearInterval(this.hideShowInterval)
    clearTimeout(this.messageTimeout)
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm
      this.showMessage = false
    },
    startHideShowCycle() {
      this.hideShowInterval = setInterval(() => {
        this.feedbackContainer.style.display =
          this.feedbackContainer.style.display === 'none' ? 'block' : 'none'
      }, 60000) // Toggle every minute
    },
    showFeedbackMessage() {
      this.messageTimeout = setTimeout(() => {
        this.showMessage = true
      }, 30000) // Show message after 30 seconds
    },
    submitFeedback() {
      //   const whatsappNumber = '+237690160047' // Replace with your WhatsApp number
      //   const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(this.feedback)}`
      //   window.open(whatsappUrl, '_blank')
      //   this.showForm = false
      //   this.feedback = ''
      //   this.toast.success('Thank you for your feedback!')

      if (this.feedback == null) {
        this.toast.error('Please Enter a feedback')
      } else {
        const email = 'konomelifuente@gmail.com' // Replace with your email
        const subject = 'MapandRank Feedback'
        const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(this.feedback)}`
        // window.location.href = emailUrl
        this.showForm = false
        this.feedback = null
        this.toast.success('Thank you for your feedback!')
      }
    }
  }
}
</script>

<style scoped>
.feedback-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.feedback-button {
  background-color: #7aa64e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  animation: float 2s ease-in-out infinite;
}

.feedback-button:hover {
  background-color: #5c7d3b;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.feedback-form {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.feedback-form h3 {
  margin-top: 0;
}

.feedback-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.feedback-form button {
  background-color: #7aa64e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.feedback-form button:hover {
  background-color: #5c7d3b;
}

.feedback-message {
  position: absolute;
  bottom: 100px;
  right: 0;
  background-color: #f8f9fa;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Media Query for Mobile Devices */
@media screen and (max-width: 768px) {
  .feedback-container {
    position: fixed;
    bottom:100px;
    right: 20px;
    z-index: 1000;
  }
  .feedback-message {
    display:hidden;
  }
}

</style>
