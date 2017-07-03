import RequestWatcher from './request-watcher';

let protocol = 'ws:';
if (window.location.protocol === 'https:') {
  protocol = 'wss:';
}
const host = ((process.env.NODE_ENV === 'development') ?
  'localhost:8102' : `${window.location.host}`);
const webSocketUrl = `${protocol}//${host}`;

const socketWatcher = new RequestWatcher({ webSocketUrl });

let listingsWatcher;

export function watchListings() {
  listingsWatcher = socketWatcher.watch('/api/listing');
  return listingsWatcher;
}

export function unwatchListings() {
  if (listingsWatcher) {
    listingsWatcher.stop();
  }
}

const listingWatcher = {};

export function watchListing(id) {
  listingWatcher[id] = socketWatcher.watch(`/api/listing/${id}`);
  return listingWatcher[id];
}

export function unwatchListing(id) {
  if (listingWatcher[id]) {
    listingWatcher[id].stop();
  }
}
