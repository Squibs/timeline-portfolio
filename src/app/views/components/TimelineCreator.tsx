import React, { useCallback, useEffect, useRef, useState } from 'react';
import Img, { FluidObject } from 'gatsby-image';
import styled from 'styled-components';

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

// TODO; FIX SCROLLBAR FOR FIREFOX RIGHT NOW IT'S INVISIBLE, DUE TO GLOBAL STYLES

const TimelineInnerContainer = styled.div`
  height: 100%;
  display: flex;
  position: relative;

  .UpperOrLowerContainer {
    display: flex;
    flex: 0 0 100%;
    flex-direction: column;
  }
`;

const TimelineProjectUpperContainer = styled.div`
  align-items: flex-start;

  & > div > p {
    border-left: 3px solid #54478c;
    border-radius: 25px 0 0 0;
    margin-right: 10px;
    flex: 1;
    min-height: 25px;
    display: flex;
    flex-direction: column;

    &:before {
      content: '';
      height: 30px;
      margin-top: -5px;
      margin-bottom: -27px;
      border-top: 3px solid #54478c;
      width: 100%;
      border-radius: 25px 0 0 0;
      margin-left: -6px;
    }
  }

  &:after {
    order: 2;
    content: '';
    width: calc(50% - 13px);
    height: 10px;
    border-radius: 0 0 0 25px;
    border-bottom: 3px solid #54478c;
    border-left: 3px solid #54478c;
    margin-right: 50%;
    margin-left: 5px;
  }
`;

const TimelineProjectLowerContainer = styled.div`
  align-items: flex-end;
`;

const TitleDescriptionContainer = styled.div`
  order: 2;
  margin-top: 5px;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: calc(100% - 10px);
  margin-left: auto;
  margin-right: auto;
  flex: 1 1 auto;
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
  }
`;

const ProjectImageContainer = styled.div`
  order: 1;
  border-radius: 25px;
  border: 3px solid #54478c;
  overflow: hidden;
  width: calc(100% - 10px);
  align-self: center;
  margin: 5px 0;
  background-color: black;
  min-height: 80px;
  flex: 0 100 auto;
`;

// https://github.com/gatsbyjs/gatsby/discussions/28212
const ProjectImage = styled(Img)<{ fluid: FluidObject | FluidObject[] }>``;

const TimelineSquaresContainer = styled.div`
  order: 3;
  width: 50px;
  flex: 0 0 50px;
  position: relative;
  align-self: center;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 10px solid #54478c;
  margin-top: -8px;
  border-radius: 50%;
`;

const TimelineSquare = styled.button`
  border: none;
  width: 44px;
  height: 44px;
  background-color: #c4c4c4;
  padding: 0;
  border-radius: 50%;
  font-family: 'Bitter', sans-serif;
`;

const TimelineLine = styled.div`
  border-top: 10px dotted #c4c4c4;
  position: absolute;
  bottom: 34px;
  z-index: -1;
  // width set programmatically similar to the following; to adjust go to jsx element
  /* width: calc((100% * (INNER-CONTAINER-NUMBER-OF-CHILDREN - 1)) - 20px); */
`;

/* ---------------------------------- types --------------------------------- */

type Project = {
  title: string;
  description: string;
  id: string;
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
  const [timelineLineWidth, setTimelineLineWidth] = useState<number>();

  const createUpperTimelinePoint = ({ title, description, image, id }: Project): JSX.Element => {
    return (
      <TimelineProjectUpperContainer key={id} className="UpperOrLowerContainer">
        <TitleDescriptionContainer>
          <TitleContainer>
            <h2>{title}</h2>
          </TitleContainer>
          <p>{description}</p>
        </TitleDescriptionContainer>
        <ProjectImageContainer>
          <ProjectImage fluid={image} />
        </ProjectImageContainer>
        <TimelineSquaresContainer>
          <TimelineSquare>View</TimelineSquare>
        </TimelineSquaresContainer>
      </TimelineProjectUpperContainer>
    );
  };

  const createLowerTimelinePoint = ({ title, description, image, id }: Project): JSX.Element => {
    return (
      <TimelineProjectLowerContainer key={id} className="UpperOrLowerContainer">
        <TitleDescriptionContainer>
          <TitleContainer>
            <h2>{title}</h2>
          </TitleContainer>
          <p>{description}</p>
        </TitleDescriptionContainer>
        <ProjectImageContainer>
          <ProjectImage fluid={image} />
        </ProjectImageContainer>
        <TimelineSquaresContainer>
          <TimelineSquare />
        </TimelineSquaresContainer>
      </TimelineProjectLowerContainer>
    );
  };

  // set timeline-line width based on number of children of inner container
  useEffect(() => {
    setTimelineLineWidth(timelineInnerContainerRef.current.children.length - 1);
  }, [timelineLineWidth]);

  // create timeline callback
  const createTimeline = useCallback(() => {
    const tArray = [];

    for (let i = 0; i < projects.length; i += 1) {
      if (timelineOuterContainerRef.current.offsetWidth >= 700) {
        if (i % 2 === 0) {
          tArray.push(createUpperTimelinePoint(projects[i]));
        } else {
          tArray.push(createLowerTimelinePoint(projects[i]));
        }
      } else {
        tArray.push(createUpperTimelinePoint(projects[i]));
      }
    }

    setTimelineArray(tArray);
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
  }, [createTimeline]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // timelineOuterContainerRef.current.scrollLeft += timelineOuterContainerRef.current.clientWidth;
    if (e.deltaY > 0) timelineOuterContainerRef.current.scrollLeft += 15;
    else timelineOuterContainerRef.current.scrollLeft -= 15;
  };

  return (
    <TimelineOuterContainer onWheel={handleWheel} ref={timelineOuterContainerRef}>
      <TimelineInnerContainer ref={timelineInnerContainerRef}>
        {timelineArray}
        <TimelineLine style={{ width: `calc((100% * ${timelineLineWidth}) - 20px)` }} />
      </TimelineInnerContainer>
    </TimelineOuterContainer>
  );
};

export default TimelineCreator;
