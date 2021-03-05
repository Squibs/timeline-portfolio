import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { ChevronLink, TimelineCreator } from '../components';
import { Colors } from '../shared';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primaryLight};
  overflow: hidden;
`;

const ContentContainer = styled.main`
  outline: none;
  color: ${(props) => props.theme.colors.primaryDark};
  p {
    font-weight: 400;
  }

  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 1800px;
  width: calc(100% - 90px);

  h1 {
    margin: 0px;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TimelineContainer = styled.div`
  height: 85%;
  overflow: hidden;
  border-radius: 25px;
  border: 6px solid ${(props) => props.theme.colors.accentOne};
  z-index: 1;
`;

/* -------------------------------- component ------------------------------- */

const TimelinePage: React.FC = () => {
  const data = useStaticQuery(graphql`
    query TimelineImages {
      images: allFile(filter: { relativeDirectory: { eq: "timelinePage" } }) {
        nodes {
          id
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  return (
    <PageContainer className="page-container-styles">
      <ChevronLink fill={Colors.whiteTint} hover={Colors.primaryDark} position="left" link="/" />
      <ChevronLink
        fill={Colors.whiteTint}
        hover={Colors.primaryNeutral}
        position="right"
        link="/project/learning-to-necro"
      />

      <ContentContainer className="page-content-styles">
        <h1>My Timeline</h1>
        <TimelineContainer>
          <TimelineCreator
            projects={[
              {
                title: 'Learning To Necro',
                description:
                  'Aliquip aliquip ad nisi sunt. Ad sint amet quis excepteur aliquip nostrud in aliquip magna cupidatat labore consectetur. Ipsum ipsum laborum et labore pariatur adipisicing elit deserunt consequat. Aliquip excepteur sit proident incididunt duis sit voluptate. Ea et aliqua aliqua do officia minim Lorem et enim nostrud anim aliqua exercitation culpa.',
                image: data.images.nodes[3].childImageSharp.fluid,
                id: data.images.nodes[3].id,
              },
              {
                title: 'Pomodoro Clock',
                description:
                  'Esse dolor sit elit sunt nostrud fugiat eiusmod deserunt adipisicing adipisicing cupidatat enim do. Ipsum pariatur reprehenderit irure ullamco. Non exercitation mollit velit consequat non aliqua fugiat.',
                image: data.images.nodes[2].childImageSharp.fluid,
                id: data.images.nodes[2].id,
              },
              {
                title: 'Quote Machine',
                description:
                  'Eiusmod reprehenderit consectetur nulla laborum tempor incididunt ex ex incididunt adipisicing laborum proident. Ipsum incididunt esse fugiat est mollit sit sit consequat et. Excepteur deserunt tempor culpa deserunt consequat. Incididunt enim voluptate ad enim esse adipisicing esse ullamco dolore nostrud est magna. Officia do esse dolor amet ipsum sint et. Veniam culpa eu ea do id est laboris proident.',
                image: data.images.nodes[4].childImageSharp.fluid,
                id: data.images.nodes[4].id,
              },
            ]}
          />
        </TimelineContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelinePage;
