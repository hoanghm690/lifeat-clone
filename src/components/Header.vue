<template>
  <div class="dynamic-element header-wrapper" :class="{ compressed: isSpacesOpen }">
    <div class="grouped-buttons flex items-center justify-center px-4 py-2">
      <div class="flex items-center justify-center">
        <IconLogoText />
      </div>

      <!-- <div class="room">My Room</div> -->
    </div>
    <div class="grouped-buttons flex items-center justify-center px-4 py-0">
      <div class="cursor-pointer" @click="onToggleFullScreen">
        <IconFullscreen />
      </div>
    </div>
  </div>
</template>

<script>
import IconLogoText from '../components/icons/IconLogoText.vue'
import IconFullscreen from '../components/icons/IconFullscreen.vue'
import { ref } from 'vue'

export default {
  props: {
    isSpacesOpen: Boolean
  },

  components: {
    IconLogoText,
    IconFullscreen
  },

  setup() {
    const isFullScreen = ref(false)

    return {
      isFullScreen
    }
  },

  methods: {
    onToggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
        this.isFullScreen = true
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
          this.isFullScreen = false
        }
      }
    }
  }
}
</script>

<style scoped>
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 8px;
  right: 8px;
  z-index: 4000;
}

.header-wrapper.compressed {
  left: 316px;
}

.grouped-buttons {
  height: 36px;
  border-radius: 7px;
}

.light .grouped-buttons {
  background-color: var(--light);
}

.dark .grouped-buttons {
  background-color: var(--dark);
}

.room {
  font-size: 12px;
  font-weight: 500;
}
</style>
