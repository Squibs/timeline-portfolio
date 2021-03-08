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
  padding-left: 200px;
  padding-top: 20px;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
  justify-content: flex-end;
  max-width: 1200px;

  & > div > p {
    border-left: 3px dashed red;
    border-top: 3px solid orange;
    border-radius: 25px 0 0 0;
  }
`;

const TimelineProjectLowerContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  align-content: flex-start;
  padding-left: 200px;
  padding-bottom: 20px;
  position: relative;
  flex-wrap: wrap-reverse;
  max-width: 1200px;

  & > div:first-child > div {
    border-left: 3px dashed purple;
    border-bottom: 3px solid turquoise;
    padding-top: 10%;
  }
`;

const TitleDescriptionContainer = styled.div`
  /* width: 50%; */
  height: 40%;
  position: relative;
  padding-top: 35px; // title pushed down on all, overridden in lower container &>div:f-c>div
  flex: 0 1 calc(50% - 3px); // 3 px half (one-side) of border surrounding image

  h2 {
    background-color: blue;
    width: 90%;
    font-size: 20px;
    border-radius: 25px 25px 0 0;
    margin: 0;
  }

  p {
    padding: 15px;
    margin: 0;
    height: 100%;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  border-radius: 0 0 0 25px;

  & > h2 {
    margin: 0;
  }
`;

const ProjectImageContainer = styled.div`
  /* width: 50%; */
  height: 35%; // min 50% or fit-content not working
  border-radius: 25px;
  border: 3px solid blue;
  overflow: hidden;
  z-index: 1;
  flex: 0 1 calc(50% - 3px); // 3 px half (one-side) of border surrounding image
`;

// https://github.com/gatsbyjs/gatsby/discussions/28212
const ProjectImage = styled(Img)<{ fluid: FluidObject | FluidObject[] }>``;

const TimelineSquaresContainer = styled.div`
  width: calc(100% - 125px);
  height: 50%;
  height: fit-content;
  display: flex;
  position: absolute;
  top: calc(50% - 15px);
  justify-content: space-between;
  /* left: calc(-85% + 238px); // 200px padding on each project container + half of square width + maybe 3-6px border from image */
  left: calc(125px + 38px);
`;

// for when in main main container
// const TimelineSquaresContainer = styled.div`
//   /* left: calc(-85% + 238px); // 200px padding on each project container + half of square width + maybe 3-6px border from image */
//   position: absolute;
//   display: flex;
//   width: calc((100% * 3) + (200px * 3));
//   flex-shrink: 0;
//   justify-content: space-between;
// `;

const TimelineSquare = styled.div`
  height: 75px;
  width: 75px;
  content: '';
  background-color: pink;
  box-shadow: inset 0 0 10px green;
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
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
        </TimelineSquaresContainer>
      </TimelineProjectUpperContainer>
    );
  };

  const createLowerTimelinePoint = ({ title, description, image, id }: Project): JSX.Element => {
    return (
      <TimelineProjectLowerContainer key={id}>
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
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
          <TimelineSquare />
        </TimelineSquaresContainer>
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
    // if (e.deltaY > 0)
    //   timelineContainerRef.current.scrollLeft += timelineContainerRef.current.clientWidth;
    // else timelineContainerRef.current.scrollLeft -= timelineContainerRef.current.clientWidth;
    if (e.deltaY > 0) timelineContainerRef.current.scrollLeft += 15;
    else timelineContainerRef.current.scrollLeft -= 15;
  };

  return (
    <TimelineContainer onWheel={handleWheel} ref={timelineContainerRef}>
      {createTimeline()}
    </TimelineContainer>
  );
};

export default TimelineCreator;
