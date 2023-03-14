<template>
  <div class="sidebar-wrapper" v-if="space">
    <div class="sidebar-inner">
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
                <div class="volume-slider-toggle">
                  <IconVolumeOff />
                </div>
                <input type="range" min="0" max="1" step="any" value="0" />
              </div>
            </div>
            <div class="space-creator-info">
              <div class="creator-avatar">
                <IconLogo />
              </div>
              <div class="creator-text-content">
                <div class="creator-name">
                  Hoang Huynh
                  <IconVerified />
                </div>
                <div class="creator-links">..............</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="sidebar-footer">3</div> -->
    </div>
  </div>

  <div v-else>Sidebar Loading...</div>
</template>

<script>
import IconChevronLeft from '../components/icons/IconChevronLeft.vue'
import IconChevronRight from '../components/icons/IconChevronRight.vue'
import IconLogo from '../components/icons/IconLogo.vue'
import IconSavedSpace from '../components/icons/IconSavedSpace.vue'
import IconSavedSpaceMenu from '../components/icons/IconSavedSpaceMenu.vue'
import IconVerified from '../components/icons/IconVerified.vue'
import IconVolumeOff from '../components/icons/IconVolumeOff.vue'
// import IconVolumeOn from '../components/icons/IconVolumeOn.vue'
import { dateCurrentWithoutSecond } from '../utils/date'
import { categories } from '../api/mock-data.js'

export default {
  props: {
    space: Object
  },
  components: {
    IconChevronLeft,
    IconChevronRight,
    IconSavedSpace,
    IconSavedSpaceMenu,
    // IconVolumeOn,
    IconVolumeOff,
    IconLogo,
    IconVerified
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
  methods: {
    onClick(category) {
      this.$emit('onCategoryChange', category)
    }
  }
}
</script>

<style scoped>
.sidebar-wrapper {
  position: fixed;
  left: 0;
  margin: 8px;
  height: calc(100% - 8px * 2);
  width: auto;
  z-index: 999;
}

.sidebar-inner {
  height: 100%;
  width: 300px;
  background-color: #fff;
  border-radius: 7px;
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
  border: 1px solid #e9e9e9;
  background-color: rgba(255, 255, 255, 0.75);
  height: 55px;
  width: 55px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.shuffler-category.active,
.shuffler-category:hover {
  background-color: rgba(241, 241, 241, 0.95);
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
  background-color: #f6f6f6;
  gap: 12px;
  padding: 12px 12px 24px 24px;
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

.volume-slider,
.space-creator-info {
  display: flex;
  align-items: center;
}

.volume-slider input {
  background: #4e4e4e;
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
  transform: scale(1.3);
}

.space-creator-info {
  gap: 16px;
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
