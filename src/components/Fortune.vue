<template>
  <Draggable name="fortune" :widget="widget" :storageKey="storageKey" v-if="wasOpen">
    <template #draggable-header>
      <div class="header-content">
        <IconFortune />
        <span>
          <span>Daily Fortune | </span>
          <span class="date">{{ new Date().toLocaleDateString() }}</span>
        </span>
      </div>
      <div @click="onCloseFortune" class="close-btn"><IconMinus /></div>
    </template>

    <template #draggable-content>
      <h3>{{ fortune }}</h3>
    </template>
  </Draggable>
</template>

<script>
import Draggable from './Draggable.vue'
import IconFortune from '../components/icons/IconFortune.vue'
import IconMinus from '../components/icons/IconMinus.vue'
import storage from '../utils/storage'
import { fortunes } from '../api/mock-data'
import { SK_FORTUNE_WIDGET } from '../utils/constants'

export default {
  props: {
    wasOpen: Boolean
  },

  setup() {
    const today = new Date().getDate()
    const fortune = fortunes[today]

    return {
      fortune,
      storageKey: SK_FORTUNE_WIDGET
    }
  },

  data() {
    const widget = {
      top: 398.5,
      left: 494.5,
      wasOpen: this.wasOpen
    }

    return {
      widget
    }
  },

  watch: {
    wasOpen: {
      handler(val) {
        const storageWidget = storage.getData({ key: SK_FORTUNE_WIDGET })
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

        storage.setData({ key: SK_FORTUNE_WIDGET, value: JSON.stringify(this.widget) })
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

      const storageWidget = storage.getData({ key: SK_FORTUNE_WIDGET })
      const storageWidgetData = JSON.parse(storageWidget)

      if (storageWidgetData) {
        const widget = {
          ...storageWidgetData,
          wasOpen: false
        }

        storage.setData({
          key: SK_FORTUNE_WIDGET,
          value: JSON.stringify(widget)
        })
      }
    }
  }
}
</script>

<style scoped>
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

.content h3 {
  line-height: 24px;
  font-size: 16px;
  font-weight: bold;
}

.header-content span,
.content h3 {
  text-shadow: 1px 1px 5px rgba(113, 113, 113, 0.5);
}
</style>
