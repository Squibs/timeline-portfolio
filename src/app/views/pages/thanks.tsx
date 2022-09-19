import React, { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { BorderContainer, SEO } from '../components';
import { useScrollHook } from '../hooks';
import { AppState } from '../../state/store';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  overflow: hidden;

  & h1 {
    color: ${({ theme }) => theme.colors.primaryDark};
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

const ThanksPage = (): JSX.Element => {
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
        title="Thank You"
        description="Zachary Holman's timeline portfolio. Your form submission has been accepted and is being delivered."
      />
      <BorderContainer />
      <ScrollingContainer
        className="page-content-styles"
        ref={scrollingContainerRef}
        onScroll={() => handleScroll()}
      >
        <ContentContainer>
          <h1>Thank You!</h1>
          <p>Your form submission was received!</p>
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
            <AniLink
              paintDrip
              hex="#cdd7d9"
              to={`${selectedProject ? `/contact?project=${selectedProject}` : '/contact'}`}
              duration={1.5}
              entryOffset={100}
              style={{ padding: '10px' }}
            >
              Back to Contact Page
            </AniLink>
          </AniLinkContainer>
          <SVGImageContainer>
            <SVGImage src={data.allFile.nodes[0].publicURL} />
          </SVGImageContainer>
        </ContentContainer>
      </ScrollingContainer>
    </PageContainer>
  );
};

export default ThanksPage;
