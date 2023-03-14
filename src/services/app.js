import { videos } from '../api/mock-data'

export const getVideoByCategory = ({ videoId, categoryId }) => {
  return videos.find((v) => v.id === videoId && v.categoryId === categoryId)
}
