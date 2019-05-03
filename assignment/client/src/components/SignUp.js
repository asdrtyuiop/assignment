import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions'
import CustomInput from './Custominput';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(formData){
        console.log('onSubmit() got called');
        console.log('formData', formData);
        await this.props.signUp(formData);
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard');
        }
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
            <div className="col"></div>
                <div className="col">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                label="Enter your email"
                                placeholder="example@example.com"
                                component={ CustomInput } />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                label="enter password"
                                placeholder=""
                                component={ CustomInput } />
                        </fieldset>

                        { this.props.errorMessage ? 
                        <div className="alert alert-danger">
                            { this.props.errorMessage }
                        </div> : null }

                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
            
        );
    }
}

function mapStateToProps(state){
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(SignUp) 