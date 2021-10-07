import React from 'react'

import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component';

import './shop.style.scss'

import { Route } from 'react-router-dom';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/filebase.utils'

import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.action'



class ShopPage extends React.Component {

    unsubcribeFromSnapshot = null;

    componentDidMount() {

        const { updateCollections } = this.props;

        // Get ref from collection
        const collectionRef = firestore.collection('collections');
        // Get snapshot from the collection and pass to the function to decompose to customized object 
        // that contain necessary information for front end
        collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
        })
    }

    render() {

        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);