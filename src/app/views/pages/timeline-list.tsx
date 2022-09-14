import { Link } from 'gatsby';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { AppState } from '../../state/store';
import { BorderContainer } from '../components';
import { useScrollHook } from '../hooks';

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

  & li {
    margin: 0;
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
  const scrollingContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleScroll = useScrollHook(scrollingContainerRef);
  const { projectsToDisplay } = useSelector(({ timeline: { timeline } }: AppState) => ({
    projectsToDisplay: timeline.projectsToDisplay,
  }));
  const [timelineListArray, setTimelineListArray] = useState<JSX.Element[]>([]);

  // anilink helper
  const generateAniLink = (
    direction: string,
    to = '',
    text: string | JSX.Element,
    key?: string,
  ) => {
    return (
      <AniLink
        key={key}
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

  // create project list
  const formProjectList = useCallback(() => {
    const tArray: React.SetStateAction<JSX.Element[]> = [];

    projectsToDisplay.forEach((project) => {
      const innerHTML = <StyledLi>{project.title}</StyledLi>;
      tArray.push(
        generateAniLink('down', `/project/${project.projectLink}`, innerHTML, project.id),
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
      <ContentContainer
        className="page-content-styles"
        ref={scrollingContainerRef}
        onScroll={() => handleScroll()}
      >
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
        <AniLink
          paintDrip
          hex="#cdd7d9"
          to="/"
          duration={1.5}
          entryOffset={100}
          style={{ padding: '10px' }}
        >
          Back to Homepage
        </AniLink>
        <ul>{timelineListArray}</ul>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelineList;
