import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Meter from 'grommet/components/Meter';
import Notification from 'grommet/components/Notification';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';

import {
  loadListing, unloadListing
} from '../actions/listings';

import { pageLoaded } from './utils';

class Listing extends Component {

  componentDidMount() {
    const { match: { params }, dispatch } = this.props;
    pageLoaded('Listing');
    dispatch(loadListing(params.id));
  }

  componentWillUnmount() {
    const { match: { params }, dispatch } = this.props;
    dispatch(unloadListing(params.id));
  }

  render() {
    const { error, listing } = this.props;

    let errorNode;
    let listingNode;
    if (error) {
      errorNode = (
        <Notification status='critical' size='large' state={error.message}
          message='An unexpected error happened, please try again later' />
      );
    } else if (!listing) {
      listingNode = (
        <Box direction='row' responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}>
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      listingNode = (
        <Box pad='medium'>
          <Label>Status: {listing.status}</Label>
          <Box direction='row' responsive={false}
            pad={{ between: 'small' }}>
            <Value value={listing.percentComplete}
              units='%'
              align='start' size='small' />
            <Meter value={listing.percentComplete} />
          </Box>
        </Box>
      );
    }

    return (
      <Article primary={true} full={true}>
        <Header direction='row' size='large' colorIndex='light-2'
          align='center' responsive={false}
          pad={{ horizontal: 'small' }}>
          <Anchor path='/listings'>
            <LinkPrevious a11yTitle='Back to Listings' />
          </Anchor>
          <Heading margin='none' strong={true}>
            {listing ? listing.name : 'Listing'}
          </Heading>
        </Header>
        {errorNode}

        {listingNode}
      </Article>
    );
  }
}

Listing.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  match: PropTypes.object.isRequired,
  listing: PropTypes.object
};

const select = state => ({ ...state.listings });

export default connect(select)(Listing);
