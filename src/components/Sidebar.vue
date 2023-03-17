<template>
  <div class="sidebar" v-if="space">
    <div class="sidebar-wrapper" :class="{ closed: !toolbar.isSpacesOpen }">
      <div class="sidebar-left">
        <div class="sidebar-header">
          <div class="explore-page-back-btn">Explore 🔎</div>
          <div class="clock">{{ time }}</div>
        </div>
        <div class="sidebar-content">
          <div class="shuffle-spaces">
            <div class="shuffler-header">
              <div>Shuffle Spaces</div>
              <div class="shuffler-controls">
                <IconChevronLeft />
                <IconChevronRight />
              </div>
            </div>
            <div class="shuffler-description">Click an emoji multiple times for more content</div>
            <div class="shuffler-categories">
              <div
                class="shuffler-category"
                v-for="category in categories"
                :key="category.id"
                :class="{ active: space.categoryId === category.id }"
                @click="onClick(category)"
              >
                <img :src="category.icon" :alt="category.name" />
              </div>
            </div>
            <div class="shuffler-info">
              <div class="space-info-block">
                <div class="space-indicator">
                  <div class="space-indicator-content">
                    <div class="space-name-text">
                      <span>{{ space.shortTitle }}</span>
                    </div>
                    <div class="share-space-link">
                      <span>Share Space →</span>
                    </div>
                  </div>

                  <div class="space-indicator-actions">
                    <div class="lifeat-btn saved-space-btn">
                      <IconSavedSpace />
                    </div>
                    <div class="lifeat-btn saved-space-menu-btn">
                      <IconSavedSpaceMenu />
                    </div>
                  </div>
                </div>
                <div class="volume-slider">
                  <div class="volume-slider-toggle" @click="onToggleVolume">
                    <IconVolumeOff v-if="isMuted" />
                    <IconVolumeOn v-else />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    :value="ambianceVolume"
                    @change="onChangeVolume"
                  />
                </div>
              </div>
              <div class="space-creator-info">
                <a :href="`https://www.youtube.com/watch?v=${space.youtubeId}`" target="_blank">
                  <div class="creator-video-link">Video creator</div>
                </a>
                <!-- <div class="creator-avatar">
                <IconLogo />
              </div>
              <div class="creator-text-content">
                <div class="creator-name">
                  Hoang Huynh
                  <IconVerified />
                </div>
                <div class="creator-links">..............</div>
              </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="sidebar-footer">3</div> -->
      </div>

      <div class="sidebar-right">
        <div class="toolbar-widget" :class="{ open: toolbar.isSpacesOpen }" @click="onToggleSpaces">
          <IconPicture />
          <span>Spaces</span>
        </div>

        <div class="toolbar-widget">
          <IconCalendar />
          <span>Calendar</span>
        </div>

        <div class="toolbar-widget" :class="{ open: toolbar.isTimerOpen }" @click="onToggleTimer">
          <IconTimer />
          <span>Timer</span>
        </div>

        <div class="toolbar-widget">
          <IconMedia />
          <span>Media</span>
        </div>

        <div class="toolbar-widget">
          <IconSounds />
          <span>Sounds</span>
        </div>

        <div class="toolbar-widget">
          <IconToDo />
          <span>To-Do</span>
        </div>

        <div class="toolbar-widget">
          <IconNotes />
          <span>Notes</span>
        </div>

        <div
          class="toolbar-widget"
          :class="{ open: toolbar.isFortuneOpen }"
          @click="onToggleFortune"
        >
          <IconFortune />
          <span>Fortune</span>
        </div>

        <div class="toolbar-widget" :class="{ open: toolbar.isDarkMode }" @click="onToggleTheme">
          <IconMoon />
          <span>Dark</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else>Sidebar Loading...</div>
</template>

<script>
import { categories } from '../api/mock-data.js'
import { dateCurrentWithoutSecond } from '../utils/date'

import IconCalendar from '../components/icons/IconCalendar.vue'
import IconChevronLeft from '../components/icons/IconChevronLeft.vue'
import IconChevronRight from '../components/icons/IconChevronRight.vue'
import IconFortune from '../components/icons/IconFortune.vue'
import IconLogo from '../components/icons/IconLogo.vue'
import IconMedia from '../components/icons/IconMedia.vue'
import IconNotes from '../components/icons/IconNotes.vue'
import IconPicture from '../components/icons/IconPicture.vue'
import IconSavedSpace from '../components/icons/IconSavedSpace.vue'
import IconSavedSpaceMenu from '../components/icons/IconSavedSpaceMenu.vue'
import IconSounds from '../components/icons/IconSounds.vue'
import IconTimer from '../components/icons/IconTimer.vue'
import IconToDo from '../components/icons/IconToDo.vue'
import IconVerified from '../components/icons/IconVerified.vue'
import IconVolumeOff from '../components/icons/IconVolumeOff.vue'
import IconVolumeOn from '../components/icons/IconVolumeOn.vue'
import IconMoon from '../components/icons/IconMoon.vue'

export default {
  props: {
    space: Object,
    ambianceVolume: Number,
    isMuted: Boolean,
    toolbar: Object
  },

  components: {
    IconChevronLeft,
    IconChevronRight,
    IconSavedSpace,
    IconSavedSpaceMenu,
    IconVolumeOn,
    IconVolumeOff,
    IconLogo,
    IconVerified,
    IconPicture,
    IconCalendar,
    IconTimer,
    IconMedia,
    IconSounds,
    IconToDo,
    IconNotes,
    IconFortune,
    IconMoon
  },

  data() {
    return {
      time: dateCurrentWithoutSecond(),
      categories: categories
    }
  },

  mounted() {
    setInterval(() => {
      this.time = dateCurrentWithoutSecond()
    }, 1000)
  },

  emits: [
    'onCategoryChange',
    'onToggleVolume',
    'onToggleSpaces',
    'onToggleFortune',
    'onChangeVolume',
    'onToggleTheme',
    'onToggleTimer'
  ],

  methods: {
    onClick(category) {
      this.$emit('onCategoryChange', category)
    },

    onToggleVolume() {
      this.$emit('onToggleVolume')
    },

    onToggleSpaces() {
      this.$emit('onToggleSpaces')
    },

    onToggleFortune() {
      this.$emit('onToggleFortune')
    },

    onChangeVolume(event) {
      const ambianceVolume = event.target.value
      this.$emit('onChangeVolume', ambianceVolume)
    },

    onToggleTheme() {
      this.$emit('onToggleTheme')
    },

    onToggleTimer() {
      this.$emit('onToggleTimer')
    }
  }
}
</script>

<style scoped>
.sidebar-wrapper {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  margin: 8px;
  height: calc(100% - 8px * 2);
  width: auto;
  transition: all 0.3s ease-out;
  z-index: 999;
}

.sidebar-wrapper.closed {
  left: -308px;
}

.sidebar-left {
  height: 100%;
  width: 300px;
  border-radius: 7px;
}

.light .sidebar-left {
  background-color: var(--light);
}

.dark .sidebar-left {
  background-color: var(--dark);
}

.sidebar-right {
  width: 55px;
  border-radius: 7px;
  height: auto;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 8px;
  padding: 10px 4px;
}

.light .sidebar-right {
  background-color: var(--light);
}

.dark .sidebar-right {
  background-color: var(--dark);
}

.toolbar-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 500;
  cursor: pointer;
}

.toolbar-widget:last-child {
  margin-bottom: 0;
}

.light .toolbar-widget svg {
  fill: var(--icon-dark);
}

.dark .toolbar-widget svg {
  fill: var(--icon-light);
}

.toolbar-widget.open {
  color: #e39685;
}

.toolbar-widget.open svg {
  fill: #e39685;
}

.sidebar-header {
  padding: 12px 14px;
}

.sidebar-header,
.shuffler-header,
.space-indicator,
.space-indicator-actions,
.volume-slider-toggle,
.space-creator-info .creator-avatar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.explore-page-back-btn,
.clock {
  font-weight: 600;
}

.shuffle-spaces,
.space-indicator-content,
.shuffler-info,
.space-info-block,
.creator-text-content {
  display: flex;
  flex-direction: column;
}

.shuffler-header,
.shuffler-description,
.shuffler-categories,
.space-creator-info {
  padding: 12px 14px;
}

.shuffler-header {
  font-size: 18px;
  font-weight: 600;
}

.shuffler-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.shuffler-description {
  font-size: 11px;
  font-weight: 500;
  color: #919498;
}

.shuffler-categories {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.shuffler-category {
  height: 55px;
  width: 55px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.light .shuffler-category {
  border: 1px solid #e9e9e9;
  background-color: rgba(255, 255, 255, 0.75);
}

.dark .shuffler-category {
  border: 1px solid #595959;
  background-color: rgba(50, 50, 50, 0.75);
}

.light .shuffler-category.active,
.light .shuffler-category:hover {
  background-color: rgba(241, 241, 241, 0.95);
}

.dark .shuffler-category.active,
.dark .shuffler-category:hover {
  background-color: rgba(67, 67, 67, 0.95);
}

.shuffler-category img {
  height: 30px;
  width: 30px;
  object-fit: contain;
}

.shuffler-info {
  margin-top: 10px;
}

.space-info-block {
  gap: 12px;
  padding: 12px 12px 24px 24px;
}

.light .space-info-block {
  background-color: #f6f6f6;
}

.dark .space-info-block {
  background-color: #1e1e1e;
}

.space-indicator-content {
  margin-right: 14px;
  gap: 4px;
}

.space-name-text {
  font-size: 14px;
  font-weight: 600;
}

.share-space-link {
  font-size: 12px;
  color: #919498;
  font-weight: 500;
}

.saved-space-btn {
  margin-right: 4px;
}

.saved-space-btn,
.saved-space-menu-btn {
  width: 36px;
  height: 36px;
}

.volume-slider,
.space-creator-info {
  display: flex;
  align-items: center;
}

.volume-slider input {
  background-color: var(--icon-dark);
  width: 100%;
  height: 2px;
  margin-left: 12px;
  border-radius: 7px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  -webkit-transition: 0.2s;
  -webkit-appearance: none;
}

.volume-slider-toggle .volume-icon {
  cursor: pointer;
  transform: scale(1.3);
}

.space-creator-info {
  gap: 16px;
}

.creator-video-link {
  font-size: 12px;
  font-weight: 500;
  color: #919498;
  cursor: pointer;
}

.creator-text-content .creator-name {
  font-weight: 600;
  background-image: linear-gradient(
    45deg,
    #ff5353,
    #e74d67,
    #b87ce5,
    #a16ced,
    #ba6ebf,
    #b3697e,
    #c0815e,
    #ffc747
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(0, 0, 0, 0);
}

.creator-text-content .creator-name .verified-icon {
  padding-bottom: 5px;
}
</style>
