import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import StoreIcon from '@mui/icons-material/Store';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
const drawerWidth = 180;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const NavBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Navigation = () => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const MenuItem = ({ children, text, url }) => {
    return (
      <ListItem
        key={text}
        disablePadding
        sx={{ display: 'block' }}>
        <ListItemButton
          component={NavLink}
          to={url}
          sx={{
            minHeight: 48,
            // justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            color: '#B8D7FA',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              opacity: open ? '70%' : '50%',
            }}
          >
            {children}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{
                  color: '#B8D7FA',
                  textDecoration: 'none',
                  ':hover': {
                    color: '#fff'
                  }
                }}>
                <strong>{text}</strong>
              </Typography>
            }
            sx={{
              opacity: open ? 1 : 0,
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <NavBox
      sx={{
        position: 'absolute',
        marginTop: '120px',
        backgroundColor: '#117AEF',
        height: '800px',
        borderRadius: '10px 10px 10px 10px'
      }}
      variant="permanent"
      open={open}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
    >
      <List
        sx={{
          marginTop: "100px",

        }}>
        <MenuItem text={'품목 관리'} url={'/product'}>
          <WarehouseIcon />
        </MenuItem>
        <MenuItem text={'거래처 관리'} url={'/business'}>
          <StoreIcon />
        </MenuItem>
        <MenuItem text={'입고 관리'} url={'/'}>
          <InputIcon />
        </MenuItem>
        <MenuItem text={'출고 관리'} url={'/'}>
          <OutputIcon />
        </MenuItem>
        <MenuItem text={'일일 현황'} url={'/'}>
          <CalendarTodayIcon />
        </MenuItem>
      </List>
    </NavBox>
  );
};

export default Navigation;