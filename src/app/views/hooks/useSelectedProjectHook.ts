import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQueryParam, StringParam } from 'use-query-params';
import { timelineOperations } from '../../state/ducks/timeline';

const useSelectedProjectHook = (): void => {
  const [queryProject] = useQueryParam('project', StringParam);
  const dispatch = useDispatch();

  useEffect(() => {
    if (queryProject) dispatch(timelineOperations.projectSelect(queryProject));
  }, [dispatch, queryProject]);
};

export default useSelectedProjectHook;
