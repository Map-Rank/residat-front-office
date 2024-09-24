<!-- src/pages/Notifications.vue -->
<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">{{ isInstitution ? "Inbox" : "Inbox" }}</h1>
      <button
        v-if="isInstitution"
        @click="createNotification"
        class="bg-primary-normal text-white px-4 py-2 rounded"
      >
        Send Mass Message
      </button>
    </div>

    <div class="mb-4">
      <button
        :class="[
          'px-4 py-2 rounded-t-lg',
          activeTab === 'important' ? 'bg-primary-normal text-white' : 'bg-gray-200',
        ]"
        @click="activeTab = 'important'"
      >
        {{ isInstitution ? "Recently Sent" : "Important messages" }}
      </button>
      <button
        :class="['px-4 py-2 rounded-t-lg ml-2', activeTab === 'inbox' ? 'bg-primary-normal text-white' : 'bg-gray-200']"
        @click="activeTab = 'inbox'"
      >
        {{ isInstitution ? 'Inbox' : 'Chat Room' }}
      </button>
    </div>

    <div v-if="isLoading">
      <AvatarEventShimmer :numShimmers="8" :componentHeight="'auto'" />
    </div>

    <div v-else>


      <div >
        <div v-if="filteredNotifications.length" class="bg-white shadow-md rounded-lg">
          <NotificationItem
            v-for="notification in filteredNotifications"
            :key="notification.id"
            :notification="notification"
            :isInstitution="isInstitution"
            @refreshNotificatoins="fetchNotifications()"
          />
        </div>
        <div v-else class="text-center mt-3">
          {{ $t("no_alert") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationItem from "../Notification/components/NotificationItem.vue";
import AvatarEventShimmer from "@/components/common/ShimmerLoading/AvatarPostShimmer.vue";
import { getNotifications } from "@/services/notificationService.js";
import useAuthStore from "@/stores/auth.js";

export default {
  name: "ChatRoomView",
  components: {
    NotificationItem,
    AvatarEventShimmer,
  },

  async created() {
    try {
      await this.fetchNotifications();
      // const authStore = useAuthStore();

      // const user = authStore.user;
      // this.isInstitution = user.role[0].name == "admin" ? true : false;
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  },
  data() {
    const authStore = useAuthStore();
    return {
      authStore,
      isInstitution: authStore.user.type === "COUNCIL",
      // isInstitution: true,
      activeTab: "important",
      isLoading: true,
      notifications: [],
      institutionalNotifications: [],
    };
  },
  computed: {
    filteredNotifications() {
      return this.notifications;
    },
  },
  methods: {
    createNotification() {
      this.$router.push({ name: "broadcast-notification" });
    },
    toggleInstitution(id) {
      this.institutionalNotifications = this.institutionalNotifications.map(
        (institution) => {
          if (institution.id === id) {
            institution.isVisible = !institution.isVisible;
          } else {
            institution.isVisible = false;
          }
          return institution;
        }
      );
    },
    async fetchNotifications() {
      this.hasNewEvents = false;
      this.isLoading = true;
      try {
        this.notifications = await getNotifications(0, 10, this.authStore.user.token);
        this.institutionalNotifications = await getNotifications(
          0,
          10,
          this.authStore.user.token
        );
      } catch (error) {
        console.error("Failed to load notifications:", error);
        this.showPageRefresh = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
