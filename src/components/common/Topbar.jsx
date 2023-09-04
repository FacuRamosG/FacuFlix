import { useSelector, useDispatch } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from '@mui/material'
import { cloneElement, useState } from 'react'
import { Link } from 'react-router-dom'
import menuConfigs from '../../configs/menu.configs'
import { themeMode } from '../../configs/theme.configs'
import { setAuthModalOpen } from '../../redux/features/authModalSlice'
import { setThemeMode } from '../../redux/features/themeModeSlice'
import Logo from './Logo'
import UserMenu from './UserMenu'
import Sidebar from './Sidebar'

const ScrollAppBar = ({ children, window }) => {
  const themeModes = useSelector((state) => state.themeMode.themeMode)
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined
  })
  return cloneElement(children, {
    sx: {
      color: trigger
        ? 'text.primary'
        : themeModes === themeMode.dark
          ? 'primary.contrastText'
          : 'text.primary',
      backgroundColor: trigger
        ? 'background.paper'
        : themeModes === themeMode.dark
          ? 'transparent'
          : 'background.paper'
    }
  })
}

const Topbar = () => {
  const { user } = useSelector((state) => state.user)
  const { appState } = useSelector((state) => state.appState)
  const themeModes = useSelector((state) => state.themeMode.themeMode)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()

  const onSwithTheme = () => {
    const theme = themeModes === themeMode.dark ? themeMode.light : themeMode.dark
    dispatch(setThemeMode(theme))
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
        <>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
            <ScrollAppBar>
                <AppBar elevation={0} sx={{ zIndex: 9999 }}>
                    <Toolbar sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <IconButton
                                color='inherit'
                                sx={{ mr: 2, display: { md: 'none' } }}
                                onClick={toggleSidebar}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                                <Logo />

                            </Box>
                        </Stack>
                        {/* MENU */}
                        <Box flexGrow={1} alignItems='center' display={{ xs: 'none', md: 'flex' }}>
                            <Box sx={{ marginRight: '30px' }} >
                                <Logo />
                            </Box>
                            {menuConfigs.main.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                      color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit',
                                      mr: 2
                                    }}
                                    component={Link}
                                    to={item.path}
                                    variant={appState.includes(item.state) ? 'contained' : 'text'}
                                >
                                    {item.display}
                                </Button>
                            ))}
                            <IconButton
                                sx={{ color: 'inherit' }}
                                onClick={onSwithTheme}
                            >
                                {themeModes === themeMode.dark && <DarkModeOutlinedIcon/> }
                                {themeModes === themeMode.light && <WbSunnyOutlinedIcon/> }
                            </IconButton>

                        </Box>

                        {/* USER */}
                        <Stack spacing={3} direction='row' alignItems='center'>
                            {!user && <Button
                                    variant='contained'
                                    onClick={() => dispatch(setAuthModalOpen(true))}
                            >
                                sign in
                             </Button>}
                        </Stack>
                        <UserMenu />
                    </Toolbar>
                </AppBar>
            </ScrollAppBar>

        </>
  )
}

export default Topbar
