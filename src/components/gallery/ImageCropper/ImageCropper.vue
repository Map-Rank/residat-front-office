<!-- eslint-disable vue/no-deprecated-slot-scope-attribute -->
<!-- src/components/ImageCropper.vue -->
<template>
    <div>
      <cropper 
        v-if="visible"
        :src="image"
        :stencil-props="{
          aspectRatio: 1,
          handlers: true,
          movable: true,
          scalable: true,
          resizable: true
        }"
        @result="onCropResult"
      >
        <div slot="stencil" slot-scope="{ coordinates, canvas, image }">
          <default-stencil :coordinates="coordinates" :canvas="canvas" :image="image" />
        </div>
      </cropper >
      <div v-else>
        <button @click="openCropper">Crop Image</button>
      </div>
    </div>
  </template>
  
  <script>
  import { Cropper } from 'vue-advanced-cropper'
  
  export default {
    name:'ImageCropper',
    components: {
      Cropper ,
    },
    props: ['image'],
    data() {
      return {
        visible: false,
        croppedImage: null,
      }
    },
    methods: {
      openCropper() {
        this.visible = true
      },
      onCropResult({ canvas }) {
        this.croppedImage = canvas.toDataURL()
        this.visible = false
        this.$emit('cropped', this.croppedImage)
      }
    }
  }
  </script>
  