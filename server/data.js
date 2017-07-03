const _sessions = {};
const _notifiers = {
  task: [],
  listing: []
};

export const tasks = [
  {
    id: 'task-1',
    name: 'Initializing instance',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'task-2',
    name: 'Adding components',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'task-3',
    name: 'Testing infrastructure',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'task-4',
    name: 'Removing instance',
    percentComplete: 0,
    status: 'Waiting'
  }
];

export const listings = [
  {
    id: 'listing-1',
    name: 'Listing 1',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'listing-2',
    name: 'Listing 2',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'listing-3',
    name: 'Listing 3',
    percentComplete: 0,
    status: 'Waiting'
  },
  {
    id: 'listing-4',
    name: 'Listing 4',
    percentComplete: 0,
    status: 'Waiting'
  }
];


const increments = [5, 10, 20, 25];

setInterval(
  () => {
    const task = tasks[
      Math.floor(Math.random() * tasks.length)
    ];

    if (!task.percentComplete) {
      task.status = 'Running';
    }

    _notifiers.task.forEach(notifier => notifier(task));
  },
  2000
);

setInterval(
  () => {
    tasks.forEach((task) => {
      if (task.status === 'Running') {
        if (task.percentComplete < 100) {
          task.percentComplete = Math.min(100, task.percentComplete +
            increments[
              Math.floor(Math.random() * increments.length)
            ]
          );
        } else {
          task.percentComplete = 0;
          task.status = 'Waiting';
        }
        _notifiers.task.forEach(notifier => notifier(task));
      }
    });
  },
  1000
);

export function addSession(token, data) {
  _sessions[token] = data;
}

export function getSession(token) {
  return _sessions[token];
}

export function addNotifier(type, cb) {
  _notifiers[type].push(cb);
}

export function getTasks(filters) {
  if (filters) {
    return Promise.resolve({
      tasks: tasks.filter(task =>
        Object.keys(filters).some(filter => task[filter] === filters[filter])
      )
    });
  }
  return Promise.resolve({ tasks });
}

export function getTask(id) {
  let task;
  tasks.some((t) => {
    if (t.id === id) {
      task = t;
      return true;
    }
    return false;
  });
  return Promise.resolve({ task });
}

export function getListings(filters) {
  if (filters) {
    return Promise.resolve({
      listings: listings.filter(listing =>
        Object.keys(filters).some(filter => listing[filter] === filters[filter])
      )
    });
  }
  return Promise.resolve({ listings });
}

export function getListing(id) {
  let listing;
  listings.some((l) => {
    if (l.id === id) {
      listing = l;
      return true;
    }
    return false;
  });
  return Promise.resolve({ listing });
}


export default { addNotifier, addSession, getSession, getTask, getTasks, getListing, getListings };
