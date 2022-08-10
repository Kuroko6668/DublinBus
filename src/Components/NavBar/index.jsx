import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";




import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'; 
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logout from '../../manageUser/Logout';
import AuthContext from "../../context/AuthContext";
import { useContext} from "react";






// const settings = [{label:'Profile',link:'/HomePage'}, {label:'SignUp',link:'/SignUp'}, {label:'SignIn',link:'/SignIn'}, {labe:"ProtectedPage",link:'/ProtectedPage'}];
// let settings = []

const settings = [{label:'Sign Up',link:'/SignUp'}, {label:'Sign In',link:'/SignIn'}];

// const pages = [{label:'User Statistics',link:'/userStatsPage'},{label:'Reports',link:''}];










const NavBar = () => {

  const { user } = useContext(AuthContext);

  

 


  // const { user, logoutUser } = useContext(AuthContext);


  //Mike

  // const { user, logoutUser } = useContext(AuthContext);


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" >
      <Container maxWidth="200px">
        <Toolbar disableGutters >
          <DirectionsBusIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DublinBus
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              // anchorEl={anchorElNav}
              // anchorOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'left',
              // }}
              // keepMounted
              // transformOrigin={{
              //   vertical: 'top',
              //   horizontal: 'left',
              // }}
              // open={Boolean(anchorElNav)}
              // onClose={handleCloseNavMenu}
              // sx={{
              //   display: { xs: 'block', md: 'none' },
              // }}
            >
              
            </Menu> */}
          </Box>
          <DirectionsBusIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DublinBus
          </Typography>
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
          
                
             
          </Box> 

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              display="flex"
              flex-direction='column'
            >
              {!user && (
                settings.map((setting) => (
                <MenuItem   key={setting.label} component={Link} to={setting.link
                }>
                  {/* <Typography  >{setting.label}</Typography> */}
                  {setting.label}
                </MenuItem>
              )))}
              {user && (
                <Logout/>

              )}
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;

