<template>
  <div
    class="draggable"
    @mousedown="dragMouseDown"
    ref="draggable"
    :style="`left: ${widget.left}px; top: ${widget.top}px`"
  >
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import storage from '../utils/storage.js'

var pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0

export default {
  props: {
    name: String,
    widget: Object,
    storageKey: String
  },

  setup() {
    const draggable = ref(null)

    return {
      draggable
    }
  },

  methods: {
    dragMouseDown(e) {
      e = e || window.event
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = this.closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = this.elementDrag
    },

    elementDrag(e) {
      e = e || window.event
      e.preventDefault()

      const element = this.draggable

      var winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight,
        maxX = winW - element.offsetWidth - 1,
        maxY = winH - element.offsetHeight - 1

      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY

      // set the element's new position:
      const position = {
        top: element.offsetTop - pos2,
        left: element.offsetLeft - pos1
      }

      if (position.top <= maxY && position.top >= 0) {
        element.style.top = position.top + 'px'
      }
      if (position.left <= maxX && position.left >= 0) {
        element.style.left = position.left + 'px'
      }
    },

    closeDragElement() {
      const widget = {
        top: this.draggable.offsetTop - pos2,
        left: this.draggable.offsetLeft - pos1,
        wasOpen: this.widget.wasOpen
      }
      storage.setData({ key: this.storageKey, value: JSON.stringify(widget) })

      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
</script>

<style scoped>
.draggable {
  color: #ffffff;
  position: fixed;
  z-index: 103;
  width: 360px;
  height: auto;
  min-width: 360px;
  max-height: 704px;
  max-width: 1004px;
  background: rgba(0, 0, 0, 0);
  cursor: move;
}
</style>
