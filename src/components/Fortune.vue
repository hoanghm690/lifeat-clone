<template>
  <Draggable name="fortune" :widget="widget" :storageKey="storageKey" v-if="wasOpen">
    <div class="fortune-wrapper">
      <div class="header">
        <div class="header-content">
          <IconFortune />
          <span>
            <span>Daily Fortune | </span>
            <span class="date">{{ new Date().toLocaleDateString() }}</span>
          </span>
        </div>
        <div @click="onCloseFortune" class="close-btn"><IconMinus /></div>
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
import storage from '../utils/storage'

export default {
  props: {
    wasOpen: Boolean
  },

  data() {
    const storageKey = 'fortuneWidget'
    const widget = {
      top: 398.5,
      left: 494.5,
      wasOpen: this.wasOpen
    }

    return {
      widget,
      storageKey
    }
  },

  watch: {
    wasOpen: {
      handler(val) {
        const storageWidget = storage.getData({ key: this.storageKey })
        const storageWidgetData = JSON.parse(storageWidget)

        if (storageWidgetData) {
          this.widget = {
            ...storageWidgetData,
            wasOpen: val
          }
        } else {
          this.widget = {
            ...this.widget,
            wasOpen: val
          }
        }

        storage.setData({ key: this.storageKey, value: JSON.stringify(this.widget) })
      }
    }
  },

  components: {
    IconFortune,
    IconMinus,
    Draggable
  },

  methods: {
    onCloseFortune(event) {
      event.preventDefault()
      this.$emit('onCloseFortune')

      const storageWidget = storage.getData({ key: this.storageKey })
      const storageWidgetData = JSON.parse(storageWidget)

      if (storageWidgetData) {
        const widget = {
          ...storageWidgetData,
          wasOpen: false
        }

        storage.setData({
          key: this.storageKey,
          value: JSON.stringify(widget)
        })
      }
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
  line-height: 24px;
  font-size: 16px;
  font-weight: bold;
}

.header-content span,
.content h3 {
  text-shadow: 1px 1px 5px rgba(113, 113, 113, 0.5);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
