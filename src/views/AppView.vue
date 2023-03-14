<script>
import Sidebar from '../components/Sidebar.vue'
import SpacePlayer from '../components/SpacePlayer.vue'
import { getVideoByCategory } from '../services/app'
import { randomElement } from '../utils/random'

export default {
  components: {
    Sidebar,
    SpacePlayer
  },
  data() {
    return {
      categoryIdDefault: 1,
      space: null
    }
  },
  mounted() {
    this.fetchSpace({ categoryId: this.categoryIdDefault })
  },
  methods: {
    fetchSpace({ categoryId }) {
      let videoId
      const query = this.$route.query
      const spaceRandom = randomElement({ categoryId: this.categoryIdDefault }).id

      if (!query || (query && !query.space)) {
        this.$router.push({ query: { space: spaceRandom } })
        videoId = spaceRandom
      } else if (query && query.space) {
        videoId = query.space
      }

      if (videoId && categoryId) {
        const space = getVideoByCategory({ videoId, categoryId })
        this.space = space
      }
    },

    onCategoryChange(category) {
      const categoryId = category.id
      const spaceRandom = randomElement({ categoryId }).id
      const space = getVideoByCategory({ videoId: spaceRandom, categoryId })

      this.space = space
      this.categoryIdDefault = categoryId
      this.$router.replace({ query: { space: space.id } })
    }
  }
}
</script>

<template>
  <div class="screen">
    <Sidebar :space="space" @onCategoryChange="onCategoryChange" />
    <SpacePlayer :space="space" />
  </div>
</template>
