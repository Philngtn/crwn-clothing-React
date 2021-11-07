import React from 'react'

import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.action';

import {
    CollectionItemContainer,
    CollectionFooterContainer,
    AddButton,
    BackgroundImage,
    NameContainer,
    PriceContainer
} from './collection-item.style';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    return (
        <CollectionItemContainer>
            <BackgroundImage className='image' imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>${price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton onClick={() => addItem(item)} inverted>
                Add to cart
            </AddButton>
        </CollectionItemContainer>
    );
};


const mapDispathToProps = dispath => ({
    // This will create a method in this component called 
    // addItem and then pass the item as the props to the addItem(item) then dispath to the connect (rootReducer will find the valid functions for our action)
    addItem: item => dispath(addItem(item))
})


export default connect(null, mapDispathToProps)(CollectionItem)