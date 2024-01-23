  <template>
    <div class="flex justify-between w-full">

      <div class="user-profile flex items-center space-x-2">
        <!-- <img :src="userProfileImage" alt="User profile" class="w-10 h-10 rounded-full" /> -->
        <avatar-placeholder
        :username="username"
        :size="20"
      />
        <div>
            <h5 class="font-bold cursor-pointer hover:underline" @click="viewProfileUser">{{ username }}</h5>
            <div class="flex items-center ">

              <h5 class="zoneName" @click="viewProfileUser">{{ zoneName }}  
                </h5>
              <img src="/assets/icons/location.svg" class="h-6" alt="" srcset="">
              <span class="caption-c1">{{ postDate }}</span>
            </div>
          
        </div>
      </div>

      <!-- <div>
        <span :style="{ backgroundColor: getColor(zoneName) }" class="p-1 px-2 rounded-full text-white items-center">{{ zoneName }}</span>      </div> -->
    </div>
  </template>
  <script>
  import AvatarPlaceholder from '@/components/common/AvatarPlaceholder/AvatarPlaceholder.vue';
  import randomColor from 'randomcolor';

  export default {
    name: 'UserPostInfo',
    components:{
      AvatarPlaceholder
    },
    props: {
      postDate: {},
      userProfileImage: {},
      username: {},
      zoneName:{
        type:String,
        default:'Zone Name'
      },
      id:{},
    },
    methods: {
      viewProfileUser() {
        this.$router.push({ name: 'view-profile-user', params: { id: this.id } })
      },
      getColor(zoneName) {
      // Generate a random color based on the zoneName
      const seed = zoneName.toLowerCase().replace(/\s/g, ''); // Convert the zoneName to lowercase and remove whitespace
      return randomColor({ seed });
    },


    }
  }
  </script>
  <style scoped>

  .zoneName{
    font-size: 13px;
    color: gray;
  }

  @media only screen and (max-width: 480px) {

    h5 {
      color: var(--primary-normal, #021d40);

      /* Desktop/H6-SemiBold */
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
    }
  }
  </style>