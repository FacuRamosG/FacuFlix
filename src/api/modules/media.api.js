import privateClient from '../client/private.client.js'
import publicClient from '../client/public.client.js'

const mediaEnpoints = {
  list: ({ mediaType, mediaCategory, page }) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) => `${mediaType}/search?query=${query}&page=${page}`
}

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEnpoints.list({ mediaType, mediaCategory, page })
      )
      return { response }
    } catch (err) { return { err } }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEnpoints.detail({ mediaType, mediaId })
      )

      return { response }
    } catch (err) { return { err } }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEnpoints.search({ mediaType, query, page })
      )

      return { response }
    } catch (err) { return { err } }
  }
}

export default mediaApi
