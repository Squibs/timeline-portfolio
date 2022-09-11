import { TimelineActions, TimelineActionTypes, TimelineState } from './types';

const projectSelect = (selectedProject: TimelineState['selectedProject']): TimelineActionTypes => ({
  type: TimelineActions.PROJECT_SELECT,
  payload: selectedProject,
});

const storeProjectList = (
  projectsToDisplay: TimelineState['projectsToDisplay'],
): TimelineActionTypes => ({
  type: TimelineActions.STORE_PROJECT_LIST,
  payload: projectsToDisplay,
});

export { projectSelect, storeProjectList };
