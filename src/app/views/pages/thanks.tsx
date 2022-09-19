import React, { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
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

/* ---------------------------------- types --------------------------------- */
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
            hex="#cdd7d9"
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
        </ContentContainer>
      </ScrollingContainer>
    </PageContainer>
  );
};

export default ThanksPage;
