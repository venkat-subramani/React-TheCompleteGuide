import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxillary/Auxillary';
import Background from '../../assets/images/library.jpg';

import Toolbar from '../../components/UI/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  toggleDrawer = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  closeDrawer = () => {
    this.setState({showSideDrawer: false});
  }

  render() {
    const style = {
        width: "100%",
        height: "93.4vh",
        backgroundImage: "url(" + Background + ")"
    }
    
    let links = [];
    if(this.props.isAuthenticated){
      links = [
        {'name': 'Home', 'link': '/'},
        {'name': 'Browse', 'link': '/browse'},
        {'name': 'My Books', 'link': '/myBooks'},
        {'name': 'Logout', 'link': '/logout'}
      ];
    }
    if(this.props.isAdmin){
      links = [
        {'name': 'Home', 'link': '/'},
        {'name': 'Stocks', 'link': '/stocks'},
        {'name': 'Users', 'link': '/users'},
        {'name': 'Logout', 'link': '/logout'}
      ]
    }
    
    return (
      <Aux>
        <Toolbar toggleDrawer={this.toggleDrawer} links={links} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.closeDrawer} links={links} isAuthenticated={this.props.isAuthenticated} />
        <main style={style}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isAdmin: state.auth.isAdmin
  }
}

export default connect(mapStateToProps)(Layout);
