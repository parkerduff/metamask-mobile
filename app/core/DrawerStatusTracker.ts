'use strict';

import { EventEmitter } from 'events';

const hub = new EventEmitter();

type DrawerStatus = 'open' | 'closed';

class DrawerStatusTracker {
  open = false;

  setStatus(status: DrawerStatus): void {
    if (status === 'open') {
      this.open = true;
    } else {
      this.open = false;
    }

    hub.emit(`drawer::${status}`);
  }
}

let instance: DrawerStatusTracker | null = null;

interface SharedDrawerStatusTrackerType {
  init: () => void;
  setStatus: (status: DrawerStatus) => void;
  getStatus: () => DrawerStatus;
  hub: EventEmitter;
}

const SharedDrawerStatusTracker: SharedDrawerStatusTrackerType = {
  init: () => {
    instance = new DrawerStatusTracker();
  },
  setStatus: (status: DrawerStatus) => {
    if (!instance) {
      throw new Error('DrawerStatusTracker not initialized. Call init() first.');
    }
    instance.setStatus(status);
  },
  getStatus: () => (instance?.open ? 'open' : 'closed'),
  hub,
};

export default SharedDrawerStatusTracker;
