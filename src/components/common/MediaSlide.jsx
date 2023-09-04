import { SwiperSlide } from 'swiper/react'
import mediaApi from '../../api/modules/media.api'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import AutoSwiper from './AutoSwuper'
import MediaItem from './MediaItem'

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([])

  useEffect(() => {
    const getMEdias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      })

      if (response) setMedias(response.results)
      if (err) toast.err(err.messagee)
    }

    getMEdias()
  }, [mediaType, mediaCategory])

  return (
        <AutoSwiper>
            {medias.map((media, index) => (
                <SwiperSlide key={index}>
                    <MediaItem media={media} mediaType={mediaType} />
                </SwiperSlide>
            ))}

        </AutoSwiper>
  )
}

export default MediaSlide
