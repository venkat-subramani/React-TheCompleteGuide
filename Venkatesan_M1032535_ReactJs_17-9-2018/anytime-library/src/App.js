import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import Stocks from './containers/Stocks/Stocks';
import Users from './components/Users/Users'
import Browse from './containers/Browse/Browse';
import MyBooks from './components/MyBooks/MyBooks';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/users" component={Users} />
          <Route path="/stocks" component={Stocks} />
          <Route path="/browse" component={Browse} />
          <Route path="/myBooks" component={MyBooks} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
