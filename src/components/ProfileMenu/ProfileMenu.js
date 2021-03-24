import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classes from './ProfileMenu.module.css';
import Avatar from '@material-ui/core/Avatar';
import Aux from '../../hoc/Aux/Aux';

const ProfileMenu = (props)  => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    console.log(event);
    setAnchorEl(null);
  };

  const logOut = (event) => {
    handleClose(event);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationDate');
    sessionStorage.removeItem('userId');
    props.history.push("/Login");
  };

  const profileMenu = (event) => {
    handleClose(event);
    props.history.push("/Profile");
  }

  return (
    <Aux>
      <Button aria-controls="simple-menu" className={classes.profileButton} aria-haspopup="true" onClick={handleClick}>
      <Avatar className={classes.profileMenu}>NT</Avatar>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
        onClose={handleClose}
        className={classes.ProfileMenuClass}
        >
        <MenuItem onClick={() => profileMenu()}>Profile</MenuItem>
        <MenuItem onClick={() => logOut()}>Logout</MenuItem>
      </Menu>
    </Aux>
  );
}

export default ProfileMenu;
