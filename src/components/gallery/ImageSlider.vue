<template>
  <div class="slider-container">
    <transition-group name="slide-fade" tag="div">
      <div v-if="currentIndex >= 0 && currentIndex < images.length" :key="currentIndex" class="slide">
        <!-- Skeleton loader shown while the image is loading -->
        <div v-if="isLoading" class="skeleton-loader"></div>
        <img
          v-else
          class="slider-image"
          :src="currentImg.url"
          @load="imageLoaded"
          @error="imageError"
        />
      </div>
    </transition-group>

    <!-- Conditionally display next and prev buttons if there are multiple images -->
    <a class="prev" @click="prev" v-if="hasMultipleImages" href="#">&#10094;</a>
    <a class="next" @click="next" v-if="hasMultipleImages" href="#">&#10095;</a>
  </div>
</template>


<script>
export default {
  name: 'ImageSlider',
  data() {
    return {
      currentIndex: 0,
      isLoading: false,
    };
  },

  props: {
    images: Array,
  },

  methods: {
    next() {
      this.isLoading = true;
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex += 1;
        this.isLoading = false;
      } else {
        this.currentIndex = 0; // Loop back to the first image
        this.isLoading = false;
      }
    },
    prev() {
      this.isLoading = true;
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
        this.isLoading = false;
      } else {
        this.currentIndex = this.images.length - 1; // Loop back to the last image
        this.isLoading = false;
      }
    },
    imageLoaded() {
      this.isLoading = false;
    },
    imageError() {
      this.isLoading = false;
      // Optionally handle image load error
    },
  },

  computed: {
    hasMultipleImages() {
    return this.images.length > 1;
  },
    currentImg() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
  },
};
</script>

<style scoped>
/* Container for the slider with relative positioning */
.slider-container {
  display: flex;
  align-items: center;
  position: relative;
  max-width: 100%;
  margin: auto;
  overflow: hidden;
  min-height: 50vh;
}

/* Style for images within the slider */
.slider-image {
  width: 100%;
  max-height: 50vh;
  object-fit: cover;
}

/* Skeleton loader style */
.skeleton-loader {
  width: 100%;
  height: 50vh;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Transition effects for smoother slide and fade transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.1s ease, opacity 0.s ease;
  position: absolute;
  width: 100%;
  opacity: 0.1;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 1;
}

/* Navigation buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 12px;
  color: black;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0; /* This makes only one side rounded */
  text-decoration: none;
  user-select: none;
  background-color: rgba(255, 255, 255, 0.8); /* Light white background with slight transparency */
}


.next {
  right: 0;
}

.prev {
  left: 0;
}



/* Mobile specific adjustments */
@media screen and (max-width: 768px) {
  .prev,
  .next {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
