import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import classNames from './SideDrawer.css';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  toggleDrawer = (value) => () => {
    this.setState({
      open: value,
    });
  };

  render() {
    const { classes } = this.props;
    const links = this.props.links.map((l, index) => {
      return (
        <ListItem button key={index}>
          <NavLink to={l.link} exact className={classNames.NavLinks} activeClassName={classNames.NavLinkActive}>
            <ListItemText primary={l.name} />
          </NavLink>
        </ListItem>
      )
    });

    const fullList = (
      <div className={classes.list}>
        <List component="nav">
            {links}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={this.props.open} onClose={this.props.closed}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.closed}
            onKeyDown={this.props.closed} >
            {fullList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);