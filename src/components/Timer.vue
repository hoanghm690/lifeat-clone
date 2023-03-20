<template>
  <Draggable name="timer" :widget="widget" :storageKey="storageKey" hasBgColor v-if="wasOpen">
    <template #draggable-header>
      <div class="header-content">
        <span>Watch</span>
        <span class="header-content-icon">
          <IconCircle />
          <IconCircle />
          <IconCircle />
          <IconCircle />
        </span>
      </div>
      <div @click="onCloseTimer" class="close-btn"><IconMinus /></div>
    </template>

    <template #draggable-content>
      <div class="content">
        <span class="content-time"
          >{{ timer.minutes.value.toString().padStart(2, '0') }}:{{
            timer.seconds.value.toString().padStart(2, '0')
          }}</span
        >
        <div class="content-controls">
          <button class="lifeat-btn control-btn" @click="onChangeTimer(action)">
            {{ action }}
          </button>
          <span class="reset-btn" @click="onResetTimer"><IconReload /></span>
        </div>
      </div>
      <div class="settings">
        <div
          class="action"
          v-for="action in timerSettings"
          :key="action"
          :class="{ active: timerSettingCurrent === action }"
          @click="onClickSetting(action)"
        >
          {{ action }}
        </div>
      </div>
    </template>
  </Draggable>
</template>

<script>
import Draggable from './Draggable.vue'
import IconCircle from '../components/icons/IconCircle.vue'
import IconMinus from '../components/icons/IconMinus.vue'
import IconReload from '../components/icons/IconReload.vue'
import storage from '../utils/storage'
import { SK_TIMER_WIDGET } from '../utils/constants'
import { watchEffect, onMounted, ref, reactive } from 'vue'
import { useTimer } from 'vue-timer-hook'

export default {
  props: {
    wasOpen: Boolean
  },

  components: {
    IconCircle,
    IconMinus,
    IconReload,
    Draggable
  },

  setup(props) {
    const widget = reactive({
      top: 139.5,
      left: 407,
      wasOpen: props.wasOpen
    })

    const action = ref('Start')
    const timerSettings = ['Pomodoro', 'Long Break', 'Short Break']
    const timerSettingCurrent = ref('Pomodoro')

    const setTimeDefault = (timerSettingCurrent) => {
      const time = new Date()
      let minutes

      switch (timerSettingCurrent) {
        case 'Pomodoro':
          minutes = 60 * 20 // 20 minutes
          break
        case 'Long Break':
          minutes = 60 * 15 // 15 minutes
          break
        case 'Short Break':
          minutes = 60 * 5 // 5 minutes
          break
        default:
          minutes = 60 * 20
          break
      }

      time.setSeconds(time.getSeconds() + minutes)
      return time
    }

    const time = setTimeDefault(timerSettingCurrent.value)
    const timer = useTimer(time, false)

    const onStart = () => {
      timer.start()
    }

    const onPause = () => {
      timer.pause()
    }

    const onResume = () => {
      timer.resume()
    }

    const onReset = () => {
      const time = setTimeDefault(timerSettingCurrent.value)

      timer.restart(time, false)
    }

    onMounted(() => {
      watchEffect(async () => {
        if (timer.isExpired.value) {
          console.warn('IsExpired')
        }
      })
    })

    return {
      storageKey: SK_TIMER_WIDGET,
      timer,
      onStart,
      onPause,
      onResume,
      onReset,
      timerSettings,
      timerSettingCurrent,
      action,
      widget,
      setTimeDefault
    }
  },

  watch: {
    wasOpen: {
      handler(val) {
        const storageWidget = storage.getData({ key: SK_TIMER_WIDGET })
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

        storage.setData({ key: SK_TIMER_WIDGET, value: JSON.stringify(this.widget) })
      }
    }
  },

  emits: ['onCloseTimer'],

  methods: {
    onCloseTimer(event) {
      event.preventDefault()
      this.$emit('onCloseTimer')

      const storageWidget = storage.getData({ key: SK_TIMER_WIDGET })
      const storageWidgetData = JSON.parse(storageWidget)

      if (storageWidgetData) {
        const widget = {
          ...storageWidgetData,
          wasOpen: false
        }

        storage.setData({
          key: SK_TIMER_WIDGET,
          value: JSON.stringify(widget)
        })
      }
    },

    onChangeTimer(action) {
      switch (action) {
        case 'Start':
          this.action = 'Pause'
          this.onStart()
          return

        case 'Pause':
          this.action = 'Resume'
          this.onPause()
          return

        case 'Resume':
          this.action = 'Pause'
          this.onResume()
          return

        default:
          return
      }
    },

    onResetTimer() {
      this.onReset()
      this.action = 'Start'
    },

    onClickSetting(action) {
      if (this.timerSettingCurrent === action) return

      this.timerSettingCurrent = action
      const time = this.setTimeDefault(this.timerSettingCurrent)
      this.timer.restart(time, false)
    }
  }
}
</script>

<style scoped>
.light .close-btn svg {
  fill: var(--icon-dark);
}

.dark .close-btn svg {
  fill: var(--icon-light);
}

.header-content {
  font-weight: 500;
  display: flex;
  align-items: center;
}

.header-content-icon {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 20px;
}

.header-content .date {
  letter-spacing: 0.5px;
}

.fortune-teller-icon {
  margin-right: 4px;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.content-time {
  font-size: 54px;
  font-weight: 500;
  line-height: 50px;
}

.content-controls {
  display: flex;
  align-items: center;
}

.control-btn {
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  padding: 6px 25px;
  font-size: 15px;
}

.reset-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 14px;
  cursor: pointer;
}

.settings {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings .action {
  font-weight: 500;
  padding: 6px 0;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.light .settings .action.active {
  border-bottom: 2px solid var(--color-active);
}

.dark .settings .action.active {
  border-bottom: 2px solid var(--light);
}
</style>
