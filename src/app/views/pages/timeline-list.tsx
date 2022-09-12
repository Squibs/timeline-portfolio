import { Link } from 'gatsby';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { AppState } from '../../state/store';
import { BorderContainer } from '../components';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  overflow: hidden;

  & h1 {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  & p {
    line-height: 30px;
    margin-bottom: 40px;
  }

  & ul {
    padding: 0;
    margin-top: 50px;

    ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
      column-count: 2;
    `}
  }
`;

const ContentContainer = styled.div`
  outline: none;
  overflow-y: scroll;
`;

const StyledLi = styled.li`
  font-size: 18px;
  list-style-type: none;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primaryDark};
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
        <Link key={project.id} to={`/project/${project.projectLink}`}>
          <StyledLi>{project.title}</StyledLi>
        </Link>,
      );
    });

    setTimelineListArray(tArray);
  }, [projectsToDisplay]);

  // anilink helper
  const generateAniLink = (direction: string, to = '', text: string) => {
    return (
      <AniLink
        swipe
        direction={direction}
        to={to}
        duration={1.5}
        entryOffset={100}
        style={{ padding: '10px' }}
      >
        {text}
      </AniLink>
    );
  };

  // call formProjectList on mount
  useEffect(() => {
    formProjectList();
  }, [formProjectList]);

  return (
    <PageContainer className="page-container-styles">
      <BorderContainer />
      <ContentContainer className="page-content-styles">
        <h1>List of Projects on Timeline</h1>
        {/* eslint-disable */}
        <p>
          Didn&apos;t want to scroll through my timeline?
          <br />I won&apos;t judge you.
          <br />
          Maybe a little.
          <br />I worked hard on it though.
        </p>
        {/* eslint-enable */}
        {generateAniLink('down', '/timeline/', 'Back to Timeline')}
        {generateAniLink('down', '/', 'Back to Homepage')}
        <ul>{timelineListArray}</ul>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelineList;
