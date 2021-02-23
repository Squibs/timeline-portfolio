import React from 'react';
import styled from 'styled-components';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.whiteTint};
  color: ${(props) => props.theme.colors.primaryDark};
`;

const ContentContainer = styled.div`
  text-align: center;
  width: calc(100% - 43px);
  height: calc(100% - 40px);
`;

/* -------------------------------- component ------------------------------- */

const TimelinePage: React.FC = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <h1>My Timeline</h1>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelinePage;
