import React, { useCallback, useEffect, useRef, useState } from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { useScrollHook } from '../hooks';
import { Breakpoints, TimelineColors, Colors } from '../shared';

/* ------------------------- styled components types ------------------------ */

type TimelineColor = {
  timelineColor: string;
};

type UpperOrLowerContainerProps = TimelineColor;

type TitleDescriptionContainerProps = TimelineColor;

type TitleContainerProps = TimelineColor & { timelineFontColor: string };

type ProjectImageContainerProps = TimelineColor;

type TimelineSquaresContainerProps = TimelineColor & { timelineFontColor: string };

/* --------------------------------- styles --------------------------------- */

// https://jsfiddle.net/nLbag9u5/260/
// used mainly to hide scrollbar
const TimelineOuterContainer = styled.div`
  // page-content-styles overrides
  padding: unset;
  max-width: unset;
  text-align: unset;
  @media screen and (min-width: ${Breakpoints.for4TabletLandscapeUp}) {
    padding: unset;
  }

  height: calc(100% - 1px); // 1 px for gap between edge and scrollbar
  width: 100%; // none here, because screen-sizes that would have vertical are oddly shaped, and probably pretty rare
  overflow-y: auto;
  overflow-x: auto;
  cursor: grab;

  h2 {
    width: 85%;
    border-radius: 25px 25px 0 0;
    margin: 0;
    padding: 5px 5px 0 5px;
    margin-bottom: -1px;

    ${({ theme }) => theme.breakpoints.for0PhoneOnly()`
      width: 78%;
    `}

    ${({ theme }) => theme.breakpoints.for1SmallPhonesOnly()`
      width: 70%;
      font-size: 22px;
    `}

    @media screen and (min-width: 900px) and (min-height: 650px) {
      font-size: 26px;
      margin-left: 20px;
    }

    @media screen and (min-width: 900px) and (min-height: 1200px) {
      font-size: 35px;
      margin-left: 20px;
      margin-top: 20px;
    }

    @media screen and (min-width: 1200px) and (min-height: 800px) {
      font-size: 30px;
      margin-left: 20px;
    }
  }

  p {
    font-size: 13px;
    padding: 5px;
    margin: 0;

    @media screen and (min-width: 1200px) and (min-height: 800px) {
      font-size: 16px;
    }

    @media screen and (min-width: 900px) and (min-height: 1200px) {
      font-size: 18px;
    }
  }
`;

const TimelineInnerContainer = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  min-height: 300px;

  @media screen and (min-width: 900px) and (min-height: 650px) {
    & > div:not(:first-child) {
      margin-left: -25%;
    }
  }

  .UpperContainer {
    @media screen and (min-width: 900px) and (min-height: 650px) {
      flex-wrap: wrap;
    }
  }

  .LowerContainer {
    @media screen and (min-width: 900px) and (min-height: 650px) {
      align-self: flex-end;
      flex-wrap: wrap-inverse;

      & > button {
        top: -38px;
      }

      & > div:first-child {
        align-self: flex-start;
        margin-top: 40px;

        &:before {
          content: '';
          width: 98%;
          height: 40px;
          border-radius: 25px 0 0 0;
          margin-top: -20px;
          margin-bottom: -1px;
        }

        & > div {
          border-radius: 0 0 0 25px;
        }

        & > p {
          border: unset;
          margin-bottom: 0;

          &:before {
            border-left: 3px solid transparent;
            border-top: 3px solid transparent;
          }
        }
      }

      & > div:nth-child(2) {
        align-self: flex-end;
      }

      &:after {
        display: none;
      }
    }
  }
`;

const UpperOrLowerContainer = styled.div<UpperOrLowerContainerProps>`
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  position: relative;

  @media screen and (min-width: 900px) and (min-height: 650px) {
    flex-direction: row;
    height: 50%;
    flex: 0 0 65%;
  }

  @media screen and (max-width: 1200px) and (min-height: 1200px) {
    flex-direction: row;
    height: 50%;
    flex: 0 0 85%;
  }

  &:after {
    order: 2;
    content: '';
    width: calc(50% - 13px);
    height: 10px;
    border-radius: 0 0 0 25px;
    border-bottom: 3px solid ${(props) => props.timelineColor};
    border-left: 3px solid ${(props) => props.timelineColor};
    margin: 0 50% 0 2px;

    @media screen and (min-width: 900px) and (min-height: 650px) {
      margin: unset;
      margin: 0 0 0 5px;
    }
  }
`;

const TitleDescriptionContainer = styled.div<TitleDescriptionContainerProps>`
  order: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: calc(100% - 10px);
  margin: 5px auto 0 auto;
  flex: 1 1 auto;

  @media screen and (min-width: 900px) and (min-height: 650px) {
    order: 1;
    margin: unset;
    flex: 0 0 50%;
    height: 70%;
    margin: 5px 0;
    align-self: flex-end;
  }

  & > p {
    border-left: 3px solid ${(props) => props.timelineColor};
    border-radius: 25px 0 0 0;
    margin: 0 10px 0 -3px;
    flex: 1;
    min-height: 25px;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 900px) and (min-height: 650px) {
      margin: unset;
      margin-left: 5px;
      margin-bottom: -5px;
    }

    &:before {
      content: '';
      height: 30px;
      border-top: 3px solid ${(props) => props.timelineColor};
      border-left: 3px solid ${(props) => props.timelineColor};
      width: 100%;
      border-radius: 25px 0 0 0;
      margin: -5px 0 -27px -8px;

      @media screen and (min-width: 900px) and (min-height: 650px) {
        display: none;
      }
    }
  }
`;

const TitleContainer = styled.div<TitleContainerProps>`
  display: flex;
  justify-content: center;
  border-radius: 0 0 25px;
  flex-direction: column;
  align-items: center;

  h2 {
    background-color: ${(props) => props.timelineColor};
    color: ${(props) => props.timelineFontColor};
  }

  &:after {
    content: '';
    width: 80%;
    border-right: 3px solid ${(props) => props.timelineColor};
    border-bottom: 3px solid ${(props) => props.timelineColor};
    height: 100px;
    border-radius: 0 0 25px 0;
    align-self: flex-end;
    margin-bottom: -3px;
    margin-top: -100px;
    margin-right: -3px;

    @media screen and (min-width: 900px) and (min-height: 650px) {
      display: none;
    }
  }
`;

const ProjectImageContainer = styled.div<ProjectImageContainerProps>`
  order: 1;
  width: calc(100% - 4px);
  align-self: center;
  margin: 5px 0;
  min-height: 80px;
  flex: 0 5000 auto;
  background-color: black;
  border: 3px solid ${(props) => props.timelineColor};
  overflow: hidden;
  border-radius: 25px;
  box-sizing: border-box;
  pointer-events: none;

  @media screen and (min-width: 900px) and (min-height: 650px) {
    order: 2;
    flex: 0 0 calc(50% - 5px);
    align-self: unset;
    margin: unset;
    height: 85%;
    margin: 5px 5px 5px 0;
  }
`;

// styles assigned on Img jsx element
// https://github.com/gatsbyjs/gatsby/discussions/28212
// const ProjectImage = styled(Img)<{ fluid: FluidObject | FluidObject[] }>`
//   height: 100%
// `;

const TimelineSquaresContainer = styled.button<TimelineSquaresContainerProps>`
  order: 3;
  width: 76px;
  height: 76px;
  align-self: center;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 8px solid ${(props) => props.timelineColor};
  background-color: ${({ theme }) => theme.colors.whiteTint};
  margin-top: -8px;
  border-radius: 50%;

  @media screen and (min-width: 900px) and (min-height: 650px) {
    align-self: unset;
    margin: unset;
    position: absolute;
    bottom: -38px;
    left: calc(50% - 38px);
  }

  &:hover,
  &:focus {
    outline: none;
    border-width: 0px;
    transition: border-width 1s;
    cursor: pointer;

    & > div {
      background-color: ${(props) => props.timelineColor};
      color: ${(props) => props.timelineFontColor};
      height: 76px;
      flex: 0 0 76px;
    }
  }
`;

const TimelineSquare = styled.div`
  height: 44px;
  flex: 0 0 44px;
  background-color: ${({ theme }) => theme.timelineColors.colorGray};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Bitter', sans-serif;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 400;
  transition: flex 0.5s, height 0.5s, color 0.5s, background-color 0.5s;
`;

const TimelineLine = styled.div`
  border-top: 10px dotted #c4c4c4;
  position: absolute;
  bottom: 38px;
  left: 10px;
  z-index: -1;
  // width set programmatically similar to the following; to adjust go to jsx element
  /* width: calc((100% * (INNER-CONTAINER-NUMBER-OF-CHILDREN - 1)) - 20px); */

  @media screen and (min-width: 900px) and (min-height: 650px) {
    bottom: calc(50% - 5px);
  }
`;

/* ---------------------------------- types --------------------------------- */

type Project = {
  id: string;
  title: string;
  description: string;
  image: {
    aspectRatio: number;
    base64: string;
    sizes: string;
    src: string;
    srcSet: string;
  };
};

type TimelineCreatorProps = {
  projects: Project[];
};

type Props = TimelineCreatorProps;

/* -------------------------------- component ------------------------------- */

const TimelineCreator = ({ projects }: Props): JSX.Element => {
  const timelineOuterContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const timelineInnerContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [timelineArray, setTimelineArray] = useState<JSX.Element[]>([]);
  const [timelineProjectCount, setTimelineProjectCount] = useState<number>();
  const [timelineProjectWidth, setTimelineProjectWidth] = useState<number>();
  const [timelineWidth, setTimelineWidth] = useState<number>();
  const handleScroll = useScrollHook(timelineOuterContainerRef);

  const createUpperOrLowerContainers = ({ title, description, image, id }: Project, i: number) => {
    let upperOrLower;

    // 900 x 650 viewport equivalent (have media queries that shrink )
    if (
      timelineOuterContainerRef.current.offsetWidth >= 748 &&
      timelineOuterContainerRef.current.offsetHeight >= 518.5
    ) {
      if (i % 2 === 0) upperOrLower = 'UpperContainer';
      else upperOrLower = 'LowerContainer';
    } else {
      upperOrLower = 'UpperContainer';
    }

    // keep j within (1 - 12) range; repeats if it goes higher than 12.
    // used to repeat timeline color pattern
    const j = (i % 12) + 1;

    // assign color from TimelineColors
    const roygbiv = TimelineColors[`color${j}` as keyof typeof TimelineColors];
    // assign appropriate font color for background
    const lightOrDarkFont = j >= 6 && j <= 10 ? Colors.primaryDark : Colors.whiteTint;

    // have css styles on UpperOrLowerContainer, because these came from css classes
    // that were applied depending on if the container is upper or lower
    // i've moved the logic here so that they can as-well change color. (.UpperContainer & .LowerContainer)
    return (
      <UpperOrLowerContainer
        key={id}
        className={upperOrLower}
        timelineColor={roygbiv}
        css={`
          ${upperOrLower === 'UpperContainer' &&
          `
            @media screen and (min-width: 900px) and (min-height: 650px) {
              & > div:first-child > p {
                border-top: 3px solid ${roygbiv};
              }
            }
          `}
          ${upperOrLower === 'LowerContainer' &&
          `
            @media screen and (min-width: 900px) and (min-height: 650px) {
              & > div:first-child {
                &:before {
                  border-top: 3px solid ${roygbiv};
                  border-left: 3px solid ${roygbiv};
                }

                & > div {
                  border-bottom: 3px solid ${roygbiv};
                  border-left: 3px solid ${roygbiv};
                }
              }
            }
          `}
        `}
      >
        <TitleDescriptionContainer timelineColor={roygbiv}>
          <TitleContainer timelineColor={roygbiv} timelineFontColor={lightOrDarkFont}>
            <h2>{title}</h2>
          </TitleContainer>
          <p>{description}</p>
        </TitleDescriptionContainer>
        <ProjectImageContainer timelineColor={roygbiv}>
          <Img
            fluid={image}
            imgStyle={{ objectFit: 'cover', objectPosition: '50% 0%' }}
            style={{ height: '100%', width: '100%' }}
          />
        </ProjectImageContainer>
        <TimelineSquaresContainer timelineColor={roygbiv} timelineFontColor={lightOrDarkFont}>
          <TimelineSquare>View</TimelineSquare>
        </TimelineSquaresContainer>
      </UpperOrLowerContainer>
    );
  };

  // create timeline callback
  const createTimeline = useCallback(() => {
    const tArray = [];

    for (let i = 0; i < projects.length; i += 1) {
      tArray.push(createUpperOrLowerContainers(projects[i], i));
    }

    setTimelineArray(tArray);

    // store width of timeline container
    setTimelineWidth(timelineInnerContainerRef.current.getBoundingClientRect().width);

    // store width of each project that is part of the timeline
    // probably an easier way to get the width percentage I set in the styled-component
    setTimelineProjectWidth(
      (timelineInnerContainerRef.current.children[0].getBoundingClientRect().width /
        timelineInnerContainerRef.current.getBoundingClientRect().width) *
        100,
    );
  }, [projects]);

  // update createTimeline on window resize, if too small, only upper timeline points
  useEffect(() => {
    window.addEventListener('resize', createTimeline);

    return () => {
      window.removeEventListener('resize', createTimeline);
    };
  }, [createTimeline, projects, timelineArray]);

  // call createTimeline on mount
  useEffect(() => {
    createTimeline();
  }, [createTimeline, timelineProjectCount]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // timelineOuterContainerRef.current.scrollLeft += timelineOuterContainerRef.current.clientWidth;
    if (e.deltaY > 0) timelineOuterContainerRef.current.scrollLeft += 25;
    else timelineOuterContainerRef.current.scrollLeft -= 25;
  };

  // prevent vertical scrolling with mousewheel, incase there is any vertical scrolling
  useEffect(() => {
    const { current } = timelineOuterContainerRef;
    const cancelWheel = (e: WheelEvent) => e.preventDefault();

    current.addEventListener('wheel', cancelWheel, { passive: false });

    return () => {
      current.removeEventListener('wheel', cancelWheel);
    };
  }, []);

  // set timeline-line width based on number of children of inner container
  useEffect(() => {
    setTimelineProjectCount(timelineInnerContainerRef.current.children.length - 1);
  }, [timelineProjectCount]);

  // cursor able to drag timeline
  // https://htmldom.dev/drag-to-scroll/

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseMoveHandler = (e: MouseEvent) => {
    // how far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // scroll the element
    timelineOuterContainerRef.current.scrollTop = pos.top - dy;
    timelineOuterContainerRef.current.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = () => {
    timelineOuterContainerRef.current.style.cursor = 'grab';
    timelineOuterContainerRef.current.style.removeProperty('user-select');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    // change the cursor and prevent user from selecting the text
    timelineOuterContainerRef.current.style.cursor = 'grabbing';
    timelineOuterContainerRef.current.style.userSelect = 'none';

    pos = {
      // the current scroll
      left: timelineOuterContainerRef.current.scrollLeft,
      top: timelineOuterContainerRef.current.scrollTop,
      // get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  return (
    <TimelineOuterContainer
      onWheel={handleWheel}
      ref={timelineOuterContainerRef}
      onMouseDown={mouseDownHandler}
      onScroll={() => handleScroll()}
      className="page-content-styles"
    >
      <TimelineInnerContainer ref={timelineInnerContainerRef}>
        {timelineArray}
        <TimelineLine
          style={{
            width: `calc((${timelineProjectWidth}% * ${timelineProjectCount}) - (20px + ((${timelineWidth}px * 0.25) * (${timelineProjectCount} - 2))) )`,
          }}
        />
      </TimelineInnerContainer>
    </TimelineOuterContainer>
  );
};

export default TimelineCreator;
