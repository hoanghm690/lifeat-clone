<template>
  <div class="draggable" @mousedown="dragMouseDown" ref="draggable">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'

var pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0

export default {
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

      const elmnt = this.draggable

      var winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight,
        maxX = winW - elmnt.offsetWidth - 1,
        maxY = winH - elmnt.offsetHeight - 1

      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // set the element's new position:
      if (elmnt.offsetTop - pos2 <= maxY && elmnt.offsetTop - pos2 >= 0) {
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
      }
      if (elmnt.offsetLeft - pos1 <= maxX && elmnt.offsetLeft - pos1 >= 0) {
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
      }

      // this.draggable.style.top = this.draggable.offsetTop - pos2 + 'px'
      // this.draggable.style.left = this.draggable.offsetLeft - pos1 + 'px'
    },

    closeDragElement() {
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
  left: 494.5px;
  top: 398.5px;
  width: 360px;
  height: auto;
  min-width: 360px;
  max-height: 704px;
  max-width: 1004px;
  background: rgba(0, 0, 0, 0);
  cursor: move;
}
</style>
