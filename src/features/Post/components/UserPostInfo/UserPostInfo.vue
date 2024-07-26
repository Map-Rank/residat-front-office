  <template>
    <div class="flex justify-between w-full">

      <div class="user-profile flex items-center space-x-2">
        <img :src="userProfileImage" alt="User profile" class="w-10 h-10 rounded-full" />
    
        <div>
            <h5 class=" cursor-pointer hover:underline" @click="viewProfileUser">{{ username }}</h5>
            <div class="flex items-center ">

              <img src="\assets\icons\location.png" class="h-4 mr-1" alt="" srcset="">
            <h5 class="zoneName" @click="viewProfileUser">{{ zoneName }}</h5>
            <p style="font-weight: 400; margin: 0 5px;"> • </p>
            <span class=" zoneName">{{ postDate }}</span>
            
            </div>
          
        </div>
      </div>

  
    </div>
  </template>
  <script>
  import randomColor from 'randomcolor';
  import { checkAuthentication } from '@/utils/authUtils.js';

  export default {
    name: 'UserPostInfo',
  
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

        if (checkAuthentication()) {
        this.$router.push({ name: 'view-profile-user', params: { id: this.id } })
        return
      }
      
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
    font-weight: 400;
    font-family: 'Poppins'
  }

  h5 {
    color: var(--primary-normal, #021d40);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }

  @media only screen and (max-width: 480px) {

    h5 {
      color: var(--primary-normal, #021d40);
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
    }
  }
  </style>