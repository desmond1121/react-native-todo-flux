const keyMirror : function = require('keymirror');

type route = {name: string; index: number};

export ROUTE = {
  main: route = {
    name: "Main",
    index: 0
  },
  add: route = {
    name: "Add",
    index: 1
  }
};

export ACTION : Object = keyMirror({
  ACTION_CREATE: null,
  ACTION_UPDATE: null,
  ACTION_REMOVE: null,
  ACTION_INIT: null
});

export DATE_FORMAT : string = 'YYYY-MM-DD';
