import { combineReducers } from 'redux';
import { TimelineActions, TimelineActionTypes, TimelineState } from './types';

// hover TimelineState for state shape; which is defined in ./types.ts
const initialState: TimelineState = {
  selectedProject: '',
};

const timelineReducer = (state = initialState, action: TimelineActionTypes): TimelineState => {
  switch (action.type) {
    case TimelineActions.PROJECT_SELECT:
      return { ...state, selectedProject: action.payload || '' };
    default:
      return state;
  }
};

const reducer = combineReducers({
  timeline: timelineReducer,
});

export default reducer;
