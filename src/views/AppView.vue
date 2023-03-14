<script>
import Sidebar from '../components/Sidebar.vue'
import SpacePlayer from '../components/SpacePlayer.vue'
import { getVideoByCategory } from '../services/app'
import { randomElement } from '../utils/random'
import storage from '../utils/storage'

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

        if (space) {
          this.space = space
        } else {
          this.$router.push({ query: { space: spaceRandom } })
          const spaceAgain = getVideoByCategory({ videoId: spaceRandom, categoryId })
          this.space = spaceAgain
        }
      }
    },

    onCategoryChange(category) {
      const categoryId = category.id
      const spaceRandom = randomElement({ categoryId }).id
      const space = getVideoByCategory({ videoId: spaceRandom, categoryId })

      this.space = space
      this.categoryIdDefault = categoryId
      this.$router.replace({ query: { space: space.id } })

      storage.setData({ key: 'category', value: categoryId })
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
