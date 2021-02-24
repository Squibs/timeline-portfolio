import React, { useMemo, useRef } from 'react';
import { debounce, throttle } from 'lodash';
import styled from 'styled-components';
import { ChevronLink, ChevronLinkHelper, PortraitWithBackground } from '../components';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryDark};
  color: ${(props) => props.theme.colors.whiteTint};

  /* used to display scrollbar styles inside of content container */
  .on-scroll {
    scrollbar-width: thin;
    -ms-overflow-styled: none;
    // 90 is scrollbar opacity using hex code alpha
    scrollbar-color: ${(props) => props.theme.colors.accentOne}90
      ${(props) => props.theme.colors.primaryDark};
    &::-webkit-scrollbar {
      width: 11px !important;
      background-color: ${(props) => props.theme.colors.primaryDark};
    }
    &::-webkit-scrollbar-track {
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
      background: ${(props) => props.theme.colors.primaryDark} !important;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) =>
        // 90 is scrollbar opacity using hex code alpha
        props.theme.colors.accentOne}90;
      border-radius: 6px;
      border: 3px solid ${(props) => props.theme.colors.primaryDark};
    }
  }
`;

const ContentContainer = styled.div`
  text-align: center;
  width: calc(100% - 80px);
  height: calc(100% - 40px);
  overflow-y: auto;
  padding: 0 18px;

  /* hides default scrollbars */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 11px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track {
    box-shadow: none;
    -webkit-box-shadow: none;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
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

/* -------------------------------- component ------------------------------- */

const IndexPage: React.FC = () => {
  const contentContainerRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  /** debounced function used to remove/hide scrollbar styles after user is done scrolling */
  const removeStylesMemo = useMemo(
    () =>
      debounce(() => {
        if (contentContainerRef.current.classList.contains('on-scroll')) {
          contentContainerRef.current.classList.remove('on-scroll');
        }
      }, 1000),
    [],
  );

  /** throttled scroll handling */
  const handleScroll = throttle(
    () => {
      if (!contentContainerRef.current.classList.contains('on-scroll')) {
        contentContainerRef.current.classList.add('on-scroll');
      }

      removeStylesMemo();
    },
    800,
    { trailing: false, leading: true },
  );

  return (
    <PageContainer>
      <ContentContainer ref={contentContainerRef} onScroll={handleScroll}>
        <ChevronLink
          height="15%"
          minHeight="100px"
          fill="#2F343C"
          passedCSS={`
            position: absolute;
            left: 11px;
            top: 50%;
            transform: translateY(-50%) scale(1, 1);
            z-index: 6;
          `}
        />
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
        <ChevronLink
          height="15%"
          minHeight="100px"
          fill="#2F343C"
          passedCSS={`
            position: absolute;
            right: 11px;
            top: 50%;
            transform: translateY(-50%) scale(-1, 1);
            z-index: 6;
            -webkit-transform-origin: 50% 51%;
          `}
        />
        <ChevronLinkHelper
          height="15%"
          minHeight="100px"
          passedCSS={`
            position: absolute;
            right: 11px;
            top: 50%;
            transform: translateY(-50%) scale(-1, 1);
            filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.55));
            z-index: 4;
            -webkit-transform-origin: 50% 51%;
          `}
        />
        <PortraitWithBackground
          css={`
            @media screen and (min-width: 768px) {
              padding-top: 12vh;
            }
          `}
        />
        <h1>Bunch of Text</h1>
        <h2>Some more text as a sub-header</h2>
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
      </ContentContainer>
    </PageContainer>
  );
};

export default IndexPage;
