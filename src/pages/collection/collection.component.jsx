import React from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';
import './collection.style.scss'

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selector';


const CollectionPage = (collection) => {
    console.log(collection);
    return (
        <div className='collection-page'>
            <h2>Collection Page</h2>
        </div>
    )
};

// ownProps is the props that created by Router component in shop.component which include history, location, and match
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);