<template>
  <Draggable>
    <div class="fortune-wrapper">
      <div class="header">
        <div class="header-content">
          <IconFortune />
          <span>
            <span>Daily Fortune | </span>
            <span class="date">{{ new Date().toLocaleDateString() }}</span>
          </span>
        </div>
        <div @click="onCloseFortune"><IconMinus /></div>
      </div>
      <div class="content">
        <h3>"The more one judges, the less one loves."</h3>
      </div>
    </div>
  </Draggable>
</template>

<script>
import Draggable from './Draggable.vue'
import IconFortune from '../components/icons/IconFortune.vue'
import IconMinus from '../components/icons/IconMinus.vue'

export default {
  components: {
    IconFortune,
    IconMinus,
    Draggable
  },

  methods: {
    onCloseFortune() {
      this.$emit('onCloseFortune')
    }
  }
}
</script>

<style scoped>
.fortune-wrapper {
  height: auto;
  width: auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  opacity: 0.7;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.header-content .date {
  letter-spacing: 0.5px;
}

.fortune-teller-icon {
  margin-right: 4px;
}

.header,
.content {
  padding: 8px 22px;
}

.content h3 {
  line-height: 26px;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(113, 113, 113, 0.5);
}
</style>
