import React, { Component } from 'react';

/* const WithClass = (WrappedCompnent, className) => {
    return (props) => (
        <div className={className}>
            <WrappedCompnent {...props} />
        </div>
    )
} */

const WithClass = (WrappedCompnent, className) => {
    return class extends Component {
        render(){
            return (
                <div className={className}>
                    <WrappedCompnent ref={this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }
}

export default WithClass;