import { videos } from '../api/mock-data'

export const getVideoByCategory = ({ videoId, categoryId }) => {
  return videos.find((v) => v.id === Number(videoId) && v.categoryId === Number(categoryId))
}

export const getVideosByCategory = (categoryId) => {
  return videos.filter((v) => v.categoryId === Number(categoryId))
}
