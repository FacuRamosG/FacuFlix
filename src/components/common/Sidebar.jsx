import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'

import { themeMode } from '../../configs/theme.configs'
import { setThemeMode } from '../../redux/features/themeModeSlice'
import uiConfigs from '../../configs/ui.config'
import Logo from './Logo'
import menuConfigs from '../../configs/menu.configs'

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { appState } = useSelector((state) => state.appState)
  const themeModes = useSelector((state) => state.themeMode.themeMode)

  const sidebarWidth = uiConfigs.size.sidebarWidth

  const onSwitchTheme = () => {
    const theme = themeModes === themeMode.dark ? themeMode.light : themeMode.dark
    dispatch(setThemeMode(theme))
  }

  const drawer = (
    <>
     <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
        <Stack width='100%' direction='row' justifyContent='center'>
            <Logo/>
        </Stack>
     </Toolbar>
     <List sx={{ paddingX: '30px' }}>
        <Typography variant='h6' marginBottom='20px'>MENU</Typography>
        {menuConfigs.main.map((item, index) => (
            <ListItemButton
                key={index}
                sx={{
                  borderRadius: '10px',
                  marginY: 1,
                  backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset'
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}

            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText disableTypography primary={<Typography textTransform={'uppercase'}>
                    {item.display}
                </Typography>} />
            </ListItemButton>
        ))}

        {user && (
            <>
                <Typography variant='h6' marginBottom='20px'>PERSONAL</Typography>
                    {menuConfigs.user.map((item, index) => (
                        <ListItemButton
                            key={index}
                            sx={{
                              borderRadius: '10px',
                              marginY: 1,
                              backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset'
                            }}
                            component={Link}
                            to={item.path}
                            onClick={() => toggleSidebar(false)}

                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText disableTypography primary={<Typography textTransform={'uppercase'}>
                                {item.display}
                            </Typography>} />
                        </ListItemButton>
                    ))}
            </>
        )}

        <Typography variant='h6' marginBottom='20px'>THEME</Typography>
        <ListItemButton
            sx={{ color: 'inherit' }}
            onClick={onSwitchTheme}
        >
            <ListItemIcon>
                {themeModes === themeMode.dark && <DarkModeOutlinedIcon/> }
                {themeModes === themeMode.light && <WbSunnyOutlinedIcon/> }
            </ListItemIcon>
            <ListItemText disableTypography primary={
                <Typography textTransform='uppercase'>
                    {themeModes === themeMode.dark ? 'dark mode' : 'light mode'}
                </Typography>
            } />
        </ListItemButton>

     </List>
    </>
  )
  return (
        <Drawer
            open={open}
            onClose={() => toggleSidebar(false)}
            sx={{
              '& .MuiDrawer-Paper': {
                boxSizing: 'border-box',
                width: sidebarWidth,
                borderRight: '0px'
              }
            }}
        >
            {drawer}

        </Drawer>
  )
}

export default Sidebar
