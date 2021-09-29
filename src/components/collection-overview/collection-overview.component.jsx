import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import './collection-overview.style.scss'


import CollectionPreview from '../preview-collection/collection-preview.component.jsx';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector.js';



const CollectionsOverview = ({ collections }) => (
    <div className='collections-overview'>
        {
            collections.map(({ id, ...other }) => (
                <CollectionPreview key={id} {...other} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);