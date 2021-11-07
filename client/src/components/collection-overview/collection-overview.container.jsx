import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { compose } from "redux";

import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from '../collection-overview/collection-overview.component'

// Remember to set the name of props (isLoading) similar to the props of the compose component 
// <WithSpinner isLoading={isLoading} />

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

// Compose will Wrap the CollectionOverview with WithSpinner then pass the state to the wrapped components
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;