import React from 'react'

import CollectionsOverview from '../../components/collection-overview/collection-overview.component'
import CollectionPage from '../collection/collection.component';

import './shop.style.scss'

import { Route } from 'react-router-dom';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/filebase.utils';

import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.action';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOveriviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {

    state = {
        loading: true
    };

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
            this.setState({ loading: false });
        });
    }

    render() {

        const { match } = this.props;
        const { loading } = this.state;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOveriviewWithSpinner isLoading={loading} {...props} />} />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);