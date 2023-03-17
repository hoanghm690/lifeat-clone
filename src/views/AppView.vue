<script>
import Sidebar from '../components/Sidebar.vue'
import SpacePlayer from '../components/SpacePlayer.vue'
import Fortune from '../components/Fortune.vue'
import Timer from '../components/Timer.vue'
import { getVideoById, getVideosByCategory, randomSpace } from '../services/app'
import storage from '../utils/storage'
import { SK_FORTUNE_WIDGET, SK_DARK_MODE, SK_TIMER_WIDGET } from '../utils/constants'

export default {
  components: {
    Sidebar,
    SpacePlayer,
    Fortune,
    Timer
  },

  data() {
    return {
      space: null,
      ambianceVolume: 0,
      isMuted: true,
      toolbar: {
        isSpacesOpen: true,
        isFortuneOpen: false,
        isDarkMode: false,
        isTimerOpen: false
      }
    }
  },

  setup() {
    const fortuneWidget = storage.getData({ key: SK_FORTUNE_WIDGET })
    const darkMode = storage.getData({ key: SK_DARK_MODE })
    const timerWidget = storage.getData({ key: SK_TIMER_WIDGET })

    return {
      fortuneWidget: JSON.parse(fortuneWidget),
      timerWidget: JSON.parse(timerWidget),
      darkMode: JSON.parse(darkMode)
    }
  },

  mounted() {
    if (this.fortuneWidget && this.fortuneWidget.wasOpen) {
      this.toolbar.isFortuneOpen = true
    }

    if (this.timerWidget && this.timerWidget.wasOpen) {
      this.toolbar.isTimerOpen = true
    }

    if (this.darkMode) {
      this.toolbar.isDarkMode = true
    }

    // handle get space
    const query = this.$route.query

    if (!query || Object.keys(query).length === 0) {
      const spaceRandom = randomSpace()

      this.$router.push({ query: { space: spaceRandom.id } })
      this.space = spaceRandom

      return
    }

    if (query && query.space) {
      const video = getVideoById(query.space)

      this.space = video
    }
  },

  methods: {
    onCategoryChange(category) {
      const categoryId = category.id
      const videosByCategory = getVideosByCategory(categoryId)

      if (videosByCategory.length) {
        const spaceRandom = randomSpace(videosByCategory)

        this.space = spaceRandom
        this.$router.replace({ query: { space: spaceRandom.id } })
      } else {
        alert('Oops. No spaces available. Please try again later.')
      }
    },

    onToggleVolume() {
      this.isMuted = !this.isMuted

      if (this.ambianceVolume === 0) {
        this.ambianceVolume = 100
      } else {
        this.ambianceVolume = 0
      }
    },

    onChangeVolume(value) {
      const volume = Number(value)

      if (volume === 0) {
        this.isMuted = true
      } else {
        this.isMuted = false
      }

      this.ambianceVolume = volume
    },

    onCloseFortune() {
      this.toolbar.isFortuneOpen = false
    },

    onCloseTimer() {
      this.toolbar.isTimerOpen = false
    },

    onToggleSpaces() {
      this.toolbar.isSpacesOpen = !this.toolbar.isSpacesOpen
    },

    onToggleFortune() {
      this.toolbar.isFortuneOpen = !this.toolbar.isFortuneOpen
    },

    onToggleTheme() {
      this.toolbar.isDarkMode = !this.toolbar.isDarkMode
      storage.setData({
        key: SK_DARK_MODE,
        value: JSON.stringify(this.toolbar.isDarkMode)
      })
    },

    onToggleTimer() {
      this.toolbar.isTimerOpen = !this.toolbar.isTimerOpen
    }
  }
}
</script>

<template>
  <div class="screen" :class="{ light: !toolbar.isDarkMode, dark: toolbar.isDarkMode }">
    <Sidebar
      :space="space"
      :ambianceVolume="ambianceVolume"
      :isMuted="isMuted"
      :toolbar="toolbar"
      @onCategoryChange="onCategoryChange"
      @onToggleVolume="onToggleVolume"
      @onChangeVolume="onChangeVolume"
      @onToggleSpaces="onToggleSpaces"
      @onToggleFortune="onToggleFortune"
      @onToggleTheme="onToggleTheme"
      @onToggleTimer="onToggleTimer"
    />

    <SpacePlayer :space="space" :ambianceVolume="ambianceVolume" />

    <Fortune :wasOpen="toolbar.isFortuneOpen" @onCloseFortune="onCloseFortune" />

    <Timer :wasOpen="toolbar.isTimerOpen" @onCloseTimer="onCloseTimer" />
  </div>
</template>

<style scoped></style>
