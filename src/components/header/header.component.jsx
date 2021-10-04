import React from 'react';
import './header.style.scss';

import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/filebase.utils';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart/cart-dropdown.component';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { OptionsContainer, HeaderContainer, LogoContainer, OptionLink } from './header.style';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer className='header'>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer >
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                    <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                    :
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropDown />}

    </HeaderContainer>
)

// State is the top level of rootReducer or we can decompose the value in rootReducer and take
// the props we need, for example currentUser from user in rootReducer ( which will return userReducer.state)

// createStructuredSelector will help to pass the state (the rootReducer) to the functions (selectCurrentUser,...) 
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})


export default connect(mapStateToProps)(Header)