import React, { Component } from 'react';
import { connect } from 'react-redux';

import db from '../../axios-atl';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../UI/Spinner/Spinner';
import User from './User/User';
import classes from './Users.css';

class Users extends Component {
    componentDidMount() {
        this.props.onFetchUsers();
    }

    state = {
        expanded: null
    };

    handleChange = panel => {
        const expanded =  { ...this.state.expanded };
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { expanded } = this.state;

        let users = <Spinner />
        if(!this.props.loading){
            users = (
                this.props.users.map((user, index) => (
                    <User 
                        key={user.id} 
                        user={user}
                        index={index}
                        expanded={expanded === user.id}
                        clicked={() => this.handleChange(user.id, expanded)} />
                ))
            )
        }
        return(
            <div>
                <div className={classes.Users}>{users}</div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        users: state.users.users,
        loading: state.users.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Users, db));