import React, { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { graphql, useStaticQuery } from 'gatsby';
import { AppState } from '../../state/store';
import { BorderContainer, SEO } from '../components';
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
    list-style-type: none;

    ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
      column-count: 3;
    `}
  }

  & li {
    margin: 0;
  }
`;

const ScrollingContainer = styled.div`
  overflow-y: scroll;
  display: flex;
  outline: none;
`;

const ContentContainer = styled.div`
  outline: none;
  margin: auto;
`;

const StyledLi = styled.li`
  font-size: 18px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const AniLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SVGImageContainer = styled.div``;

const SVGImage = styled.img`
  z-index: -1;
  bottom: 0%;
  right: 0%;
  width: 50%;
  height: auto;
  max-width: 200px;
`;

/* ---------------------------------- types --------------------------------- */

export interface QueryProps {
  allFile: {
    nodes: [
      {
        id: string;
        publicURL: string;
      },
    ];
  };
}

/* -------------------------------- component ------------------------------- */

const TimelineList = (): JSX.Element => {
  const scrollingContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleScroll = useScrollHook(scrollingContainerRef);
  const { projectsToDisplay } = useSelector(({ timeline: { timeline } }: AppState) => ({
    projectsToDisplay: timeline.projectsToDisplay,
  }));
  const [timelineListArray, setTimelineListArray] = useState<JSX.Element[]>([]);
  const { selectedProject } = useSelector(
    ({ timeline: { timeline } }: AppState) => ({
      selectedProject: timeline.selectedProject,
    }),
    shallowEqual,
  );

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

  const data: QueryProps = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          relativeDirectory: { eq: "timelinePage" }
          extension: { eq: "svg" }
          name: { eq: "Blobs" }
        }
      ) {
        nodes {
          id
          publicURL
        }
      }
    }
  `);

  return (
    <PageContainer className="page-container-styles">
      <SEO
        title="Timeline List"
        description="Zachary Holman's timeline portfolio. A quick overview of all the projects that are on my timeline portfolio."
      />
      <BorderContainer />
      <ScrollingContainer
        className="page-content-styles"
        ref={scrollingContainerRef}
        onScroll={() => handleScroll()}
      >
        <ContentContainer>
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
          <AniLinkContainer>
            {generateAniLink(
              'down',
              `${selectedProject ? `/timeline?project=${selectedProject}` : '/timeline'}`,
              'Back to Timeline',
            )}
            <AniLink
              paintDrip
              hex="#2f343c"
              to={`${selectedProject ? `/?project=${selectedProject}` : '/'}`}
              duration={1.5}
              entryOffset={100}
              style={{ padding: '10px' }}
            >
              Back to Homepage
            </AniLink>
          </AniLinkContainer>
          <ul>
            {timelineListArray}
            <li>
              <SVGImageContainer>
                <SVGImage src={data.allFile.nodes[0].publicURL} />
              </SVGImageContainer>
            </li>
          </ul>
        </ContentContainer>
      </ScrollingContainer>
    </PageContainer>
  );
};

export default TimelineList;
