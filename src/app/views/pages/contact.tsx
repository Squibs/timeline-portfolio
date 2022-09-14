import React, { useRef } from 'react';
import styled from 'styled-components';
import { BorderContainer } from '../components';
import { useScrollHook } from '../hooks';

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

const ContactPage = (): JSX.Element => {
  const scrollingContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleScroll = useScrollHook(scrollingContainerRef);

  return (
    <PageContainer className="page-container-styles">
      <BorderContainer />
      <ScrollingContainer
        className="page-content-styles"
        ref={scrollingContainerRef}
        onScroll={() => handleScroll()}
      >
        <ContentContainer>
          <h1>Contact Page</h1>
        </ContentContainer>
      </ScrollingContainer>
    </PageContainer>
  );
};

export default ContactPage;
