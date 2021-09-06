import React from 'react'

import './collection-item.style.scss'

import CustomButton from '../custom-button/custom-button.component'

import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.action';


const CollectionItem = ({ item, addItem }) => {
    const { name, imageUrl, price } = item;
    return (
        <div className='collection-item'>
            <div
                className='image'
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted > ADD to cart </CustomButton>
        </div>
    )
};

const mapDispathToProps = dispath => ({
    // This will create a method in this component called 
    // addItem and then pass the item as the props to the addItem(item) then dispath to the connect (rootReducer will find the valid functions for our action)
    addItem: item => dispath(addItem(item))
})


export default connect(null, mapDispathToProps)(CollectionItem)