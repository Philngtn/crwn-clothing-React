import React from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.style.scss'

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action';

// itemCounts For memorize 
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
);



const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

// Remember cartItems is an object so put in {}
const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
})



export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);