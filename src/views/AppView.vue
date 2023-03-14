<script>
import Sidebar from '../components/Sidebar.vue'
import SpacePlayer from '../components/SpacePlayer.vue'
import { getVideoByCategory } from '../services/app'

export default {
  components: {
    Sidebar,
    SpacePlayer
  },
  data() {
    return {
      spaceCurrent: 1,
      space: null
    }
  },
  created() {
    const spaceRandom = 1
    const query = this.$route.query

    if (!query || (query && Object.keys(query).length === 0)) {
      this.$router.push({ query: { space: spaceRandom } })
    }

    const space = getVideoByCategory({ videoId: spaceRandom, categoryId: this.spaceCurrent })
    this.space = space

    console.log(space)
  }
}
</script>

<template>
  <div class="screen">
    <Sidebar :space="space" />
    <SpacePlayer :space="space" />
  </div>
</template>
