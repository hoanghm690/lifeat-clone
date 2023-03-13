<template>
  <div class="space-player">
    <div class="space-view">
      <iframe
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        :title="shufflerCurrent.title"
        width="100%"
        height="100%"
        :src="shufflerCurrent.video"
        id="widget2"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shufflerCurrent: Object
  }
}
</script>

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
