import { Box } from '@mui/material'
import tmdbConfigs from '../api/configs/tmdb.config'
import HeroSlider from '../components/common/HeroSlider'
import uiConfigs from '../configs/ui.config'
import Container from '../components/common/Container'
import MediaSlide from '../components/common/MediaSlide'

const HomePage = () => {
  return (
    <>
      <HeroSlider mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular}/>

       <Box marginTop='-4rem' sx={{ ...uiConfigs.style.mainContent }}>
        <Container header='Popular Movies'>
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header='Top Movies'>
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>

        <Container header='Popular Series'>
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header='Top Series'>
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>

      </Box>
    </>
  )
}

export default HomePage
