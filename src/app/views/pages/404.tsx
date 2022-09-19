import React, { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { AppState } from '../../state/store';
import { BorderContainer, SEO } from '../components';
import { useScrollHook } from '../hooks';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  overflow: hidden;
  z-index: 1;

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

const ScrollingContainer = styled.div`
  overflow-y: scroll;
  display: flex;
  outline: none;
`;

const ContentContainer = styled.div`
  outline: none;
  margin: auto;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    position: relative;
  `}
`;

const SVGImageContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

const SVGImage = styled.img`
  position: absolute;
  z-index: -1;
  bottom: 0%;
  right: 0%;
  width: 50%;
  height: auto;
  max-width: 200px;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    bottom: -100px;
  `}
`;

const AniLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

const NotFoundPage = (): JSX.Element => {
  const scrollingContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleScroll = useScrollHook(scrollingContainerRef);
  const { selectedProject } = useSelector(
    ({ timeline: { timeline } }: AppState) => ({
      selectedProject: timeline.selectedProject,
    }),
    shallowEqual,
  );

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
        title="404 - Page Not Found"
        description="Zachary Holman's timeline portfolio. The page you were looking for does not exist or something else went wrong."
      />
      <BorderContainer />
      <ScrollingContainer
        className="page-content-styles"
        ref={scrollingContainerRef}
        onScroll={() => handleScroll()}
      >
        <ContentContainer>
          <SVGImageContainer>
            <SVGImage src={data.allFile.nodes[0].publicURL} />
          </SVGImageContainer>
          <h1>404 Page Not Found</h1>
          <p>
            The page you were looking for doesn&apos;t exist or I messed something up somewhere.
            Please use the links below to return to the timeline or to my homepage.
          </p>
          <AniLinkContainer>
            <AniLink
              paintDrip
              hex="#cdd7d9"
              to={`${selectedProject ? `/timeline?project=${selectedProject}` : '/timeline'}`}
              duration={1.5}
              entryOffset={100}
              style={{ padding: '10px' }}
            >
              Back to Timeline
            </AniLink>
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
        </ContentContainer>
      </ScrollingContainer>
    </PageContainer>
  );
};

export default NotFoundPage;
