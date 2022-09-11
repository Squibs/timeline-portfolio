/* ----------------- shape of the timeline's slice of state ----------------- */

export type Project = {
  id: string;
  title: string;
  description: string;
  projectLink: string;
  image: {
    aspectRatio: number;
    base64: string;
    sizes: string;
    src: string;
    srcSet: string;
  };
};

export type TimelineState = {
  selectedProject: string;
  projectsToDisplay: Project[];
};

/* ------------------------ timeline constant strings ----------------------- */

export enum TimelineActions {
  PROJECT_SELECT = 'timeline/PROJECT_SELECT',
  STORE_PROJECT_LIST = 'timeline/STORE_PROJECT_LIST',
}

/* -------------------------- timeline action types ------------------------- */

interface ProjectSelectAction {
  type: typeof TimelineActions.PROJECT_SELECT;
  payload: TimelineState['selectedProject'];
}

interface StoreProjectListAction {
  type: typeof TimelineActions.STORE_PROJECT_LIST;
  payload: TimelineState['projectsToDisplay'];
}

export type TimelineActionTypes = ProjectSelectAction | StoreProjectListAction;
