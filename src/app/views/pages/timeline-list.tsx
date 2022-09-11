import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../state/store';
import { BorderContainer } from '../components';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
`;

/* ---------------------------------- types --------------------------------- */

/* -------------------------------- component ------------------------------- */

const TimelineList = (): JSX.Element => {
  const { projectsToDisplay } = useSelector(({ timeline: { timeline } }: AppState) => ({
    projectsToDisplay: timeline.projectsToDisplay,
  }));

  const testProjectFetch = () => {
    console.log(projectsToDisplay);
  };

  return (
    <PageContainer className="page-container-styles">
      <BorderContainer />
      <h1>List of Projects on Timeline</h1>
      <button type="button" onClick={() => testProjectFetch()}>
        Click ME
      </button>
    </PageContainer>
  );
};

export default TimelineList;
