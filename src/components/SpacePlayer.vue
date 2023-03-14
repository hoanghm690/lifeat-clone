<template>
  <div class="space-player" v-if="space">
    <div class="space-view">
      <iframe
        ref="video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        :title="space.title"
        width="100%"
        height="100%"
        :src="space.url"
      ></iframe>
    </div>
  </div>

  <div v-else>Space Player Loading...</div>
</template>

<script>
export default {
  props: {
    space: Object,
    ambianceVolume: Number
  },

  watch: {
    ambianceVolume: {
      immediate: true,
      handler(value) {
        const video = this.$refs.video

        if (value === 0 && this.space && this.space.url) {
          const newUrl = this.space.url.replace('mute=0', 'mute=1')
          video.src = newUrl
        }

        if (value > 0 && this.space && this.space.url) {
          const newUrl = this.space.url.replace('mute=1', 'mute=0')
          video.src = newUrl
        }
      }
    }
  }
}
</script>

<style scoped>
.space-player {
  z-index: 1;
  width: 100vw;
  height: 100vh;
}

.space-view {
  width: 100%;
  height: 100%;
}

iframe {
  position: fixed;
  pointer-events: none;
  top: 50%;
  left: 50%;
  width: 120vw;
  height: 120vh;
  transform: translate(-50%, -50%);
}
</style>
