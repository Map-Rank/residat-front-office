<template>
  <div>

    <div class="flex space-x-2 mb-4">
      <avatar-placeholder
        :username="`${post.creator[0].first_name} ${post.creator[0].second_name}`"
      ></avatar-placeholder>
      <!-- <img
        class="w-10 h-10 rounded-full"
        :src="`${imageHost}${post.creator[0].avatar}`"
        alt="User profile"
      /> -->
      <div class="flex-1">
        <h5 class="cursor-pointer hover:underline" @click="viewProfileUser(post.creator[0].id)">{{ post.creator[0].first_name }} {{ post.creator[0].last_name ?? "" }}</h5>
        <div class="flex items-center ">
            <img src="\assets\icons\location.png" class="h-4 mr-1" alt="" srcset="">
            <h5 class="zoneName" @click="viewProfileUser(post.creator[0].id)">{{ post.zone.name }}</h5>
            <p style="font-weight: 400; margin: 0 5px;"> • </p>
            <span class=" zoneName">{{ post.humanize_date_creation }}</span>
        </div>
      </div>
    </div>
    <p class=" pb-3">{{ post.content }}</p>
  </div>
</template>
<script>
import AvatarPlaceholder from '@/components/common/AvatarPlaceholder/AvatarPlaceholder.vue';
export default {
  name: 'UserInfoPostDetails',
  components:{
    AvatarPlaceholder
  },
  props: {
    imageHost: String,
    post: {},
    postDate: {},
    zoneName:{
        type:String,
        default:'Zone Name'
      },
      id:{},
  },
  methods: {
    viewProfileUser(id) {
      this.$router.push({ name: 'view-profile-user', params: { id: id } })
    },
  }
}
</script>
<style scoped>

h5 {
  color: var(--primary-normal, #021d40);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
}

.date{
  font-size: 13px;
  color: gray;
  font-weight: 400;
  font-family: 'Poppins'
}

@media only screen and (max-width: 600px) {
}

</style>