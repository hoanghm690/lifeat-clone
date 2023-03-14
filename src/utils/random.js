import { getVideosByCategory } from '../services/app'

export const randomElement = ({ categoryId }) => {
  const videosByCategory = getVideosByCategory(categoryId)
  const random = Math.floor(Math.random() * videosByCategory.length)

  return videosByCategory[random]
}
