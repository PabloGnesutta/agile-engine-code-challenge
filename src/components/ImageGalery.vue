<template>
  <div>
    <h1>Image Galery</h1>
    <div class="galery">
      <img
        v-for="(image, index) in images"
        :key="image.id"
        :src="image.cropped_picture"
        @click="fetchDetails(index)"
      />
    </div>
    <ImagePopup
      ref="imagePopup"
      v-if="details"
      :image="details"
      @selectImage="selectImage"
      @close="details = null"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import ImagePopup from "@/components/ImagePopup";
export default {
  name: "ImageGalery",
  components: { ImagePopup },
  props: { images: { type: Array, default: () => [] } },
  data() {
    return {
      details: null,
      selectedImage: null,
      selectedImageIndex: null,
    };
  },
  methods: {
    ...mapActions({
      getImageDetails: "getImageDetails",
    }),

    async fetchDetails(index) {
      this.details = null;
      this.selectedImageIndex = index;
      this.details = await this.getImageDetails(this.images[index].id);
      console.log(this.details);
    },

    openImage(index) {
      this.selectedImageIndex = index;
      this.selectedImage = this.images[index];
      // this.$nextTick(() => {
      //   this.$refs.imagePopup.fetchDetails();
      // });
    },

    selectImage(step) {
      let newIndex = this.selectedImageIndex + step;
      if (newIndex < 0) {
        newIndex = this.images.length - 1;
      } else if (newIndex > this.images.length - 1) {
        newIndex = 0;
      }
      this.fetchDetails(newIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 0.5em;
}
.galery {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  column-gap: 1em;
  row-gap: 1em;

  img {
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>