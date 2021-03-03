import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import IFrameResizer from 'iframe-resizer-react';
import { ChevronLink } from '../components';
import { Colors } from '../shared';
import { useScrollHook } from '../hooks';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  .project-buttons {
    background-color: ${(props) => props.theme.colors.accentTwo};
    color: ${(props) => props.theme.colors.whiteTint};
    box-shadow: 0 0 6px black;
    border: none;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    font-family: 'Bitter', sans-serif;
    font-weight: bold;
    transition: background-color 0.5s, color 0.5s;

    &:hover,
    &:focus {
      outline: none;
      background-color: ${(props) => props.theme.colors.whiteTint};
      color: ${(props) => props.theme.colors.accentTwo};
    }
  }

  background-color: ${(props) => props.theme.colors.primaryNeutral};
`;

const ContentContainer = styled.main`
  p {
    font-weight: 300;
  }

  outline: none;
  color: ${(props) => props.theme.colors.whiteTint};

  // remove some default styles from .page-content-styles
  padding: 0;
  max-width: unset;
  overflow: hidden;
  width: 100%;
  height: 100%;
  width: calc(100% - 40px);
  height: calc(100% - 40px);

  // for iframe grow animation/transition
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

/* PROJECT INFORMATION */
const ProjectInformationContainer = styled.div`
  height: 50%;
  overflow: hidden;
  transition: height 1s;
`;

const ProjectInformation = styled.div`
  h1 {
    margin: 10px 0 0 0;
  }

  h2 {
    margin: 10px 0 10px 0;
  }

  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectDescription = styled.div`
  & > p:first-child {
    margin-top: 0;
  }

  outline: none;
  overflow-y: scroll;
  width: calc(100% - 15px);
  padding: 0 5px;
`;

const BlobContainer = styled.div`
  width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 5px;
  z-index: -1;
  transform: rotate(-60deg);
  max-width: 200px;
`;

/* PROJECT DISPLAY */
const ProjectDisplayContainer = styled.div`
  height: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: height 1s;
`;

const ProjectDisplay = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.colors.primaryNeutral};
  border-radius: 15px;
  border: 3px solid ${(props) => props.theme.colors.accentOne};
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  // fixes iOS safari overflowing with border radius and overflow: hidden;
  // https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b#gistcomment-2911047
  z-index: 1;
`;

const VisitSiteButton = styled.a`
  position: absolute;
  bottom: 5px;
  left: 5px;
  z-index: 6;
`;

const Github = styled.a`
  position: absolute;
  bottom: 5px;
  z-index: 6;
`;

const FullScreenButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 6;
`;

const IFrame = styled(IFrameResizer)`
  width: 1px;
  min-width: calc(100% / 0.3);
  height: calc(100% / 0.3);
  transform: scale(0.3);

  ${({ theme }) => theme.breakpoints.for0PhoneOnly()`
    min-width: calc(100% / 0.3);
    height: calc(100% / 0.3);
    transform: scale(0.3);
  `}

  ${({ theme }) => theme.breakpoints.for1SmallPhonesOnly()`
    min-width: calc(100% / 0.2);
    height: calc(100% / 0.2);
    transform: scale(0.2);
  `}

  @media screen and (min-width: 450px) {
    min-width: calc(100% / 0.35);
    height: calc(100% / 0.35);
    transform: scale(0.35);
  }

  ${({ theme }) => theme.breakpoints.for2SlightlyBiggerPhoneUp()`
    min-width: calc(100% / 0.5);
    height: calc(100% / 0.5);
    transform: scale(0.5);
  `}

  ${({ theme }) => theme.breakpoints.for3TabletPortraitUp()`
    min-width: calc(100% / 0.6);
    height: calc(100% / 0.6);
    transform: scale(0.6);
  `}

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    min-width: calc(100% / 0.75);
    height: calc(100% / 0.75);
    transform: scale(0.75);
  `}

  ${({ theme }) => theme.breakpoints.for5DesktopUp()`
    min-width: calc(100% / 0.9);
    height: calc(100% / 0.9);
    transform: scale(0.9);
  `}

  ${({ theme }) => theme.breakpoints.for6BigDesktopUp()`
    min-width: 100%;
    height: 100%;
    transform: scale(1);
  `}
`;

/* ---------------------------------- types --------------------------------- */

export interface ProjectPageTemplateProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        date: string;
        slug: string;
        title: string;
        url: string;
        github: string;
      };
    };

    images: {
      nodes: [
        {
          id: string;
          publicURL: string;
        },
      ];
    };
  };
}

/* -------------------------------- component ------------------------------- */

const ProjectPageTemplate: React.FC<ProjectPageTemplateProps> = ({
  data: {
    markdownRemark: { frontmatter, html },
    images,
  },
}: ProjectPageTemplateProps) => {
  const ProjectDescriptionRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const ContentContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const ProjectInformationContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleInformationScroll = useScrollHook(ProjectDescriptionRef);

  // auto focus inner div so keyboard controls can be instantly used
  useEffect(() => {
    ProjectDescriptionRef.current.tabIndex = -1;
    ProjectDescriptionRef.current.autofocus = true;
    ProjectDescriptionRef.current.focus();
  }, []);

  const handleFullscreenButton = () => {
    const ref = ContentContainerRef.current;

    if (ref.classList.contains('full-page')) {
      ref.classList.remove('full-page');
      ProjectInformationContainerRef.current.classList.remove('full-page-helper');
      ref.style.justifyContent = 'flex-end'; // for expand animation/transition
    } else {
      ref.style.justifyContent = 'space-between'; // for expand animation/transition
      ref.classList.add('full-page');
      ProjectInformationContainerRef.current.classList.add('full-page-helper');
    }
  };

  return (
    <PageContainer className="page-container-styles">
      <ContentContainer className="page-content-styles" ref={ContentContainerRef}>
        <ProjectInformationContainer
          className="project-information-container"
          ref={ProjectInformationContainerRef}
        >
          <ProjectInformation>
            <BlobContainer>
              <img src={images.nodes[0].publicURL} alt="" />
            </BlobContainer>

            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <ProjectDescription
              className="page-content-styles"
              dangerouslySetInnerHTML={{ __html: html }}
              ref={ProjectDescriptionRef}
              onScroll={() => handleInformationScroll()}
            />
          </ProjectInformation>
        </ProjectInformationContainer>
        <ProjectDisplayContainer className="project-display-container">
          <ProjectDisplay>
            <IFrame src={frontmatter.url} scrolling />
          </ProjectDisplay>
        </ProjectDisplayContainer>
      </ContentContainer>

      <ChevronLink
        fill={Colors.primaryNeutral}
        hover={Colors.primaryLight}
        position="left"
        link="/timeline"
      />

      {frontmatter.url && (
        <VisitSiteButton className="project-buttons" href={frontmatter.url}>
          Visit Site
        </VisitSiteButton>
      )}

      {frontmatter.github && (
        <Github className="project-buttons" href={frontmatter.github}>
          Github
        </Github>
      )}

      <FullScreenButton className="project-buttons" type="button" onClick={handleFullscreenButton}>
        Expand
      </FullScreenButton>
    </PageContainer>
  );
};

export default ProjectPageTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM - YYYY")
        slug
        title
        url
        github
      }
    }

    images: allFile(filter: { relativeDirectory: { eq: "projectPages" } }) {
      nodes {
        id
        publicURL
      }
    }
  }
`;
