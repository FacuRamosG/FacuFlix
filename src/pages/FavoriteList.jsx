import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import uiConfigs from '../configs/ui.config'
import favoriteApi from '../api/modules/favorite.api'
import Container from '../components/common/Container'
import MediaItem from '../components/common/MediaItem'
import { setGlobalLoading } from '../redux/features/globalLoading'
import { removeFavorite } from '../redux/features/userSlice'
import { useEffect, useState } from 'react'

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch()
  const [onRequest, setOnRequest] = useState(false)

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)
    const { response, err } = await favoriteApi.remove({ favoriteId: media.id })
    setOnRequest(false)

    if (err) toast.err(err.message)
    if (response) {
      dispatch(removeFavorite({ mediaId: media.mediaId }))
      onRemoved(media.id)
    }
  }
  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant='contained'
        sx={{ marginalTop: 2 }}
        startIcon={<DeleteIcon/>}
        loading={onRequest}
        loadingPosition='start'
        onClick={onRemove}
      >
        Delete
      </LoadingButton>
    </>
  )
}

const FavoriteList = () => {
  const [medias, setMedias] = useState([])
  const [filteredMedias, setFilteredMedias] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  const skip = 8

  useEffect(() => {
    const getFavorite = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await favoriteApi.getList()
      dispatch(setGlobalLoading(false))

      if (err) toast.error(err.message)
      if (response) {
        setCount(response.length)
        setMedias([...response])
        setFilteredMedias([...response].splice(0, skip))
      }
    }
    getFavorite()
  }, [])

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)])
    setPage(page + 1)
  }

  const onRemoved = (id) => {
    const newMedias = [...medias].filter(e => e.id !== id)
    setMedias(newMedias)
    setFilteredMedias([...newMedias].splice(0, page * skip))
    setCount(count - 1)
  }

  return (
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Container header={`Favorites (${count})`}>
          <Grid container spacing={1} sx={{ marginRight: '-8xp!important' }}>
           {filteredMedias.map((media, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <FavoriteItem media={media} onRemoved={onRemoved} />
              </Grid>
           ))}

          </Grid>
          {filteredMedias.length < medias.length && (
            <Button onClick={onLoadMore}>Load More</Button>
          )}
        </Container>
      </Box>

  )
}

export default FavoriteList
