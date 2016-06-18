const keyMirror = require('keymirror');

exports.ROUTE = {
  main: {
    name: "Main",
    index: 0
  },
  add: {
    name: "Add",
    index: 1
  }
};

exports.ACTION = keyMirror({
  ACTION_CREATE: null,
  ACTION_UPDATE: null,
  ACTION_REMOVE: null,
  ACTION_INIT: null
});

exports.DATE_FORMAT = 'YYYY-MM-DD';
