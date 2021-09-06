import React from 'react';

import './collection-preview.style.scss';
import CollectionItem from '../collection-item/collection-item.component';


const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items
                .filter((item, idx) => idx < 4)
                // We use the item object not the whole ({id, ...other}) => (item) in the .map props
                .map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))}
        </div>
    </div>
)

export default CollectionPreview