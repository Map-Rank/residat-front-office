<template>
  <div class="bg-white rounded-lg p-6 shadow">
    <div class="infobox mb-2 pb-2">
        <h4 class="text-lg text-primary-normal font-bold mb-2">About {{ username }}</h4>
        <p class="text-sm text-gray-700 ">{{ description }}</p>
    </div>
    <div class="space-y-2">
      <template v-if="location">
        <div class="flex items-center">
          <img src="@/assets/icons/location.svg" alt="Location" />
          <span>From {{ location }}</span>
        </div>
      </template>
      <template v-if="phone">
        <div class="flex items-center">
          <img src="@/assets/icons/call.svg" alt="Phone" />
          <span>{{ phone }}</span>
        </div>
      </template>
      <template v-if="email">
        <div class="flex items-center">
          <img src="@/assets/icons/mail.svg" alt="Email" />
          <span>{{ email }}</span>
        </div>
      </template>
      <template v-if="joinDate">
        <div class="flex items-center">
          <img src="@/assets/icons/calendar.svg" alt="Join Date" />
          <span>{{ joinDate }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUserInfo',
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
    website: String
  }
}
</script>

<style lang="scss" scoped>
// Add your styles here

.infobox{
    border-bottom: 0.1px solid var(--gray-dark, #505050);
}
p {
  color: var(--gray-dark, #505050);

  /* Captions/C2 */
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 160% */
}
span {
  color: var(--gray-dark, #505050);
  text-align: center;

  /* Paragraphs/P3-Bold */
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
</style>
