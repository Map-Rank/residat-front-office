<!-- src/components/FeedbackButton.vue -->
<template>
  <div class="feedback-container">
    <button class="feedback-button" @click="toggleForm">
      <p v-if="!showForm">{{$t('contact_us')}}</p>
      <p v-if="showForm">{{$t('close')}}</p>
    </button>
    <div v-if="showForm" class="feedback-form w-[300px] md:w-[500px]">
      <h3>{{$t('send_feedback')}}</h3>
      <textarea v-model="formData.text" placeholder="Enter your feedback here..." rows="4"></textarea>
      <button 
      :disabled="isLoadingBtn" 
      :class="
        isLoadingBtn 
          ? 'bg-gray-400 cursor-wait' 
          : 'bg-secondary-normal hover:bg-secondary-hover'
      " 
      @click="submitFeedback"
    >
      {{ $t('submit') }}
    </button>
      <h3></h3>
      <a :href="'https://wa.me/+237675988913'" target="_blank">
        <!-- <img src="/assets/icons/chat.svg" alt="Whatsapp icon"/> -->
        {{$t('get_on_whatsap')}}
      </a>
    </div>
    <div v-if="showMessage" class="feedback-message hidden sm:block">{{$t('get_to_us')}}</div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import {createFeedback} from '@/services/feedbackService.js'

export default {
  name: 'FeedbackButton',
  data() {
    const toast = useToast()

    return {
      showForm: false,
      toast,
      formData:{
        text:null,
        page_link:null,
        rating:10,
      },
      isLoadingBtn:false,
      showMessage: false,
      feedbackContainer: null
    }
  },
  mounted() {
    this.startHideShowCycle()
    this.showFeedbackMessage()
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
        // this.feedbackContainer.style.display =
        //   this.feedbackContainer.style.display === 'none' ? 'block' : 'none'
      }, 60000) // Toggle every minute
    },
    showFeedbackMessage() {
      this.messageTimeout = setTimeout(() => {
        this.showMessage = true
      }, 30000)
    },

    handleSuccess() {
        this.resetForm()
        this.showForm = false;
        this.toast.success('Thank you for your feedback!');
      },
  
      resetForm() {
          this.formData.text= '',
          this.formData.page_link= ''

      },
      
      handleError() {
        this.isLoadingBtn = false;
      },
      
   async submitFeedback() {
     
     if (this.formData.text == null) {
       this.toast.error('Please Enter a feedback')
       return
     } 
     
     this.isLoadingBtn = true;
          this.formData.page_link = window.location.href;
     
     let response = await createFeedback(this.formData, this.authStore, this.handleSuccess, this.handleError);
     console.log(response);
   
    
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
