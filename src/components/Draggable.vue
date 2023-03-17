<template>
  <div class="draggable" ref="draggable" :style="`left: ${widget.left}px; top: ${widget.top}px`">
    <div class="draggable-wrapper" :class="{ bg: hasBgColor }">
      <div class="draggable-header" @mousedown="dragMouseDown">
        <slot name="draggable-header"></slot>
      </div>

      <div class="draggable-content">
        <slot name="draggable-content"></slot>
      </div>
    </div>
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
    storageKey: String,
    hasBgColor: Boolean
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
  position: fixed;
  z-index: 103;
  width: 360px;
  height: auto;
  min-width: 360px;
  max-height: 704px;
  max-width: 1004px;
  background: rgba(0, 0, 0, 0);
  color: var(--light);
}

.draggable-wrapper {
  height: auto;
  width: auto;
  border-radius: 7px;
}

.draggable-header {
  cursor: move;
}

.light .draggable-wrapper.bg {
  color: var(--dark);
  background-color: var(--light);
}

.dark .draggable-wrapper.bg {
  color: var(--light);
  background-color: var(--dark);
}

.draggable-header,
.draggable-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 22px;
}

.light .bg .draggable-header {
  border-bottom: 1px solid var(--border-light);
}

.dark .bg .draggable-header {
  border-bottom: 1px solid var(--border-dark);
}
</style>
