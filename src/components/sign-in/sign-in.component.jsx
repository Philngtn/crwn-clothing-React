import React from 'react';

import './sign-in.style.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/filebase.utils';

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

    }


    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.log(error);
        }

        this.setState({ email: '', password: '' })
    }

    handelChange = event => {
        const { value, name } = event.target;
        console.log(event);
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2 className='title'> I already have an account</h2>
                <span> Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handelChange}
                        label='email'
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handelChange}
                        label='password'
                        required
                    />
                    <div className='buttons'>
                        <CustomButton type='submit' >SIGN IN</CustomButton>
                        {/* isGoogleSignIn pass true as arg */}
                        <CustomButton onClick={signInWithGoogle} type="button" isGoogleSignIn>SIGN IN WITH GOOGLE </CustomButton>
                    </div>
                </form>
            </div>
        )
    }

}

export default SignIn;