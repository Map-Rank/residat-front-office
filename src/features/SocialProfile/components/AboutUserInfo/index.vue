<template>
<div class="bg-white rounded-lg p-6 shadow">
  <div class="infobox mb-2 pb-2">
    <h4 class="text-lg text-primary-normal font-bold mb-2">{{ $t('about_label') }} {{ username }}</h4>
    <p class=" text-gray-700 ">{{ $t('your_description_here') }}</p>
  </div>
  <div class="space-y-2">
    <template v-if="location">
      <div class="flex items-center">
        <img src="@/assets/icons/location.svg" :alt="$t('location_icon_alt')" />
        <span>{{ $t('from_label') }} {{ location }}</span>
      </div>
    </template>
    <template v-if="phone">
      <div class="flex items-center">
        <img src="@/assets/icons/call.svg" :alt="$t('phone_icon_alt')" />
        <span>{{ phone }}</span>
      </div>
    </template>
    <template v-if="email">
      <div class="flex items-center">
        <img src="@/assets/icons/mail.svg" :alt="$t('email_icon_alt')" />
        <span>{{ email }}</span>
      </div>
    </template>
    <template v-if="joinDate">
      <div class="flex items-center">
        <img src="@/assets/icons/calendar.svg" :alt="$t('join_date_icon_alt')" />
        <span>{{ joinDate }}</span>
      </div>
    </template>
  </div>
  <div v-if="showUpdateProfile" class="flex items-center mt-3">
    <button
      type="submit"
      @click="updatePost"
      :class="this.isLoading ? 'bg-gray-400 cursor-wait ' : 'bg-secondary-normal hover:bg-secondary-hover'"
      :disabled="this.isLoading"
      class="submit block w-full text-white py-1.5 rounded-full transition"
    >
      {{ $t('update_profile_button') }}
    </button>
  </div>
  <div v-if="deleteAccount" class="flex items-center mt-3">
    <button
      type="submit"
      @click="showDeleteConfirmation"
      :class="this.isLoading ? 'bg-gray-400 cursor-wait ' : 'bg-danger-normal hover:bg-danger-hover'"
      :disabled="this.isLoading"
      class="submit block w-full text-white py-1.5 rounded-full transition"
    >
      {{ $t('delete_account') }}
    </button>
  </div>
  <div v-if="!showUpdateProfile" class="flex items-center mt-3">
    <button
      type="submit"
      :class="this.isLoading ? 'bg-gray-400 cursor-wait ' : 'bg-secondary-normal hover:bg-secondary-hover'"
      :disabled="this.isLoading"
      class="submit block w-full text-white py-1.5 rounded-full transition"
    >
      {{ $t('follow')  }} {{ username }}
    </button>
  </div>
</div>
<ConfirmationModal ref="confirmationModal" @confirm="ValidatedeleteAccount()" />

</template>

<script>
import { deleteOwnAccount } from '@/features/Auth/services/authService'
import useAuthStore from '../../../../stores/auth'
import ConfirmationModal from '@/components/common/Modal/ConfirmationModal.vue'

export default {
  name: 'AboutUserInfo',
  components: {
    ConfirmationModal
  },
  props: {
    username: {
      type: String,
      required: true
    },
    description: String,
    location: String,
    phone: String,
    email: String,
    joinDate: String,
    website: String,
    showUpdateProfile:{
      type:Boolean,
      default:false
    },
    deleteAccount: {
      type:Boolean,
      default:false
    }
  },

  data(){
    const authStore = useAuthStore()

    return {
      authStore,
      isLoading: false,
    }
  },
  methods: {
    updatePost() {
      // console.log("test")
      this.isLoading = true;
      this.$router.push({ name: 'update-profile' })
    },
    showDeleteConfirmation() {
      console.log('Ouverture du modal');
      this.$refs.confirmationModal.show('Are you sure you want to delete your account?')
    },
    ValidatedeleteAccount() {
      deleteOwnAccount() // {{ edit_1 }} Appel de la fonction deleteOwnAccount
        .then(() => { // {{ edit_2 }} Utilisation de then pour gérer la promesse
          this.authStore.logOut(); // Déconnexion de l'utilisateur
          return this.$router.push({ name: 'authentication' }); // Redirection vers la page d'authentification
        })
        .catch((error) => { // {{ edit_3 }} Gestion des erreurs
          console.error('Error deleting account:', error);
        });
    }
  },
}
</script>

<style lang="scss" scoped>
// Add your styles here

.infobox{
    border-bottom: 0.1px solid var(--gray-dark, #505050);
}

span {
  color: var(--gray-dark, #505050);
  text-align: center;

  /* Paragraphs/P3-Bold */
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
}

@media screen and (min-width: 768px) {
  span {
    font-size: 12px; 
  }
}
</style>
