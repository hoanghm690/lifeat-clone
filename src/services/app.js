import { videos } from '../api/mock-data'

export const getVideosByCategory = (categoryId) => {
  return videos.filter((v) => v.categoryId === Number(categoryId))
}

export const getVideoById = (videoId) => {
  return videos.find((v) => v.id === Number(videoId))
}

export const randomSpace = (list) => {
  const array = list || videos
  const random = Math.floor(Math.random() * array.length)

  return array[random]
}
