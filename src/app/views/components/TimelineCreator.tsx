import React, { useCallback, useEffect, useRef, useState } from 'react';
import Img, { FluidObject } from 'gatsby-image';
import styled from 'styled-components';

/* --------------------------------- styles --------------------------------- */

// used mainly to hide scrollbar
const TimelineOuterContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;

  h2 {
    font-size: 28px;
  }

  .UpperOrLowerContainer {
    display: flex;
    flex: 0 0 100vw;
    width: 100vw;
  }
`;

const TimelineInnerContainer = styled.div`
  display: inline-flex;
  height: 100%;
  position: relative;
`;

const TimelineProjectUpperContainer = styled.div`
  align-items: flex-start;
`;

const TimelineProjectLowerContainer = styled.div`
  align-items: flex-end;
`;

const TitleDescriptionContainer = styled.div`
  width: 50%;
`;

const TitleContainer = styled.div``;

const ProjectImageContainer = styled.div`
  width: 50%;
`;

// https://github.com/gatsbyjs/gatsby/discussions/28212
const ProjectImage = styled(Img)<{ fluid: FluidObject | FluidObject[] }>``;

const TimelineSquaresContainer = styled.div`
  display: none;
`;

const TimelineSquare = styled.div``;

const TimelineLine = styled.div`
  height: 0px;
  border: 10px dashed red;
  position: absolute;
  top: 50%;
  width: calc(100% - 20px);
  z-index: -1;
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
  const timelineContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
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
          <TimelineSquare />
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

  const createTimeline = useCallback(() => {
    const tArray = [];
    // setTimelineArray([]);

    for (let i = 0; i < projects.length; i += 1) {
      if (timelineContainerRef.current.offsetHeight >= 550) {
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

  // call createTimeline on mount
  useEffect(() => {
    createTimeline();
  }, [createTimeline]);

  // update createTimeline on window resize, if too small, only upper timeline points
  useEffect(() => {
    window.addEventListener('resize', createTimeline);

    return () => {
      window.removeEventListener('resize', createTimeline);
    };
  }, [createTimeline, projects, timelineArray]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // timelineContainerRef.current.scrollLeft += timelineContainerRef.current.clientWidth;
    if (e.deltaY > 0) timelineContainerRef.current.scrollLeft += 15;
    else timelineContainerRef.current.scrollLeft -= 15;
  };

  return (
    <TimelineOuterContainer onWheel={handleWheel} ref={timelineContainerRef}>
      <TimelineInnerContainer>
        {timelineArray}
        <TimelineLine />
      </TimelineInnerContainer>
    </TimelineOuterContainer>
  );
};

export default TimelineCreator;
