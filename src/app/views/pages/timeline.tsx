import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { ChevronLink, ChevronLinkHelper } from '../components';
import { Colors } from '../shared';

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
        <Link to="/">
          <ChevronLink
            height="15%"
            minHeight="100px"
            fill={Colors.whiteTint}
            passedCSS={`
              position: absolute;
              left: 11px;
              top: 50%;
              transform: translateY(-50%) scale(1, 1);
              z-index: 6;
            `}
          />
        </Link>
        <ChevronLinkHelper
          height="15%"
          minHeight="100px"
          passedCSS={`
            position: absolute;
            left: 11px;
            top: 50%;
            transform: translateY(-50%) scale(1, 1);
            filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.55));
            z-index: 4;
          `}
        />
        <h1>My Timeline</h1>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelinePage;
