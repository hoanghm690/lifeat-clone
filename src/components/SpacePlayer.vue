<template>
  <div class="space-player" v-if="space">
    <YouTube
      ref="youtubeRef"
      :videoid="space.youtubeId"
      :loop="play.loop"
      :autoplay="play.autoplay"
      :controls="play.controls"
      style="
        width: 120%;
        height: 120%;
        position: fixed;
        pointer-events: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    />
  </div>

  <div v-else>Space Player Loading...</div>
</template>

<script>
import { ref } from 'vue'
import { YoutubeVue3 } from 'youtube-vue3'

export default {
  components: {
    YouTube: YoutubeVue3
  },
  props: {
    space: Object,
    ambianceVolume: Number
  },
  setup() {
    const youtubeRef = ref(null)

    return {
      youtubeRef,
      play: { autoplay: 1, loop: 1, controls: 0 }
    }
  },
  watch: {
    youtubeRef: {
      handler(video) {
        video.player.playVideo()
        video.player.mute()
      }
    },
    ambianceVolume: {
      handler(value) {
        if (this.youtubeRef) {
          this.youtubeRef.player.setVolume(value)

          if (value === 0) {
            this.youtubeRef.player.mute()
          } else {
            this.youtubeRef.player.unMute()
          }
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
</style>
