//@flow

const keyMirror = require('keymirror');
import type {route} from '../flow/FlowType';

export let ROUTE : {main: route, add: route} = {
  main : {
    name: "Main",
    index: 0
  },
  add: {
    name: "Add",
    index: 1
  }
};

export let ACTION : Object = keyMirror({
  ACTION_CREATE: null,
  ACTION_UPDATE: null,
  ACTION_REMOVE: null,
  ACTION_INIT: null
});

export let DATE_FORMAT : string = 'YYYY-MM-DD';
