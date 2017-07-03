import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import Button from 'grommet/components/Button';
import { getMessage } from 'grommet/utils/Intl';
import AddIcon from 'grommet/components/icons/base/Add';

import NavControl from '../components/NavControl';
import { pageLoaded } from './utils';

import {
  loadListings, unloadListings
} from '../actions/listings';


class Listings extends Component {

  componentDidMount() {
    pageLoaded('Listings');
    this.props.dispatch(loadListings());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadListings());
  }

  render() {
    const { error, listings } = this.props;
    const { intl } = this.context;

    let errorNode;
    let listNode;
    if (error) {
      errorNode = (
        <Notification status='critical' size='large' state={error.message}
          message='An unexpected error happened, please try again later' />
      );
    } else if (listings.length === 0) {
      listNode = (
        <Box direction='row' responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}>
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      const listingsNode = (listings || []).map((listing, index) => (
        <ListItem key={index} justify='between'>
          <Label><Anchor path={`/listings/${listing.id}`} label={listing.name} /></Label>
          <Box direction='row' responsive={false}
            pad={{ between: 'small' }}>
            <Value value={listing.percentComplete}
              units='%'
              align='start' size='small' />
            <Meter value={listing.percentComplete} />
          </Box>
        </ListItem>
      ));

      listNode = (
        <List>
          {listingsNode}
        </List>
      );
    }

    const btnLoadItems = (
      <Box pad={{ horizontal: 'medium' }} align='start'>
        <Button icon={<AddIcon />} label='Load Homes'
          onClick={this.testAction} href='#'
          primary={true} />
      </Box>
    );

    return (
      <Article primary={true}>
        <Header direction='row' justify='between' size='large'
          pad={{ horizontal: 'medium', between: 'small' }}>
          <NavControl name={getMessage(intl, 'Listings')} />
        </Header>
        {errorNode}

        {btnLoadItems}

        <Box pad={{ horizontal: 'medium' }}>
          <Paragraph size='large'>
            The backend here is using websocket.
          </Paragraph>
        </Box>
        {listNode}
      </Article>
    );
  }
}

Listings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  listings: PropTypes.arrayOf(PropTypes.object)
};

Listings.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.listings });

export default connect(select)(Listings);
