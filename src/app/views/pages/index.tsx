import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { shallowEqual, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faFreeCodeCamp,
  faCodepen,
  faYoutube,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { BorderContainer, ChevronLink, PortraitWithBackground } from '../components';
import { Colors } from '../shared';
import { useScrollHook, useSelectedProjectHook } from '../hooks';
import { AppState } from '../../state/store';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};
`;

const ScrollingContainer = styled.div`
  overflow-y: scroll;
  display: flex;
  outline: none;
`;

const ContentContainer = styled.main`
  margin: auto;
  outline: none;
  color: ${({ theme }) => theme.colors.whiteTint};
  display: flex;
  flex-direction: column;

  p {
    font-weight: 300;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 5px;
  }

  h2 {
    margin: 12px 0;
  }

  ${({ theme }) => theme.breakpoints.for2SlightlyBiggerPhoneUp()`
    h1 { font-size: 3rem; }
  `}

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    h1 { font-size: 4.5rem; }
  `}
`;

const LinkContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;

  & > div {
    margin-bottom: 10px;
  }
`;

/* -------------------------------- component ------------------------------- */

const IndexPage: React.FC = () => {
  const [firstVisitIndex, setFirstVisitIndex] = useState(true);
  const scrollingContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleScroll = useScrollHook(scrollingContainerRef);
  const { selectedProject } = useSelector(
    ({ timeline: { timeline } }: AppState) => ({
      selectedProject: timeline.selectedProject,
    }),
    shallowEqual,
  );
  // not sure if this should really be a hook, if I don't need it to return anything
  useSelectedProjectHook();

  // auto focus inner div so keyboard controls can be instantly used
  useLayoutEffect(() => {
    scrollingContainerRef.current.tabIndex = -1;
    scrollingContainerRef.current.autofocus = true;
    scrollingContainerRef.current.focus();
  }, []);

  const customThinCircle = () => {
    return (
      <svg
        className="fa-stack-2x"
        viewBox="0 0 256 256"
        id="Flat"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: '#bda453' }}
      >
        <path
          fill="#bda453"
          d="M128,228A100,100,0,1,1,228,128,100.11316,100.11316,0,0,1,128,228Zm0-192a92,92,0,1,0,92,92A92.1042,92.1042,0,0,0,128,36Z"
        />
      </svg>
    );
  };

  const fontawesomeHelper = (icon: IconDefinition) => {
    return (
      <FontAwesomeIcon
        icon={icon}
        className="fa-stack-1x"
        style={{ color: '#bda453', fontSize: '40px' }}
      />
    );
  };

  const makeLink = (link: string, icon: IconDefinition) => {
    return (
      <a href={link}>
        <span className="fa-stack fa-2x">
          {customThinCircle()}
          {fontawesomeHelper(icon)}
        </span>
      </a>
    );
  };

  useEffect(() => {
    // if sessionStorage already exists
    if (sessionStorage.getItem('first-visit-index') === 'false') {
      setFirstVisitIndex(false);
    }

    if (!sessionStorage.getItem('first-visit-index')) {
      sessionStorage.setItem('first-visit-index', 'true');
      setFirstVisitIndex(true);
    }
  }, [firstVisitIndex]);

  const handleClick = () => {
    sessionStorage.setItem('first-visit-index', 'false');
    setFirstVisitIndex(false);
  };

  return (
    <PageContainer className="page-container-styles">
      <BorderContainer />
      <ChevronLink
        fill={Colors.primaryDark}
        hover={Colors.primaryLight}
        position="right"
        link={`${selectedProject ? `/timeline?project=${selectedProject}` : '/timeline'}`}
        direction="left"
        className={firstVisitIndex === true ? 'glow' : ''}
        onClick={() => handleClick()}
      />

      <ScrollingContainer
        className="page-content-styles"
        ref={scrollingContainerRef}
        onScroll={() => handleScroll()}
      >
        <ContentContainer>
          <PortraitWithBackground style={{ marginTop: 'max(calc(5% - 2vh), 0%)' }} />
          <h1>Zachary Holman</h1>
          <h2 style={{ padding: '0 20px' }}>Seeking & Pursuing Web Development</h2>
          <p>
            I will always be taking steps into learning more about web development, and learning
            more about myself along the way. I was born in California, but have lived almost all of
            my entire life in Colorado.
          </p>
          <p>
            The way I see it, any type of programming can be treated as a puzzle, which is why I am
            drawn to it as an interest; it allows for unique, creative, and many different types of
            solutions. Video games started off my interest in programming; always wanting to create
            my own one day and wanting to know exactly how they were made.
          </p>
          <p>
            As time has passed, my programming interests have shifted, and web development is now a
            large interest of mine. I&apos;m excited to learn more and create something that others
            will enjoy. Please enjoy this timeline portfolio I have put together.
          </p>
          <LinkContainer>
            <div>
              {makeLink('https://github.com/squibs', faGithub)}
              {makeLink(
                'mailto:email@email.com?subject=Timeline Portfolio - Contact Request',
                faEnvelope,
              )}
              {makeLink('https://www.freecodecamp.org/squibs', faFreeCodeCamp)}
            </div>
            <div>
              {makeLink('https://codepen.io/Sulph', faCodepen)}
              {makeLink('https://www.youtube.com/squibsvids', faYoutube)}
              {makeLink('https://twitter.com/SquibsVids', faTwitter)}
            </div>
          </LinkContainer>
        </ContentContainer>
      </ScrollingContainer>
    </PageContainer>
  );
};

export default IndexPage;
