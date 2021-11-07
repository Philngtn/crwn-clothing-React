import React, { useState } from 'react';

import './sign-in.style.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {

    const [userCredentials, setCredentitals] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const handelChange = event => {
        const { value, name } = event.target;
        setCredentitals({ ...userCredentials, [name]: value })
    }

    return (
        <div className='sign-in'>
            <h2 className='title'> I already have an account</h2>
            <span> Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    value={email}
                    handleChange={handelChange}
                    label='Email'
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handelChange}
                    label='Password'
                    required
                />
                <div className='buttons'>
                    <CustomButton type='submit' >SIGN IN</CustomButton>
                    {/* isGoogleSignIn pass true as arg */}
                    <CustomButton
                        onClick={googleSignInStart}
                        type="button"
                        isGoogleSignIn
                    >
                        SIGN IN WITH GOOGLE
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}



const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);