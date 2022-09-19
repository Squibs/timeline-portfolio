import React, { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { BorderContainer, ChevronLink, SEO, TimelineCreator } from '../components';
import { Colors } from '../shared';
import { AppState } from '../../state/store';
import { useSelectedProjectHook } from '../hooks';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  overflow: hidden;
`;

const ContentContainer = styled.main`
  outline: none;
  color: ${({ theme }) => theme.colors.primaryDark};
  p {
    font-weight: 400;
  }

  display: flex;
  flex-direction: column;
  max-width: 1800px;
  width: calc(100% - 85px);

  ${({ theme }) => theme.breakpoints.for6BigDesktopUp()`
    justify-content: center;
  `}

  @media screen and (min-height: 750px) {
    width: calc(100% - 100px);
  }

  @media screen and (min-height: 800px) and (min-width: 750px) {
    width: calc(100% - 140px);
  }

  h1 {
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
  height: 80%;
  overflow: hidden;
  border-radius: 25px;
  border: 6px solid ${({ theme }) => theme.colors.accentOne};
  z-index: 1; // iOS fix
  margin-bottom: 10px;
  max-height: 1200px;
  position: relative;
  box-shadow: 0px 4px 6px black;

  ${({ theme }) => theme.breakpoints.for6BigDesktopUp()`
    width: 90vw;
    align-self: center;
  `}

  @media screen and (min-height: 1800px) {
    margin-bottom: 5vh;
  }
`;

// mask over entire TimelineContainer so that box shadow will cast on scrolling elements instead of just background
const ShadowMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 18px;

  pointer-events: none; /* allow clicks to pass through */

  box-shadow: 0 0 10px black inset;
  box-shadow: ${({ theme }) => theme.reusedCSS.boxShadow};
`;

const BlobContainer = styled.div`
  height: 80%;
  z-index: -1;
  margin-bottom: 10px;
  max-height: 1200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  align-self: center;

  & > img {
    transform: rotate(-15deg);
    transform: scale(0.5);
    position: absolute;
    bottom: -160px;
    right: -80px;

    ${({ theme }) => theme.breakpoints.for2SlightlyBiggerPhoneUp()`
      transform: scale(0.7);
    `}

    ${({ theme }) => theme.breakpoints.for5DesktopUp()`
      transform: scale(1);
      bottom: -140px;
      right: -90px;
    `}

    ${({ theme }) => theme.breakpoints.for6BigDesktopUp()`
      right: -110px;
    `}
  }
`;

const StyledAniLink = styled(AniLink)`
  width: fit-content;
  align-self: center;
  color: ${({ theme }) => theme.colors.primaryDark} !important;
  text-decoration-color: ${({ theme }) => theme.colors.accentOne};

  &:hover {
    text-decoration-color: ${({ theme }) => theme.colors.accentTwo} !important;
  }
`;

const SwipeTutorial = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.primaryDark}F2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  pointer-events: none; /* allow clicks to pass through */

  & h2 {
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

/* ---------------------------------- types --------------------------------- */

export interface TimelineProps {
  data: {
    images: {
      nodes: [
        {
          id: string;
          base: string;
          publicURL: string;
          childImageSharp: {
            fluid: {
              base64: string;
              aspectRatio: number;
              src: string;
              srcSet: string;
              sizes: string;
            };
          };
        },
      ];
    };

    background: {
      childImageSharp: {
        id: string;
        fixed: {
          src: string;
        };
      };
    };

    projectList: { edges: { node: { frontmatter: { slug: string } } }[] };
  };
}

/* -------------------------------- component ------------------------------- */

const TimelinePage: React.FC<TimelineProps> = ({ data }: TimelineProps) => {
  const [firstVisitTimeline, setFirstVisitTimeline] = useState(true);
  const chevronLinkRef = useRef<HTMLDivElement>(null);
  const [blobImage, setBlobImage] = useState('');
  const { selectedProject } = useSelector(
    ({ timeline: { timeline } }: AppState) => ({
      selectedProject: timeline.selectedProject,
    }),
    shallowEqual,
  );
  // not sure if this should really be a hook, if I don't need it to return anything
  useSelectedProjectHook();

  const getChevronElement = () => {
    return chevronLinkRef;
  };

  // check if currently selected project is an actual project with a page, before showing chevron (by passing correct/non-empty link)
  const handleLink = () => {
    if (selectedProject) {
      const projectList = [
        ...data.projectList.edges.map((project) => project.node.frontmatter.slug.slice(9)),
      ];

      for (let i = 0; i < projectList.length; i += 1) {
        if (selectedProject === projectList[i]) {
          return `/project/${selectedProject}`;
        }
      }
    }

    return '';
  };

  const findBlob = useCallback(() => {
    let blobIndexNumber: number;
    data.images.nodes.forEach((image, index) => {
      if (image.base === 'Blobs.svg') {
        blobIndexNumber = index;
        setBlobImage(data.images.nodes[blobIndexNumber].publicURL);
      }
    });
  }, [data.images.nodes]);

  useEffect(() => {
    findBlob();
  }, [blobImage, findBlob]);

  useEffect(() => {
    // if sessionStorage already exists
    if (sessionStorage.getItem('first-visit-timeline') === 'false') {
      setFirstVisitTimeline(false);
    }

    if (!sessionStorage.getItem('first-visit-timeline')) {
      sessionStorage.setItem('first-visit-timeline', 'true');
      setFirstVisitTimeline(true);
    }
  }, [firstVisitTimeline]);

  const handleScrollTutorial = () => {
    sessionStorage.setItem('first-visit-timeline', 'false');
    setFirstVisitTimeline(false);
  };

  return (
    <PageContainer className="page-container-styles">
      <SEO
        title="Timeline"
        description="Zachary Holman's timeline portfolio. View all the projects I have worked on since I have started web development with an interactive scrolling timeline."
      />
      <BorderContainer />
      {/* left chevron */}
      <ChevronLink
        fill={Colors.whiteTint}
        hover={Colors.primaryDark}
        position="left"
        link={`${selectedProject ? `/?project=${selectedProject}` : '/'}`}
        direction="right"
      />
      {/* right chevron */}
      <ChevronLink
        fill={Colors.whiteTint}
        hover={Colors.primaryNeutral}
        position="right"
        link={handleLink()}
        ref={chevronLinkRef}
        direction="left"
      />
      <ContentContainer className="page-content-styles">
        <h1>My Timeline</h1>
        <TimelineContainer
          style={{
            background: `url('${data.background.childImageSharp.fixed.src}')`,
          }}
        >
          <TimelineCreator
            chevronRef={getChevronElement()}
            handleScrollTutorial={handleScrollTutorial}
          />
          {firstVisitTimeline && (
            <SwipeTutorial>
              <h2>Swipe Left or Scroll</h2>
              <h2>To Move Timeline</h2>
            </SwipeTutorial>
          )}
          <ShadowMask />
        </TimelineContainer>
        <BlobContainer>
          <img src={blobImage} alt="" />
        </BlobContainer>
        <StyledAniLink
          swipe
          direction="up"
          to={`${selectedProject ? `/timeline-list?project=${selectedProject}` : '/timeline-list'}`}
          duration="1.5"
          entryOffset="100"
        >
          Click for List of all Projects
        </StyledAniLink>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelinePage;

export const data = graphql`
  query TimelineImages {
    images: allFile(filter: { relativeDirectory: { eq: "timelinePage" } }) {
      nodes {
        id
        base
        publicURL
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

    projectList: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            slug
          }
        }
      }
    }
  }
`;
