import { LISTINGS_LOAD, LISTINGS_UNLOAD, LISTING_LOAD, LISTING_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  listings: [],
  listing: undefined
};

const handlers = {
  [LISTINGS_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [LISTINGS_UNLOAD]: () => initialState,
  [LISTING_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [LISTING_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
