import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

import classNames from './Toolbar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  const links = props.links.map((l, index) => {
    return (
      <Hidden only={['xs', 'sm']} key={index}>
        <NavLink exact to={l.link} className={classNames.NavLinks} activeClassName={classNames.NavLinkActive}>
          <Button color="inherit">{l.name}</Button>
          </NavLink>
      </Hidden>
    )
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
            <Hidden only={['md', 'lg', 'xl']}>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={props.toggleDrawer}>
                    <MenuIcon />
                </IconButton>
            </Hidden>
            <Typography variant="title" color="inherit" className={classes.flex}>
                AnyTime Library
            </Typography>
            {links}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);