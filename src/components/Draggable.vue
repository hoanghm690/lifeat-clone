<template>
  <div
    class="draggable"
    draggable="true"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
    @drop="handleDrop"
    id="draggable"
  >
    <slot></slot>
  </div>
</template>

<script>
const width = window.innerWidth
const height = window.innerHeight

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      isDragging: false
    }
  },
  methods: {
    handleDragStart(event) {
      // Set the data that will be transferred during the drag operation
      event.dataTransfer.setData('text/plain', event.target.id)
    },

    handleDragOver(event) {
      // Prevent the default behavior, which would not allow the element to be dropped
      event.preventDefault()
    },

    handleDrop(event) {
      // Get the data that was transferred during the drag operation
      const id = event.dataTransfer.getData('text/plain')

      // Get the position of the drop target
      const x = event.clientX
      const y = event.clientY

      // Move the element to the drop target position
      const element = document.getElementById(id)
      element.style.left = x + 'px'
      element.style.top = y + 'px'
    }
  }
}
</script>

<style scoped>
.draggable {
  color: #ffffff;
  position: fixed;
  z-index: 103;
  left: 494.5px;
  top: 398.5px;
  width: 360px;
  height: auto;
  min-width: 360px;
  min-height: 150px;
  max-height: 704px;
  max-width: 1004px;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
}
</style>
