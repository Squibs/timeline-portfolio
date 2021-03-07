import React, { useRef } from 'react';
import Img, { FluidObject } from 'gatsby-image';
import styled from 'styled-components';

/* --------------------------------- styles --------------------------------- */

const TimelineContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: center;
`;

const TimelineProjectUpperContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
`;

const TimelineProjectLowerContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
`;

const TitleDescriptionContainer = styled.div`
  width: 50%;
  height: 40%;
  position: relative;
  padding-top: 35px;

  h2 {
    background-color: blue;
    width: 90%;
    font-size: 20px;
    border-radius: 25px 25px 0 0;
  }

  p {
    padding: 15px;
  }
`;

const TitleContainer = styled.div`
  border-bottom: 5px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;

  & > h2 {
    margin: 0;
  }
`;

const ProjectImageContainer = styled.div`
  width: 50%;
  height: 40%; // min 50% or fit-content not working
  border-radius: 25px;
  border: 3px solid blue;
  overflow: hidden;
  z-index: 1;
`;

// https://github.com/gatsbyjs/gatsby/discussions/28212
const ProjectImage = styled(Img)<{ fluid: FluidObject | FluidObject[] }>``;

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

  const createUpperTimelinePoint = ({ title, description, image, id }: Project): JSX.Element => {
    return (
      <TimelineProjectUpperContainer key={id}>
        <TitleDescriptionContainer>
          <TitleContainer>
            <h2>{title}</h2>
          </TitleContainer>
          <p>{description}</p>
        </TitleDescriptionContainer>
        <ProjectImageContainer>
          <ProjectImage fluid={image} />
        </ProjectImageContainer>
      </TimelineProjectUpperContainer>
    );
  };

  const createLowerTimelinePoint = ({ title, description, image, id }: Project): JSX.Element => {
    return (
      <TimelineProjectLowerContainer key={id}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Img fluid={image} />
      </TimelineProjectLowerContainer>
    );
  };

  const createTimeline = () => {
    const timelineArray = [];

    for (let i = 0; i < projects.length; i += 1) {
      if (i % 2 === 0) {
        timelineArray.push(createUpperTimelinePoint(projects[i]));
      } else {
        timelineArray.push(createLowerTimelinePoint(projects[i]));
      }
    }

    return timelineArray;
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0)
      timelineContainerRef.current.scrollLeft += timelineContainerRef.current.clientWidth;
    else timelineContainerRef.current.scrollLeft -= timelineContainerRef.current.clientWidth;
  };

  return (
    <TimelineContainer onWheel={handleWheel} ref={timelineContainerRef}>
      {createTimeline()}
    </TimelineContainer>
  );
};

export default TimelineCreator;
