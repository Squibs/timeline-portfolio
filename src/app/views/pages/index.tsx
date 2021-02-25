import React, { useRef } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { ChevronLink, ChevronLinkHelper, PortraitWithBackground } from '../components';
import { Colors } from '../shared';
import { useScrollHook } from '../hooks';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div``;

const ContentContainer = styled.div`
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

  p {
    font-weight: 300;
  }
`;

/* -------------------------------- component ------------------------------- */

const IndexPage: React.FC = () => {
  const contentContainerRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { handleScroll } = useScrollHook(contentContainerRef);

  return (
    <PageContainer className="page-container-styles">
      <Link to="/timeline">
        <ChevronLink
          height="15%"
          minHeight="100px"
          fill={Colors.primaryDark}
          passedCSS={`
              position: absolute;
              right: 11px;
              top: 50%;
              transform: translateY(-50%) scale(-1, 1);
              z-index: 6;
              -webkit-transform-origin: 50% 51%;
            `}
        />
      </Link>
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
      <ContentContainer
        className="page-content-styles"
        ref={contentContainerRef}
        onScroll={() => handleScroll()}
      >
        <PortraitWithBackground style={{ marginTop: 'max(calc(10% - 2vh), 0%)' }} />
        <h1>Bunch of Text</h1>
        <h2
          css={`
            padding: 0 20px;
          `}
        >
          Some more text as a sub-header
        </h2>
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
