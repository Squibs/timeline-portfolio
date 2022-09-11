import { Link } from 'gatsby';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../state/store';
import { BorderContainer } from '../components';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};

  & h1 {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

/* ---------------------------------- types --------------------------------- */

/* -------------------------------- component ------------------------------- */

const TimelineList = (): JSX.Element => {
  const { projectsToDisplay } = useSelector(({ timeline: { timeline } }: AppState) => ({
    projectsToDisplay: timeline.projectsToDisplay,
  }));
  const [timelineListArray, setTimelineListArray] = useState<JSX.Element[]>([]);

  // form project list
  const formProjectList = useCallback(() => {
    const tArray: React.SetStateAction<JSX.Element[]> = [];

    projectsToDisplay.forEach((project) => {
      tArray.push(
        <Link to={`/project/${project.projectLink}`}>
          <li>{project.title}</li>
        </Link>,
      );
    });

    setTimelineListArray(tArray);
  }, [projectsToDisplay]);

  // call formProjectList on mount
  useEffect(() => {
    formProjectList();
  }, [formProjectList]);

  return (
    <PageContainer className="page-container-styles">
      <BorderContainer />
      <h1>List of Projects on Timeline</h1>
      <ul>{timelineListArray}</ul>
    </PageContainer>
  );
};

export default TimelineList;
