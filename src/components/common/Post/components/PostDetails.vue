<template>
  <div class="">
    <div class="fixed z-10 inset-0  back overflow-y-auto " id="modal" >
        
        <div
        class="flex items-end  min-h-screen pt-4 px-4 pb-20 mt-8 sm:block sm:p-0"
      >

      <div class="grid grid-cols-2 bg-black  shadow rounded-lg  w-4/5 mx-auto">

        <div class="mt-3">
          <!-- Display post images  -->
          <div v-if="post.images && post.images.length" class="flex space-x-2 p-20 w-full h-full">
            <img
              v-for="(image, index) in post.images"
              :key="index"
              :src="image"
              class=" object-cover rounded"
              alt="Post image"
            />
          </div>
        </div>



          <!-- Post details and information  -->

        <div class="info pl-5 py-3">
          <div class="flex items-start space-x-4">
            <img class="w-10 h-10 rounded-full" :src="post.userImage" alt="User profile" />
            <div class="flex-1">
              <div class="font-bold">{{ post.username }}</div>
              <div class="text-sm text-gray-600">{{ post.postedDate }}</div>
              <p>{{ post.content }}</p>
            </div>
          </div>

          <div class="mt-3">
           
          </div>
          <div class="mt-3">
            <div class="space-y-2">
              <div
                v-for="(comment, index) in post.comments"
                :key="index"
                class="flex items-start space-x-2"
              >
                <img class="w-6 h-6 rounded-full" :src="comment.userImage" alt="User profile" />
                <div>
                  <div class="font-bold">{{ comment.username }}</div>
                  <div>{{ comment.text }}</div>

                  <div class="flex items-center space-x-2">
              <button class="p-2 rounded hover:bg-gray-100">
                <i class="far fa-heart"></i> Like
              </button>
              <button class="p-2 rounded hover:bg-gray-100">
                <i class="far fa-comment"></i> Comment
              </button>
            </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    </div>
  </div>
  <!-- </div>  -->
</template>

<script>
export default {
  name: 'PostDetails',
  data() {
    return {
      post: {
        username: 'User-name',
        userImage: 'public\\images\\unicef.png',
        content: 'How we can avoid natural disaster in our society!!!',
        postedDate: 'Posted: 20 October',
        images: ['src\\assets\\images\\Community\\Post1.png'],
        comments: [
          {
            username: 'Commenter One',
            userImage: 'public\\images\\comment.png',
            text: 'What a wonderful post I find this article very interesting'
          },
          {
            username: 'Commenter Two',
            userImage: 'public\\images\\comment.png',
            text: 'Insightful read, thanks for sharing!'
          }
          // ... more comments
        ]
      }
    }
  },
  props: {
    // post: {
    //   type: Object,
    //   required: true
    // }
  }
}
</script>

<style scoped>
.back{
    background: rgba(13, 13, 13, 0.30);
}
.info{
    background: var(--Sections, #F5F2F2);
}
</style>
