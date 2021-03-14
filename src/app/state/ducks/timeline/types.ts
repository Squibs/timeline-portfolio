/* ----------------- shape of the timeline's slice of state ----------------- */

export type TimelineState = {
  selectedProject: string;
};

/* ------------------------ timeline constant strings ----------------------- */

export enum TimelineActions {
  PROJECT_SELECT = 'timeline/PROJECT_SELECT',
}

/* -------------------------- timeline action types ------------------------- */

interface ProjectSelectAction {
  type: typeof TimelineActions.PROJECT_SELECT;
  payload: TimelineState['selectedProject'];
}

export type TimelineActionTypes = ProjectSelectAction;
