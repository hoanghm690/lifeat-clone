<script>
import Sidebar from '../components/Sidebar.vue'
import SpacePlayer from '../components/SpacePlayer.vue'

export default {
  components: {
    Sidebar,
    SpacePlayer
  },
  data() {
    return {
      shufflerCurrent: 'window',
      shufflerCategories: [
        {
          name: 'mountain',
          icon: './images/mountain.png'
        },
        {
          name: 'beach-with-umbrella',
          icon: './images/beach-with-umbrella.png'
        },
        {
          name: 'bullet-train',
          icon: './images/bullet-train.png'
        },
        {
          name: 'cityscape',
          icon: './images/cityscape.png'
        },
        {
          name: 'hot-beverage',
          icon: './images/hot-beverage.png'
        },
        {
          name: 'window',
          icon: './images/window.png'
        },
        {
          name: 'artist-palette',
          icon: './images/artist-palette.png'
        },
        {
          name: 'crystal-ball',
          icon: './images/crystal-ball.png'
        }
      ]
    }
  }
}
</script>

<template>
  <div class="screen">
    <Sidebar :shufflerCategories="shufflerCategories" :shufflerCurrent="shufflerCurrent" />
    <SpacePlayer />
  </div>
</template>
