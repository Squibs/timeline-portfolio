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
  max-width: 1800px;
  width: calc(100% - 85px);

  @media screen and (min-height: 750px) {
    width: calc(100% - 100px);
  }

  @media screen and (min-height: 800px) and (min-width: 750px) {
    width: calc(100% - 140px);
  }

  h1 {
    margin: 0px;
    margin: 10px 0;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-height: 800px) {
      font-size: 30px;
    }
  }
`;

const TimelineContainer = styled.div`
  height: 85%;
  overflow: hidden;
  border-radius: 25px;
  border: 6px solid ${(props) => props.theme.colors.accentOne};
  z-index: 1;
  margin-bottom: 10px;
  max-height: 1200px;
  position: relative;
`;

/* ---------------------------------- types --------------------------------- */

type Node = {
  id: string;
  base: string;
  childImageSharp: {
    fluid: {
      base64: string;
      aspectRatio: number;
      src: string;
      srcSet: string;
      sizes: string;
    };
  };
};

type BackgroundImage = {
  childImageSharp: {
    id: string;
    fixed: {
      src: string;
    };
  };
};

type Query = {
  images: {
    nodes: Node[];
  };
  background: BackgroundImage;
};

/* -------------------------------- component ------------------------------- */

const TimelinePage: React.FC = () => {
  const data: Query = useStaticQuery(graphql`
    query TimelineImages {
      images: allFile(filter: { relativeDirectory: { eq: "timelinePage" } }) {
        nodes {
          id
          base
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      background: file(relativePath: { eq: "timelinePage/diagonal-striped-brick-pattern.png" }) {
        childImageSharp {
          id
          fixed(width: 1920) {
            src
          }
        }
      }
    }
  `);

  const imageSelector = (imgName: string) => {
    return data.images.nodes.filter((node: Node) => node.base === imgName)[0];
  };

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
        <TimelineContainer
          style={{
            background: `url('${data.background.childImageSharp.fixed.src}')`,
          }}
        >
          <TimelineCreator
            projects={[
              {
                title: 'Learning To Necro',
                description:
                  'Aliquip aliquip ad nisi sunt. Ipsum ipsum laborum et labore pariatur adipisicing elit deserunt consequat. Aliquip excepteur sit proident incididunt duis sit voluptate. Ea et aliqua aliqua do officia minim Lorem et enim nostrud anim aliqua exercitation culpa.',
                image: imageSelector('screenshot-learning-to-necro.png').childImageSharp.fluid,
                id: imageSelector('screenshot-learning-to-necro.png').id,
              },
              {
                title: 'Pomodoro Clock',
                description:
                  'Esse dolor sit elit sunt nostrud incididunt incididunt ex ex incididunt adipisicing fugiat eiusmod deserunt adipisicing incididunt adipisicing adipisicing cupidatat enim do. Ipsum pariatur reprehenderit irure ullamco. Non exercitation deserunt adipisicing adipisicing cupidatat enim do mollit velit consequat non aliqua fugiat.',
                image: imageSelector('screenshot-pomodoro-clock.png').childImageSharp.fluid,
                id: imageSelector('screenshot-pomodoro-clock.png').id,
              },
              {
                title: 'Quote Machine',
                description:
                  'Eiusmod reprehenderit consectetur nulla laborum tempor. Excepteur deserunt tempor culpa deserunt consequat. Incididunt enim voluptate ad enim esse adipisicing esse ullamco dolore nostrud est magna. Officia do esse dolor amet ipsum sint et. Veniam culpa eu ea do id est laboris proident.',
                image: imageSelector('screenshot-quote-machine.png').childImageSharp.fluid,
                id: imageSelector('screenshot-quote-machine.png').id,
              },
            ]}
          />
        </TimelineContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelinePage;
