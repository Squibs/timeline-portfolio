import React, { useLayoutEffect, useRef } from 'react';
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

const ContentContainer = styled.main`
  outline: none;
  overflow-y: scroll;
  color: ${({ theme }) => theme.colors.whiteTint};
  display: flex;
  flex-direction: column;

  p {
    font-weight: 300;
  }

  // https://stackoverflow.com/questions/61979561/fading-scrollbar-when-not-scrolling
  /* &:after {
    content: '';
    position: absolute;
    background: red;
    pointer-events: none;
    height: calc(100% - 40px);
    top: 20px;
    right: 20px;
    width: 9px;
  } */
`;

const LinkContainer = styled.div`
  margin-top: auto;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > div {
    margin-bottom: 10px;
  }
`;

/* -------------------------------- component ------------------------------- */

const IndexPage: React.FC = () => {
  const contentContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleScroll = useScrollHook(contentContainerRef);
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
    contentContainerRef.current.tabIndex = -1;
    contentContainerRef.current.autofocus = true;
    contentContainerRef.current.focus();
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

  return (
    <PageContainer className="page-container-styles">
      <BorderContainer />
      <ChevronLink
        fill={Colors.primaryDark}
        hover={Colors.primaryLight}
        position="right"
        link={`${selectedProject ? `/timeline?project=${selectedProject}` : '/timeline'}`}
        direction="left"
      />

      <ContentContainer
        className="page-content-styles"
        ref={contentContainerRef}
        onScroll={() => handleScroll()}
      >
        <PortraitWithBackground style={{ marginTop: 'max(calc(10% - 2vh), 0%)' }} />
        <h1>Bunch of Text</h1>
        <h2 style={{ padding: '0 20px' }}>Some more text as a sub-header</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pellentesque erat ut mauris
          fringilla imperdiet. Proin quis varius nibh. Vivamus ipsum nibh, consectetur eget elit at,
          hendrerit viverra neque. Donec non sagittis urna. Duis fringilla sodales libero sit amet
          tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Nulla sit amet viverra justo, at ornare erat. Vestibulum ante ipsum primis
          in faucibus orci luctus et ultrices posuere cubilia curae; Mauris dapibus lectus
          ultricies, consequat purus non, molestie nunc. Morbi condimentum, velit et accumsan
          suscipit, neque metus facilisis nunc, in vestibulum urna.
        </p>
        <LinkContainer>
          <div>
            {makeLink('https://github.com/squibs', faGithub)}
            {makeLink(
              'mailto:***REMOVED***?subject=Timeline Portfolio - Contact Request',
              faEnvelope,
            )}
          </div>
          <div>
            {makeLink('https://www.freecodecamp.org/squibs', faFreeCodeCamp)}
            {makeLink('https://codepen.io/Sulph', faCodepen)}
          </div>
          <div>
            {makeLink('https://www.youtube.com/squibsvids', faYoutube)}
            {makeLink('https://twitter.com/SquibsVids', faTwitter)}
          </div>
        </LinkContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default IndexPage;
