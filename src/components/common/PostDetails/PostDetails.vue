<template>
  <div class="">
    <div class="fixed z-10 inset-0 back overflow-y-auto" id="modal">
      <div class="flex items-end min-h-screen pt-4 px-4 pb-20 mt-8 sm:block sm:p-0">
        <div class="grid grid-cols-2 bg-black shadow rounded-lg w-4/5 mx-auto">
          <!-- Display post images  -->
          <div class="mt-3">
            <div v-if="post.images && post.images.length" class="flex space-x-2 p-20 w-full h-full">
              <img
                v-for="(image, index) in post.images"
                :key="index"
                :src="image"
                class="object-cover rounded"
                alt="Post image"
              />
            </div>
          </div>

          <!-- Post details and information  -->

          <div class="info relative pl-5 py-3">
            <!-- user informations -->
            <div class="grid gap-2 my-5 relative border-b-2 pb-4 mr-5 items-start">
              <div class="flex justify-between">
                <div class="flex space-x-2">
                  <img class="w-10 h-10 rounded-full" :src="post.userImage" alt="User profile" />
                  <div class="flex-1">
                    <h5 class="font-bold">{{ post.username }}</h5>
                    <div class="text-sm text-gray-600">{{ post.postedDate }}</div>
                  </div>
                </div>
                <button>
                  <img src="src\assets\icons\dismiss.svg" alt="">
                </button>
              </div>
              <p>{{ post.content }}</p>

            </div>

            <!-- list of Comment  -->
            <div class="mt-3">
              <div class="space-y-2">
                <div
                  v-for="(comment, index) in post.comments"
                  :key="index"
                  class="flex items-start space-x-4"
                >
                  <img class="w-10 h-10 rounded-full" :src="comment.userImage" alt="User profile" />

                  <div>
                    <div>
                      <div>
                        <h5 class="comment-user-name">{{ comment.username }}</h5>
                        <div class="comment-text">{{ comment.text }}</div>
                        <div class="text-sm caption-1">{{ comment.postedDate }}</div>
                      </div>

                      <div class="flex space-x-2 mt-2">
                        <button class="rounded hover:bg-gray-100 text-gray-normal font-bold">
                          Like
                        </button>

                        <button class="rounded hover:bg-gray-100 text-gray-normal font-bold">
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- comment interaction section -->
            <div class="absolute bottom-0 my-4 space-y-4 w-full">
              <div class="flex space-x-4">
                <img src="src\assets\icons\heart.svg" alt="" />
                <img src="src\assets\icons\bookmark.svg" alt="" />
              </div>

              <div class="flex space-x-4">
                <input
                  type="text"
                  placeholder="Add a comments"
                  class="w-3/4  p-2 border bg-white-gray border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />

                <!-- Post button -->
                <button
                  class=" btn text-green-500  px-6 py-2 rounded-lg hover:bg-white focus:outline-none"
                >
                  Post
                </button>
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
.back {
  background: rgba(13, 13, 13, 0.3);
}

.btn{
text-align: center;
font-feature-settings: 'clig' off, 'liga' off;

/* Desktop / Link Small */
font-family: Poppins;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 28px; /* 175% */
letter-spacing: 0.75px;
}
.info {
  background: var(--Sections, #f5f2f2);
}
.comment-user-name {
  color: #000;

  /* Paragraphs/P3-Bold */
  font-family: Raleway;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.comment-text {
  color: #000;

  /* Paragraphs/P4 */
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}

.caption-1 {
  color: var(--gray-normal, #6b6b6b);

  /* Captions/C1 */
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}
</style>
