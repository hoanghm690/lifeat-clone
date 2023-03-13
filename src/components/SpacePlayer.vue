<template>
  <div class="space-player">
    <div class="space-view">
      <iframe
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="NYC Heavy Snowfall In A Cozy Apartment | Non-Christmas Version | 4K |  60FPS"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/ZYaF0zLfijg?autoplay=1&amp;mute=1&amp;controls=0&amp;start=4&amp;origin=https%3A%2F%2Flifeat.io&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1"
        id="widget2"
      ></iframe>
    </div>
  </div>
</template>

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
