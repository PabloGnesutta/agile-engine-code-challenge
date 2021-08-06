<template>
  <div class="home">
    <div v-if="!initialLoad" class="galery-wrapper">
      <ImageGalery :images="images" />
    </div>
    <!-- This could be triggered when user scrolls to the bottom of the page -->
    <div v-if="!loading" class="fetch-more" @click="fetchImages">
      FETCH MORE IMAGES
    </div>
    <div v-else class="loading">...Loading images...</div>
    <!-- Also I could implement pagination with buttons indicating how
    many pages there are and in which page we are currently on -->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ImageGalery from "@/components/ImageGalery.vue";
import PhowoView from "@/components/PhowoView.vue";

export default {
  name: "Home",
  components: { ImageGalery, PhowoView },

  computed: {
    ...mapGetters({
      currentPage: "currentPage",
      hasMore: "hasMore",
      images: "images",
    }),
  },

  data() {
    return {
      initialLoad: true,
      loading: true,
    };
  },

  mounted() {
    //first we should verify if current token is valid,
    //but there is no "getMe" or similar endpoint
    //so I login everytime and get a new token
    this.login();
  },

  methods: {
    ...mapMutations({
      setCurrentPage: "setCurrentPage",
    }),

    ...mapActions({
      getAccessToken: "getAccessToken",
      getImages: "getImages",
    }),

    async login() {
      const success = await this.getAccessToken();
      if (success) this.fetchImages();
    },

    async fetchImages() {
      if (!this.hasMore) {
        return alert("You've reached the last page!");
      }

      this.loading = true;
      this.setCurrentPage(this.currentPage + 1);
      await this.getImages();
      this.loading = false;
      this.initialLoad = false;
    },
  },
};
</script>

<style scoped>
.fetch-more {
  margin-top: 2em;
  padding: 2em;
  cursor: pointer;
  font-size: 1.5rem;
}

.loading {
  margin-top: 2em;
  padding: 2em;
}
</style>
