import AutoSwiper from './AutoSwuper'
import { SwiperSlide } from 'swiper/react'
import MediaItem from './MediaItem'

export const RecommendsSlide = ({ medias, mediaType }) => {
  return (
        <AutoSwiper>
            {medias.map((media, index) => (
                <SwiperSlide key={index} >
                    <MediaItem media={media} mediaType={mediaType}/>
                </SwiperSlide>
            ))}
        </AutoSwiper>
  )
}
