<script>
import Sidebar from '../components/Sidebar.vue'
import SpacePlayer from '../components/SpacePlayer.vue'
import { getVideoById, getVideosByCategory, randomSpace } from '../services/app'

export default {
  components: {
    Sidebar,
    SpacePlayer
  },
  data() {
    return {
      space: null,
      ambianceVolume: 0,
      isMuted: true
    }
  },
  mounted() {
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
    }
  }
}
</script>

<template>
  <div class="screen">
    <Sidebar
      :space="space"
      @onCategoryChange="onCategoryChange"
      @onToggleVolume="onToggleVolume"
      :ambianceVolume="ambianceVolume"
      :isMuted="isMuted"
      @onChangeVolume="onChangeVolume"
    />
    <SpacePlayer :space="space" :ambianceVolume="ambianceVolume" />
  </div>
</template>

<style scoped></style>
