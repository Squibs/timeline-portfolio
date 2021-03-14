import { TimelineActions, TimelineActionTypes, TimelineState } from './types';

const projectSelect = (selectedProject: TimelineState['selectedProject']): TimelineActionTypes => ({
  type: TimelineActions.PROJECT_SELECT,
  payload: selectedProject,
});

export { projectSelect };
