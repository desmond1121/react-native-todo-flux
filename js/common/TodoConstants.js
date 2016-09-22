//@flow

const keyMirror = require('keymirror');
import type {
    route
} from '../flow/FlowType';

export let ROUTE: {
    main: route,
    add: route,
    time: route
} = {
    main: {
        title: 'Todo List',
        name: 'Main',
        index: 0,
        rightButtonTitle: 'Add'
    },
    add: {
        title: 'Add todo',
        name: 'Add',
        index: 1,
        rightButtonTitle: 'Done'
    },
    time: {
        title: 'Choose time',
        name: 'TimePicker',
        index: 2,
        rightButtonTitle: 'Done'
    }
};

type actionType = {
    ACTION_CREATE: string,
    ACTION_UPDATE: string,
    ACTION_REMOVE: string,
    ACTION_INIT: string,
    ACTION_TIME_PICKER_SHOW: string,
    ACTION_TIME_PICKER_SET: string
};

export let ACTION: actionType = keyMirror({
    ACTION_CREATE: null,
    ACTION_UPDATE: null,
    ACTION_REMOVE: null,
    ACTION_INIT: null,
    ACTION_TIME_PICKER_SHOW: null,
    ACTION_TIME_PICKER_SET: null
});

export let DATE_FORMAT: string = 'YYYY-MM-DD';
