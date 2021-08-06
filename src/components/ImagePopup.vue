<template>
  <div>
    <div class="backdrop" @click.self="closePopup">
      <div class="close-icon" @click="closePopup">CLOSE</div>
      <div class="container" @click.self="closePopup">
        <span class="desktop-nav" @click="selectImage(-1)">PREVIOUS</span>
        <div class="image-container">
          <div class="share" @click="copyUrl">Share</div>
          <img :src="image.full_picture" />
          <div class="image-overlay">
            <div class="author">{{ image.author }}</div>
            <div class="camera">{{ image.camera }}</div>
            <div class="tags">{{ image.tags }}</div>
          </div>
        </div>
        <span class="desktop-nav" @click="selectImage(1)">NEXT</span>
      </div>
      <div class="mobile-nav">
        <span class="mobile-nav-item" @click="selectImage(-1)">PREVIOUS</span>
        <span class="mobile-nav-item" @click="selectImage(1)">NEXT</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { image: { type: Object, default: () => {} } },
  data() {
    return {
      details: null,
    };
  },

  beforeDestroy() {
    window.removeEventListener("keyup", this.handleEscape);
  },

  async mounted() {
    window.addEventListener("keyup", this.handleEscape);
  },

  methods: {
    /*
      The way this behaves is really horrible right now
      I had a misunderstanding with something, and when I realized it, it was late.
      But yeah, when you select another image with the navigation
      everything disappears and re-appears.
      It can be much improved, but I don't want to overextend in time.
    */
    selectImage(step) {
      this.$emit("selectImage", step);
    },

    copyUrl() {
      var input = document.createElement("input");
      input.setAttribute("value", this.image.full_picture);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      //This could be much improved, making a toast, or a modal, or anything really
      //but the link gets copied which is the important thing =)
      alert("Link copied to clipboard!");
    },

    handleEscape(e) {
      if (e.keyCode === 27) {
        this.closePopup();
      }
    },

    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
// Every action button (close, previous, next, etc)
// should be SVGs or alike, I went for the fastest thing
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  overflow: auto;

  .close-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-weight: bold;
    font-size: 1.25rem;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: coral;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }

  .image-container {
    position: relative;

    .share {
      position: absolute;
      padding: 1em;
      top: 0.5em;
      right: 0.5em;
      border-radius: 10px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.6)
      );
      cursor: pointer;

      &:hover {
        background: rgb(0, 0, 0);
      }
    }
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.5em 0.5em 1em;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
    line-height: 1.6;

    .author {
      font-size: 1.2rem;
    }
    .camera {
      font-size: 0.8rem;
    }
    .tags {
      font-size: 0.75rem;
      color: coral;
    }
  }

  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: relative;
    top: 2em;
  }

  img {
    max-width: 100%;
  }
}

@media (min-width: 700px) {
  .backdrop {
    flex-direction: row;

    .desktop-nav {
      display: inline-block;
      font-size: 1.25rem;
      min-width: 100px;
      cursor: pointer;
      padding: 1em;
      transition: color 0.3s ease;

      &:hover {
        color: teal;
      }
    }

    .mobile-nav {
      display: none;
    }
  }
}
</style>