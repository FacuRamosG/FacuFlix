import { PersonMediaGrid } from '../components/common/PersonMediaGrid'
import { Box, Stack, Toolbar, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import tmdbConfigs from '../api/configs/tmdb.config'
import uiConfigs from '../configs/ui.config'
import Container from '../components/common/Container'
import personApi from '../api/modules/person.api'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { setGlobalLoading } from '../redux/features/globalLoading'
import { useDispatch } from 'react-redux'

const PersonDetail = () => {
  const { personId } = useParams()
  const dispatch = useDispatch()

  const [person, setPerson] = useState()

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true))
      const { response, err } = await personApi.detail({ personId })
      dispatch(setGlobalLoading(false))
      if (err) toast.error(err.message)
      if (response) setPerson(response)
    }
    getPerson()
  }, [personId])

  return (
      <>
        <Toolbar/>
        {person && (
          <>
            <Box sx={{ ...uiConfigs.style.mainContent }}>
              <Box sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }
              }}>
                <Box sx={{
                  width: { xs: '50%', md: '20%' }
                }}>
                  <Box sx={{
                    paddingTop: '160%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'darkgrey',
                    backgroundImage: `url(${tmdbConfigs.posterPath(person.profile_path)})`
                  }}/>

                </Box>
                <Box sx={{
                  width: { xs: '100%', md: '80%' },
                  padding: { xs: '1rem 0', md: '1rem 2rem' }
                }}>
                  <Stack spacing={2}>
                    <Typography variant='h5' fontWeight='700'>
                      {`${person.name} (${person.birthday.split('-')[0]}`}
                      {person.dethday && `-${person.dethday.split('-')[0]}`}
                      {')'}
                    </Typography>
                    <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                      {person.biography}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
              <Container header='Films/TV Shows'>
                <PersonMediaGrid personId={personId}/>
              </Container>
            </Box>
          </>

        )}

      </>
  )
}

export default PersonDetail
