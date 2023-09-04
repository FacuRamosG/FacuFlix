import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { LoadingButton } from '@mui/lab'
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import CircularRate from '../components/common/CircularRate'
import Container from '../components/common/Container'
import ImageHeader from '../components/common/ImageHeader'

import uiConfigs from '../configs/ui.config'
import tmdbConfigs from '../api/configs/tmdb.config'
import mediaApi from '../api/modules/media.api'
import favoriteApi from '../api/modules/favorite.api'
import { useEffect, useRef, useState } from 'react'

import { setGlobalLoading } from '../redux/features/globalLoading'
import { setAuthModalOpen } from '../redux/features/authModalSlice'
import { addFavorite, removeFavorite } from '../redux/features/userSlice'
import CastSlide from '../components/common/CastSlide'
import MediaVideoSlide from '../components/common/MediaVideoSlide'
import { BackDropSlide } from '../components/common/BackdropSlide'
import { RecommendsSlide } from '../components/common/RecommendsSlide'
import MediaSlide from '../components/common/MediaSlide'
import { MediaReview } from '../components/common/MediaReview'

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams()

  const { user, listFavorites } = useSelector((state) => state.user)

  const [media, setMedia] = useState()
  const [isFavorite, setIsFavorite] = useState(false)
  const [onRequest, setOnReques] = useState(false)
  const [genres, setGenres] = useState([])

  const dispatch = useDispatch()

  const videoRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const getMedia = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId })
      dispatch(setGlobalLoading(false))

      if (response) {
        setMedia(response)
        setIsFavorite(response.isFavorite)
        setGenres(response.genres.splice(0, 2))
      }

      if (err) toast.error(err.message)
    }

    getMedia()
  }, [mediaType, mediaId, dispatch])

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true))

    if (onRequest) return

    if (isFavorite) {
      onRemoveFavorite()
      return
    }

    setOnReques(true)

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    }

    const { response, err } = await favoriteApi.add(body)

    setOnReques(false)
    if (err) toast.error(err.message)
    if (response) {
      dispatch(addFavorite(response))
      setIsFavorite(true)
      toast.success('Add to favorite')
    }
  }

  const onRemoveFavorite = async () => {
    if (onRequest) return
    setOnReques(true)

    const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString())

    const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id })

    setOnReques(false)
    if (err) toast.error(err.message)
    if (response) {
      dispatch(removeFavorite(favorite))
      setIsFavorite(false)
      toast.success('Remove')
    }
  }

  return (
    media
      ? (
        <>
          <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)}/>
          <Box sx={{
            color: 'primary.contrastText',
            ...uiConfigs.style.mainContent
          }}>
            <Box sx={{
              marginTop: { xs: '-10rem', md: '-15rem', lg: '-20rem' }
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: { md: 'row', xs: 'column' }
              }}>
                {/* POSTER */}
                  <Box sx={{
                    width: { xs: '70%', sm: '50%', md: '40%' },
                    margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' }
                  }}>
                    <Box sx={{
                      paddingTop: '140%',
                      ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                    }} />

                  </Box>
                  {/* Description */}
                  <Box sx={{
                    width: { xs: '100%', md: '60%' },
                    color: 'text.primary'
                  }}>
                    <Stack spacing={5}>
                      {/* TITLE */}
                      <Typography
                        variant='h4'
                        fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                        fontWeight='700'
                        sx={{ ...uiConfigs.style.typoLines(2, 'left') }}
                      >
                        {`${media.title || media.name} ${mediaType === tmdbConfigs.mediaType.movie
                      ? media.release_date.split('-')[0]
                      : media.first_air_date.split('-')[0]}`}
                      </Typography>

                      {/* RATE & genres */}
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <CircularRate value={media.vote_average}/>

                        <Divider orientation='vertical' />

                        {genres.map((genre, index) => (
                          <Chip
                            label={genre.name}
                            variant='filled'
                            key={index}
                            sx={{ color: '#ffffff' }}
                          />
                        ))}
                      </Stack>

                      <Typography
                        variant='body1'
                        sx={{ ...uiConfigs.style.typoLines(5) }}
                      >
                        {media.overview}
                      </Typography>

                      <Stack direction='row' spacing={1}>
                        <LoadingButton
                          variant='text'
                          sx={{
                            width: 'max-content',
                            '& .MuiButon-starIcon': { marginRight: '0' }
                          }}
                          size='large'
                          startIcon={isFavorite ? <FavoriteIcon/> : <FavoriteBorderOutlinedIcon/>}
                          loadingPosition='start'
                          loading={onRequest}
                          onClick={onFavoriteClick}
                        />

                        <Button
                          variant='contained'
                          sx={{ width: 'max-content' }}
                          size='large'
                          startIcon={<PlayArrowIcon/>}
                          onClick={() => videoRef.current.scrollIntoView()}
                        >
                          Play
                        </Button>
                      </Stack>
                      <Container header='Cast'>
                          <CastSlide casts={media.credits.cast}/>
                      </Container>

                    </Stack>
                  </Box>
              </Box>

            </Box>

            {/* VIDEOS */}
            <div ref={videoRef} style={{ paddingTop: '2rem' }}>
              <Container header='Videos'>
                <MediaVideoSlide videos={[...media.videos.results].splice(0, 5)}/>
              </Container>
            </div>

            {media.images.backdrops.length > 0 && (
              <Container header='Backdrops'>
                <BackDropSlide backdrops={media.images.backdrops}/>
              </Container>
            )}
              <MediaReview reviews={media.reviews} media={media} mediaType={mediaType} />

            <Container header='May you like'>
              {media.recommend.length > 0 && (
                <RecommendsSlide medias={media.recommend} mediaType={mediaType} />
              )}
              {media.recommend.length === 0 && (
                <MediaSlide
                  mediaType={mediaType}
                  mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                />
              )}
            </Container>
          </Box>
        </>
        )
      : null
  )
}

export default MediaDetail
