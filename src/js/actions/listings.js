import { LISTINGS_LOAD, LISTINGS_UNLOAD, LISTING_LOAD, LISTING_UNLOAD } from '../actions';
import {
  watchListings, unwatchListings, watchListing, unwatchListing
} from '../api/listings';

export function loadListings() {
  return dispatch => (
    watchListings()
      .on('success',
        payload => dispatch({ type: LISTINGS_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: LISTINGS_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadListings() {
  unwatchListings();
  return { type: LISTINGS_UNLOAD };
}

export function loadListing(id) {
  return dispatch => (
    watchListing(id)
      .on('success',
        payload => dispatch({ type: LISTING_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: LISTING_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadListing(id) {
  unwatchListing(id);
  return { type: LISTING_UNLOAD };
}
