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
      shufflerCurrent: {
        title: 'NYC Heavy Snowfall In A Cozy Apartment',
        name: 'window',
        video:
          'https://www.youtube.com/embed/ZYaF0zLfijg?autoplay=1&amp;mute=1&amp;controls=0&amp;start=4&amp;origin=https%3A%2F%2Flifeat.io&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1'
      },
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
          title: 'NYC Heavy Snowfall In A Cozy Apartment',
          name: 'window',
          icon: './images/window.png',
          video:
            'https://www.youtube.com/embed/ZYaF0zLfijg?autoplay=1&amp;mute=1&amp;controls=0&amp;start=4&amp;origin=https%3A%2F%2Flifeat.io&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1'
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
    <SpacePlayer :shufflerCurrent="shufflerCurrent" />
  </div>
</template>
