import React from 'react';
import Img from 'gatsby-image';

/* ---------------------------------- types --------------------------------- */

type Project = {
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
  const createUpperTimelinePoint = ({ title, description, image }: Project): JSX.Element => {
    return (
      <>
        <h1>{title}</h1>
        <p>{description}</p>
        <Img fluid={image} />
      </>
    );
  };

  const createLowerTimelinePoint = ({ title, description, image }: Project): JSX.Element => {
    return (
      <>
        <h1>{title}</h1>
        <p>{description}</p>
        <Img fluid={image} />
      </>
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

  return <>{createTimeline()}</>;
};

export default TimelineCreator;
