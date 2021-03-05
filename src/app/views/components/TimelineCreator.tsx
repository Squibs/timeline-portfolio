import React, { useRef } from 'react';
import Img from 'gatsby-image';
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
`;

const TimelineProjectLowerContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
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

  const createUpperTimelinePoint = ({ title, description, image, id }: Project): JSX.Element => {
    return (
      <TimelineProjectUpperContainer key={id}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Img fluid={image} />
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
