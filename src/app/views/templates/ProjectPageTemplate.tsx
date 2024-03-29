import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';
import IFrameResizer from 'iframe-resizer-react';
import Loader from 'react-loader-spinner';
import { ExternalLink, GitHub, Maximize2 } from 'react-feather';
import { BorderContainer, ChevronLink, SEO } from '../components';
import { Colors } from '../shared';
import { useScrollHook } from '../hooks';
import { timelineOperations } from '../../state/ducks/timeline';

/* -------------------------------------------------------------------------- */
/*                           styled components types                          */
/* -------------------------------------------------------------------------- */

const PageContainer = styled.div`
  .project-buttons {
    background-color: ${({ theme }) => theme.colors.accentTwo};
    color: ${({ theme }) => theme.colors.whiteTint};
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
      background-color: ${({ theme }) => theme.colors.whiteTint};
      color: ${({ theme }) => theme.colors.accentTwo};
    }
  }

  background-color: ${({ theme }) => theme.colors.primaryNeutral};
`;

const ContentContainer = styled.main`
  p {
    font-weight: 300;
  }

  outline: none;
  color: ${({ theme }) => theme.colors.whiteTint};
  max-width: 2560px;

  // remove some default styles from .page-content-styles
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  width: calc(100% - 40px);
  height: calc(100% - 40px);

  // for iframe grow animation/transition
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    flex-direction: row;
  `}
`;

/* PROJECT INFORMATION */
const ProjectInformationContainer = styled.div`
  height: 50%;
  transition: height 1s;
  position: relative;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    height: 100%;
    width: 25%;
  `}
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

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    h1 { font-size: 36px; }
    h2 { font-size: 28px; }
  `}
`;

const ProjectDescription = styled.div`
  & > div > p:first-child {
    margin-top: 0;
  }

  display: flex;
  flex-direction: column;
  outline: none;
  overflow-y: scroll;
  overflow-x: hidden;
  overflow-wrap: break-word;
  width: calc(100% - 45px);
  padding: 0 20px;
  text-align: left;

  & h3 {
    text-align: center;
  }

  ${({ theme }) => theme.breakpoints.for3TabletPortraitUp()`
    padding: 0 30px;
    width: calc(100% - 60px);
  `}
`;

const BlobContainer = styled.div`
  width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -35px;
  top: 5px;
  z-index: -1; // send behind everything else, but background
  max-width: 125px;

  & > img {
    transform: rotate(-60deg);
  }

  ${({ theme }) => theme.breakpoints.for0PhoneOnly()`
    right: -20px;
  `}
`;

/* PROJECT DISPLAY */
const ProjectDisplayContainer = styled.div`
  height: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: height 1s;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    height: 100%;
    width: 75%;
  `}
`;

const ProjectDisplay = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primaryNeutral};
  border-radius: 15px;
  border: 3px solid ${({ theme }) => theme.colors.accentOne};
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* box-shadow: ${({ theme }) => theme.reusedCSS.boxShadow}; */
  box-shadow: 0px 4px 6px black;

  // https://gist.github.com/ayamflow/b602ab436ac9f05660d9c15190f4fd7b#gistcomment-2911047
  z-index: 1; // fixes iOS safari overflowing with border radius and overflow: hidden;
`;

/* BUTTONS */
const ButtonContainer = styled.div`
  width: calc(100% - 10px); // padding on sides of buttons
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 3; // buttons below the iframe go above border
  position: absolute;
  bottom: 5px;
  right: 5px;

  & > div {
    display: flex;

    &:nth-child(2) > .project-buttons {
      margin: 0 auto;
    }

    &:last-child > .project-buttons {
      margin: 0;
      margin-left: auto;
    }
  }

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    & > div:last-child { display: none; }
  `}
`;

/* IFRAME */
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

  @media screen and (min-width: 1050px) {
    min-width: calc(100% / 0.7);
    height: calc(100% / 0.7);
    transform: scale(0.7);
  }

  ${({ theme }) => theme.breakpoints.for5DesktopUp()`
    min-width: calc(100% / 0.85);
    height: calc(100% / 0.85);
    transform: scale(0.85);
  `}

  ${({ theme }) => theme.breakpoints.for6BigDesktopUp()`
    min-width: 100%;
    height: 100%;
    transform: scale(1);
  `}
`;

/* IFRAME SPINNER */
const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;

  & > div:first-child {
    margin-left: -25px;
  }
`;

const LoadingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 0;
    margin-right: 3px;
    margin-left: -5px;
  }

  & > div {
    height: min-content;
    margin-top: 13%;
  }
`;

/* -------------------------------------------------------------------------- */
/*                               component types                              */
/* -------------------------------------------------------------------------- */

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
        broken: boolean;
        imageAlt: string;
        description: string;
        image: {
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

/* -------------------------------------------------------------------------- */
/*                                  component                                 */
/* -------------------------------------------------------------------------- */

const ProjectPageTemplate: React.FC<ProjectPageTemplateProps> = ({
  data: {
    markdownRemark: { frontmatter, html },
    images,
  },
}: ProjectPageTemplateProps) => {
  const ProjectDescriptionRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const ContentContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  // you can type the ref either way below (as React.Muta...<HTML...> or useRec<HTML...>(null))
  const ProjectInformationContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleInformationScroll = useScrollHook(ProjectDescriptionRef);
  const [videoLoading, setVideoLoading] = useState(true);
  const dispatch = useDispatch();

  // set selected project in redux based on current project page
  useEffect(() => {
    dispatch(timelineOperations.projectSelect(frontmatter.slug.replace(/\/project\//, '')));
  }, [dispatch, frontmatter.slug]);

  // auto focus inner div so keyboard controls can be instantly used
  useLayoutEffect(() => {
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

  const handleIframeLoad = () => {
    setVideoLoading(false);
  };

  return (
    <PageContainer className="page-container-styles">
      <SEO
        title={frontmatter.title}
        description={`Zachary Holman's timeline portfolio. ${frontmatter.description}`}
      />
      <BorderContainer />
      <ChevronLink
        fill={Colors.primaryNeutral}
        hover={Colors.primaryLight}
        position="left"
        link={`/timeline?project=${frontmatter.slug.replace(/\/project\//, '')}`}
        direction="right"
      />

      <ContentContainer className="page-content-styles" ref={ContentContainerRef}>
        <ProjectInformationContainer
          className="project-information-container"
          ref={ProjectInformationContainerRef}
        >
          <BlobContainer>
            <img src={images.nodes[0].publicURL} alt="" />
          </BlobContainer>
          <ProjectInformation>
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <ProjectDescription
              className="page-content-styles"
              ref={ProjectDescriptionRef}
              onScroll={() => handleInformationScroll()}
            >
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: html }} />

              <h3>Notice</h3>
              <p style={{ fontSize: 14, marginTop: 0, textAlign: 'center' }}>
                <i>
                  Styles might be off in the iFrame on this page. If you are on a mobile device and
                  everything is looking a bit small, then please visit the project site itself. You
                  can do this by clicking on the
                  <span style={{ whiteSpace: 'nowrap' }}>
                    <b>
                      &nbsp; &#91; red Site
                      <ExternalLink
                        css={`
                          height: 12px;
                          vertical-align: -6%;
                        `}
                      />
                      button &#93; &nbsp;
                    </b>
                  </span>
                  <br />
                  underneath the iFrame, or by visiting the project site link below.
                </i>
              </p>
              <p style={{ fontSize: 14, textAlign: 'center' }}>
                <i>Check out any of the other buttons while you are there as well.</i>
              </p>

              <h3>Nav Links</h3>
              <AniLink
                paintDrip
                hex="#2f343c"
                duration={1.5}
                entryOffset={100}
                to={`/contact?project=${frontmatter.slug.replace(/\/project\//, '')}`}
                style={{ marginTop: 3, textAlign: 'center', marginBottom: 15 }}
              >
                Contact Me
              </AniLink>
              {frontmatter.url && (
                <a
                  href={frontmatter.url}
                  style={{ textAlign: 'center' }}
                  target="_blank"
                  rel="noreferrer"
                >
                  Project Site
                </a>
              )}
              {frontmatter.github && (
                <a
                  style={{ marginTop: 3, textAlign: 'center' }}
                  href={frontmatter.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  Project GitHub
                </a>
              )}
              <AniLink
                swipe
                direction="right"
                duration={1.5}
                entryOffset={100}
                to={`/timeline?project=${frontmatter.slug.replace(/\/project\//, '')}`}
                style={{ marginTop: 3, textAlign: 'center' }}
              >
                Back to Timeline
              </AniLink>
              <AniLink
                swipe
                direction="right"
                duration={1.5}
                entryOffset={100}
                to={`/?project=${frontmatter.slug.replace(/\/project\//, '')}`}
                style={{ paddingBottom: 10, marginTop: 3, textAlign: 'center' }}
              >
                Back to Homepage
              </AniLink>
            </ProjectDescription>
          </ProjectInformation>
        </ProjectInformationContainer>

        <ProjectDisplayContainer className="project-display-container">
          <ProjectDisplay>
            {/* if an image exists don't load an iframe, instead show the image */}
            {/* this is for projects that don't have a page, or the page is not working correctly atm */}
            {frontmatter.image ? (
              <div style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
                <p
                  style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    background: '#2b549c',
                    padding: '15px 0px',
                  }}
                >
                  {frontmatter.imageAlt}
                </p>
                <Img fluid={frontmatter.image.childImageSharp.fluid} style={{ width: '100%' }} />
              </div>
            ) : (
              videoLoading && (
                <SpinnerContainer>
                  <Loader
                    type="MutatingDots"
                    width={100}
                    height={100}
                    color={`${Colors.accentOne}`}
                    secondaryColor={`${Colors.accentTwo}`}
                  />
                  <LoadingText>
                    <h1>Loading</h1>
                    <Loader type="ThreeDots" color={`${Colors.whiteTint}`} width={45} />
                  </LoadingText>
                </SpinnerContainer>
              )
            )}
            {!frontmatter.image && (
              <IFrame src={frontmatter.url} scrolling onLoad={handleIframeLoad} />
            )}
            <ButtonContainer>
              {frontmatter.url && (
                <div>
                  <a
                    href={frontmatter.url}
                    className="project-buttons"
                    style={{ maxHeight: '15px' }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {frontmatter.broken && 'Deprecated'}
                    {/* could add deprecated to the above '' for less-functional sites */}
                    &nbsp;Site
                    <ExternalLink
                      css={`
                  height: 15px;
                  vertical-align: -6%;3

                `}
                    />
                  </a>
                </div>
              )}

              {frontmatter.github && (
                <div>
                  <a
                    href={frontmatter.github}
                    className="project-buttons"
                    style={{ maxHeight: '15px' }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                    <GitHub
                      css={`
                        height: 15px;
                        vertical-align: -8%;
                      `}
                    />
                  </a>
                </div>
              )}

              <div>
                <button type="button" className="project-buttons" onClick={handleFullscreenButton}>
                  <Maximize2
                    css={`
                      height: 20px;
                      vertical-align: -8%;
                    `}
                  />
                </button>
              </div>
            </ButtonContainer>
          </ProjectDisplay>
        </ProjectDisplayContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default ProjectPageTemplate;

export const pageQuery = graphql`
  query ($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM, YYYY")
        slug
        title
        url
        github
        broken
        imageAlt
        description
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
