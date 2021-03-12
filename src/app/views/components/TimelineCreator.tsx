import React, { useCallback, useEffect, useRef, useState } from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

// TODO; FIX SCROLLBAR FOR FIREFOX RIGHT NOW IT'S INVISIBLE, DUE TO GLOBAL STYLES
// font size queries
// adjust scroll to nearest project for mobile ~ 0.5-0.75 sec delay if in-between
// color theme in rainbow order with correct font colors

/* --------------------------------- styles --------------------------------- */

// https://jsfiddle.net/nLbag9u5/260/
// used mainly to hide scrollbar
const TimelineOuterContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  min-height: 270px;

  h2 {
    background-color: #54478c;
    width: 85%;
    border-radius: 25px 25px 0 0;
    margin: 0;
    padding: 2px 2px 0 2px;

    ${({ theme }) => theme.breakpoints.for0PhoneOnly()`
      width: 78%;
      padding: 10px 5px 0 5px;
    `}

    ${({ theme }) => theme.breakpoints.for1SmallPhonesOnly()`
      width: 70%;
    `}
  }

  p {
    font-size: 0.8rem;
    padding: 5px;
    margin: 0;
  }
`;

const TimelineInnerContainer = styled.div`
  height: 100%;
  display: flex;
  position: relative;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    & > div:not(:first-child) {
      margin-left: -25%;
    }
  `}

  .UpperContainer {
    ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
      flex-wrap: wrap;

      & > div:first-child {
        & > p {
          border-top: 3px solid #54478c;
        }
      }
    `}
  }

  .LowerContainer {
    ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
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
          height: 20px;
          border-top: 3px solid #54478c;
          border-left: 3px solid #54478c;
          border-radius: 25px 0 0 0;
          margin-top: -20px;
        }

        & > div {
          border-radius: 0 0 0 25px;
          border-bottom: 3px solid #54478c;
          border-left: 3px solid #54478c;
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
    `}
  }
`;

const UpperOrLowerContainer = styled.div`
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  position: relative;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    flex-direction: row;
    height: 50%;
    flex: 0 0 65%;
  `}

  &:after {
    order: 2;
    content: '';
    width: calc(50% - 13px);
    height: 10px;
    border-radius: 0 0 0 25px;
    border-bottom: 3px solid #54478c;
    border-left: 3px solid #54478c;
    margin: 0 50% 0 2px;

    ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
      margin: unset;
      margin: 0 0 0 5px;
    `}
  }
`;

const TitleDescriptionContainer = styled.div`
  order: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: calc(100% - 10px);
  margin: 5px auto 0 auto;
  flex: 1 1 auto;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    order: 1;
    margin: unset;
    flex: 0 0 50%;
    height: 70%;
    margin: 5px 0;
    align-self: flex-end;
  `}

  & > p {
    border-left: 3px solid #54478c;
    border-radius: 25px 0 0 0;
    margin: 0 10px 0 -3px;
    flex: 1;
    min-height: 25px;
    display: flex;
    flex-direction: column;

    ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
      margin: unset;
      margin-left: 5px;
      margin-bottom: -5px;
    `}

    &:before {
      content: '';
      height: 30px;
      border-top: 3px solid #54478c;
      border-left: 3px solid #54478c;
      width: 100%;
      border-radius: 25px 0 0 0;
      margin: -5px 0 -27px -8px;

      ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
        display: none;
      `}
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 0 0 25px;
  flex-direction: column;
  align-items: center;

  &:after {
    content: '';
    width: 80%;
    border-right: 3px solid #54478c;
    border-bottom: 3px solid #54478c;
    height: 100px;
    border-radius: 0 0 25px 0;
    align-self: flex-end;
    margin-bottom: -3px;
    margin-top: -100px;
    margin-right: -3px;

    ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
        display: none;
    `}
  }
`;

const ProjectImageContainer = styled.div`
  order: 1;
  width: calc(100% - 4px);
  align-self: center;
  margin: 5px 0;
  min-height: 80px;
  flex: 0 5000 auto;
  background-color: black;
  border: 3px solid #54478c;
  overflow: hidden;
  border-radius: 25px;
  box-sizing: border-box;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
      order: 2;
      flex: 0 0 calc(50% - 5px);
      align-self: unset;
      margin: unset;
      height: 85%;
      margin: 5px 5px 5px 0;
  `}
`;

// styles assigned on Img jsx element
// https://github.com/gatsbyjs/gatsby/discussions/28212
// const ProjectImage = styled(Img)<{ fluid: FluidObject | FluidObject[] }>`
//   height: 100%
// `;

const TimelineSquaresContainer = styled.button`
  order: 3;
  width: 76px;
  height: 76px;
  align-self: center;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 8px solid #54478c;
  background-color: ${({ theme }) => theme.colors.whiteTint};
  margin-top: -8px;
  border-radius: 50%;

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    align-self: unset;
    margin: unset;
    position: absolute;
    bottom: -38px;
    left: calc(50% - 38px);
  `}

  &:hover,
  &:focus {
    outline: none;
    border-width: 0px;
    transition: border-width 1s;

    & > div {
      background-color: ${({ theme }) => theme.timelineColors.colorOne};
      color: ${({ theme }) => theme.colors.whiteTint};
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

  ${({ theme }) => theme.breakpoints.for4TabletLandscapeUp()`
    bottom: calc(50% - 5px);
  `}
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

  const createUpperOrLowerContainers = ({ title, description, image, id }: Project, i: number) => {
    return (
      <UpperOrLowerContainer
        key={id}
        className={`${i % 2 === 0 ? 'UpperContainer' : 'LowerContainer'}`}
      >
        <TitleDescriptionContainer>
          <TitleContainer>
            <h2>{title}</h2>
          </TitleContainer>
          <p>{description}</p>
        </TitleDescriptionContainer>
        <ProjectImageContainer>
          <Img
            fluid={image}
            imgStyle={{ objectFit: 'cover', objectPosition: '50% 0%' }}
            style={{ height: '100%', width: '100%' }}
          />
        </ProjectImageContainer>
        <TimelineSquaresContainer>
          <TimelineSquare>View</TimelineSquare>
        </TimelineSquaresContainer>
      </UpperOrLowerContainer>
    );
  };

  // create timeline callback
  const createTimeline = useCallback(() => {
    const tArray = [];

    for (let i = 0; i < projects.length; i += 1) {
      if (timelineOuterContainerRef.current.offsetWidth >= 700) {
        if (i % 2 === 0) {
          tArray.push(createUpperOrLowerContainers(projects[i], i));
        } else {
          tArray.push(createUpperOrLowerContainers(projects[i], i));
        }
      } else {
        tArray.push(createUpperOrLowerContainers(projects[i], i));
      }
    }

    setTimelineArray(tArray);

    // store width of timeline container
    setTimelineWidth(timelineInnerContainerRef.current.getBoundingClientRect().width);

    // store width of each project that is part of the timeline
    // probably an easier way to get the width percentage I set in the styled-component
    // only two values as of now, and it was fluctuating between 64 and 65 percent, so I just
    // hard assigned 65 percent if it wasn't equal to 100 percent. 100 percent being for mobile.
    setTimelineProjectWidth(
      (timelineInnerContainerRef.current.children[0].getBoundingClientRect().width /
        timelineInnerContainerRef.current.getBoundingClientRect().width) *
        100 ===
        100
        ? 100
        : 65,
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
    if (e.deltaY > 0) timelineOuterContainerRef.current.scrollLeft += 15;
    else timelineOuterContainerRef.current.scrollLeft -= 15;
  };

  // set timeline-line width based on number of children of inner container
  useEffect(() => {
    setTimelineProjectCount(timelineInnerContainerRef.current.children.length - 1);
  }, [timelineProjectCount]);

  return (
    <TimelineOuterContainer onWheel={handleWheel} ref={timelineOuterContainerRef}>
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
