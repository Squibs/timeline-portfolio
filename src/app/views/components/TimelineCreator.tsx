import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { useScrollHook } from '../hooks';
import { Breakpoints, TimelineColors, Colors } from '../shared';
import { AppState } from '../../state/store';
import { timelineOperations } from '../../state/ducks/timeline';
import { Project } from '../../state/ducks/timeline/types';

/* -------------------------------------------------------------------------- */
/*                           styled components types                          */
/* -------------------------------------------------------------------------- */

type TimelineColor = {
  timelineColor: string;
};

type UpperOrLowerContainerProps = TimelineColor & { timelineFontColor: string };

type TitleDescriptionContainerProps = TimelineColor;

type TitleContainerProps = TimelineColor & { timelineFontColor: string };

type DescriptionContainerProps = TimelineColor;

type ProjectImageContainerProps = TimelineColor;

type TimelineSquaresContainerProps = TimelineColor & { timelineFontColor: string };

/* -------------------------------------------------------------------------- */
/*                                   styles                                   */
/* -------------------------------------------------------------------------- */

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
  outline: none;

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
      font-size: 18px;
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
    & > div:not(:first-child):not(:last-child) {
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

  .selected-project {
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

  @media screen and (min-width: 900px) and (min-height: 650px) {
    flex-direction: row;
    height: 50%;
    flex: 0 0 65%;
  }

  // I believe this was potentially tablets in portrait mode, but this has been causing layout issues
  /* @media screen and (max-width: 1200px) and (min-height: 1200px) {
    flex-direction: row;
    height: 50%;
    flex: 0 0 85%;
  } */

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
    height: 120px;
    border-radius: 0 0 25px 0;
    align-self: flex-end;
    margin-bottom: -3px;
    margin-top: -120px;
    margin-right: -3px;

    @media screen and (min-width: 900px) and (min-height: 650px) {
      display: none;
    }
  }
`;

const DescriptionContainer = styled.div<DescriptionContainerProps>`
  border-left: 3px solid ${(props) => props.timelineColor};
  border-radius: 25px 0 0 0;
  margin: 0 10px 0 -3px;
  flex: 1;
  min-height: 25px;
  display: flex;
  flex-direction: column;
  padding: 5px;

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
  min-height: 76px;
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
  border-image-slice: 100 0 0 0;
  border-image-width: 20px 0px 0px 0px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: repeat stretch;
  border-image-source: url('data:image/png;base64,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');
  border-top: 10px dotted #c4c4c4; // backup incase border-image fails

  position: absolute;
  left: 0;
  bottom: 38px;
  z-index: -1; // send behind everything else in the timeline
  // width set programmatically similar to the following; to adjust go to jsx element
  /* width: calc((100% * (INNER-CONTAINER-NUMBER-OF-CHILDREN - 1)) - 20px); */

  @media screen and (min-width: 900px) and (min-height: 650px) {
    bottom: calc(50% - 5px);
  }
`;

/* -------------------------------------------------------------------------- */
/*                               component types                              */
/* -------------------------------------------------------------------------- */

type TimelineCreatorProps = {
  chevronRef: React.RefObject<HTMLDivElement>;
  handleScrollTutorial: () => void;
};

type Props = TimelineCreatorProps;

/* -------------------------------------------------------------------------- */
/*                                  component                                 */
/* -------------------------------------------------------------------------- */

const TimelineCreator = ({ chevronRef, handleScrollTutorial }: Props): JSX.Element => {
  const timelineOuterContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const timelineInnerContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const timelineSquaresContainerRefs = React.useRef([]);
  const [timelineArray, setTimelineArray] = useState<JSX.Element[]>([]);
  const [timelineProjectCount, setTimelineProjectCount] = useState<number>();
  const handleScroll = useScrollHook(timelineOuterContainerRef);
  const [scrollAmount, setScrollAmount] = useState<number>(0);
  const { selectedProject, projectsToDisplay } = useSelector(
    ({ timeline: { timeline } }: AppState) => ({
      selectedProject: timeline.selectedProject,
      projectsToDisplay: timeline.projectsToDisplay,
    }),
  );
  const dispatch = useDispatch();
  const [pageIsTransitioningFlag, setPageIsTransitioningFlag] = useState(false);

  /* ------------------------- create timeline helpers ------------------------ */

  // project link handling
  const handleProjectViewButton = useCallback(
    (projectLink: string) => {
      // store project link; controls if element gets the .selected-project css class, as well as the button inner text
      // used in createTimeline()
      dispatch(timelineOperations.projectSelect(projectLink));

      // reference to the anchor link inside of the custom GatsbyLink/chevron navigation
      const button = chevronRef.current?.children[0] as HTMLElement;

      // slight delay, incase of scrolling
      setTimeout(() => {
        button.click();
      }, 500);
    },
    [chevronRef, dispatch],
  );

  // create timeline callback
  const createTimeline = useCallback(() => {
    const tArray = [];

    const createUpperOrLowerContainers = (
      { title, description, image, id, projectLink }: Project,
      i: number,
    ) => {
      let upperOrLower;

      // 900 x 650 viewport equivalent (have media queries that shrink )
      if (
        timelineOuterContainerRef.current.offsetWidth >= 748 &&
        timelineOuterContainerRef.current.offsetHeight >= 480
      ) {
        if (i % 2 === 0) upperOrLower = 'UpperContainer';
        else upperOrLower = 'LowerContainer';
      } else {
        upperOrLower = 'UpperContainer';
      }

      // old:
      // keep j within (1 - 12) range; repeats if it goes higher than 12.
      // used to repeat timeline color pattern
      // const j = (i % 12) + 1;

      // new:
      // j raises from 1 to 12 then lowers from 12 to 1 without repeating any numbers
      // figured out equation after messing around with the equation from:
      // https://stackoverflow.com/a/64661265/15020999
      const j = -Math.abs((i % (11 * 2)) - 11) + 12;

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
          timelineFontColor={lightOrDarkFont}
          css={`
            ${upperOrLower === 'UpperContainer' &&
            `
              @media screen and (min-width: 900px) and (min-height: 650px) {
                & > div:first-child > div:last-child {
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

                  & > div:first-child {
                    border-bottom: 3px solid ${roygbiv};
                    border-left: 3px solid ${roygbiv};
                  }

                  & > div:last-child {
                    border-left: 0;
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
            <DescriptionContainer timelineColor={roygbiv}>
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </DescriptionContainer>
          </TitleDescriptionContainer>
          <ProjectImageContainer timelineColor={roygbiv}>
            <Img
              fluid={image}
              imgStyle={{ objectFit: 'cover', objectPosition: '50% 0%' }}
              style={{ height: '100%', width: '100%' }}
            />
          </ProjectImageContainer>
          <TimelineSquaresContainer
            timelineColor={roygbiv}
            timelineFontColor={lightOrDarkFont}
            onClick={() => handleProjectViewButton(projectLink)}
            ref={timelineSquaresContainerRefs.current[i]}
            className={`${projectLink === selectedProject ? 'selected-project' : ' '}`}
          >
            <TimelineSquare>
              {`${projectLink === selectedProject ? 'Selected' : 'View'}`}
            </TimelineSquare>
          </TimelineSquaresContainer>
        </UpperOrLowerContainer>
      );
    };

    for (let i = 0; i < projectsToDisplay.length; i += 1) {
      tArray.push(createUpperOrLowerContainers(projectsToDisplay[i], i));
    }

    setTimelineArray(tArray);
  }, [handleProjectViewButton, projectsToDisplay, selectedProject]);

  // update createTimeline on window resize, if too small, only upper timeline points
  useEffect(() => {
    window.addEventListener('resize', createTimeline);

    return () => {
      window.removeEventListener('resize', createTimeline);
    };
  }, [createTimeline, projectsToDisplay, timelineArray]);

  // call createTimeline on mount
  useEffect(() => {
    createTimeline();
  }, [createTimeline]);

  /* ------------------- get amount of projects in timeline ------------------- */

  // set timeline-line width based on number of children of inner container
  useEffect(() => {
    setTimelineProjectCount(timelineInnerContainerRef.current.children.length - 1);
  }, [timelineProjectCount]);

  /* ------------------------ scroll selected element into view ------------------------ */

  useEffect(() => {
    const {
      current: { children },
    } = timelineOuterContainerRef;

    // loops through the outer container children
    for (let i = 0; i < children[0].children.length; i += 1) {
      // if child contains a button (anything but the timeline line)
      if (children[0].children[i].children[2]) {
        // if the button contains the .selected-project css class
        if (children[0].children[i].children[2].classList.contains('selected-project')) {
          // calculate container width that is set in css (100% or 65%), then assign suitable equation to scroll element into view
          let containerOffset;
          if (
            timelineOuterContainerRef.current.clientWidth === children[0].children[i].clientWidth
          ) {
            containerOffset = children[0].getBoundingClientRect().width * i;
          } else {
            containerOffset =
              children[0].getBoundingClientRect().width * 0.4 * i -
              children[0].getBoundingClientRect().width * 0.25;
          }

          // scroll element into view smoothly
          timelineOuterContainerRef.current.scrollTo({
            behavior: `${pageIsTransitioningFlag ? 'smooth' : 'auto'}` as ScrollBehavior,
            top: 0,
            left: containerOffset,
          });
        }
      }
    }
  }, [pageIsTransitioningFlag, timelineArray]);

  // delay smooth scroll on page load
  useLayoutEffect(() => {
    setTimeout(() => setPageIsTransitioningFlag(true), 1000);
  }, []);

  /* ----------------------- handle mouse drag to scroll ---------------------- */

  // https://stackoverflow.com/a/60218693/15020999

  let mouseIsDown = false;
  const pos = { top: 0, left: 0, x: 0, y: 0, velX: 0, velY: 0 };
  let momentumID = 0;

  const momentumLoop = () => {
    // apply velocity to the current scroll position
    timelineOuterContainerRef.current.scrollLeft += pos.velX;
    timelineOuterContainerRef.current.scrollTop += pos.velY;

    // slow the velocity
    pos.velX *= 0.95;
    pos.velY *= 0.95;

    // if the scrollbar is still moving, reiterate over this function
    if (Math.abs(pos.velX) > 2) {
      momentumID = requestAnimationFrame(momentumLoop);
    }
  };

  const cancelMomentumTracking = () => {
    cancelAnimationFrame(momentumID);
  };

  const beginMomentumTracking = () => {
    cancelMomentumTracking();
    momentumID = requestAnimationFrame(momentumLoop);
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    mouseIsDown = true;

    // cancel any momentum
    pos.velX = 0;
    pos.velY = 0;

    // change the cursor and prevent user from selecting the text
    timelineOuterContainerRef.current.style.cursor = 'grabbing';
    timelineOuterContainerRef.current.style.userSelect = 'none';

    // store x values / scrollLeft
    pos.x = e.pageX - timelineOuterContainerRef.current.offsetLeft; // startX
    pos.left = timelineOuterContainerRef.current.scrollLeft; // scrollLeft

    // store y values / scrollTop
    pos.y = e.pageY - timelineOuterContainerRef.current.offsetTop;
    pos.top = timelineOuterContainerRef.current.scrollTop;

    cancelMomentumTracking();
  };

  const mouseUpOrLeaveHandler = (e: React.MouseEvent) => {
    mouseIsDown = false;

    // switch back to default grab cursor
    timelineOuterContainerRef.current.style.cursor = 'grab';
    timelineOuterContainerRef.current.style.removeProperty('user-select');

    // start momentum when mouse is released, but not when mouse leaves timeline container
    if (e.type === 'mouseup') {
      beginMomentumTracking();
    }
  };

  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (!mouseIsDown) return;
    e.preventDefault();

    // handle scrolling on x axis / scrollLeft
    const tempX = e.pageX - timelineOuterContainerRef.current.offsetLeft;
    const walkX = (tempX - pos.x) * 2; // scroll speed with cursor x axis / scrollLeft
    const prevScrollLeft = timelineOuterContainerRef.current.scrollLeft;
    timelineOuterContainerRef.current.scrollLeft = pos.left - walkX;

    // handle scrolling on y axis / scrollTop
    const tempY = e.pageY - timelineOuterContainerRef.current.offsetTop;
    const walkY = (tempY - pos.y) * 2; // scroll speed with cursor y axis / scrollTop
    const prevScrollTop = timelineOuterContainerRef.current.scrollTop;
    timelineOuterContainerRef.current.scrollTop = pos.top - walkY;

    // compare change in position to figure out drag speed
    pos.velX = timelineOuterContainerRef.current.scrollLeft - prevScrollLeft;
    pos.velY = timelineOuterContainerRef.current.scrollTop - prevScrollTop;

    // adjust drag speed / initial momentum (was low with default values)
    const velocityAdjustment = Math.min(
      timelineOuterContainerRef.current.getBoundingClientRect().width * 0.03,
      30,
    );

    if (Math.sign(pos.velX) > 0 && pos.velX > 5) pos.velX += velocityAdjustment;
    else if (Math.sign(pos.velY) > 0 && pos.velY > 5) pos.velY += velocityAdjustment;
    else if (Math.sign(pos.velX) < 0 && pos.velX < -5) pos.velX -= velocityAdjustment;
    else if (Math.sign(pos.velY) < 0 && pos.velY < -5) pos.velY -= velocityAdjustment;
  };

  /* ---------------------------- handle mousewheel --------------------------- */

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // cancel momentum from mouse dragging
    cancelMomentumTracking();

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

  /* ------------------------- allow keyboard controls ------------------------ */

  // focus the timeline outer container for immediate use of keyboard navigation
  useLayoutEffect(() => {
    timelineOuterContainerRef.current.tabIndex = -1;
    timelineOuterContainerRef.current.autofocus = true;
    timelineOuterContainerRef.current.focus();
  }, []);

  // width of a single project on the timeline
  const projectWidth =
    timelineOuterContainerRef.current &&
    timelineOuterContainerRef.current.children[0].children[0].scrollWidth;

  // width percentage of a single project on the timeline rounded to 2 decimal places
  // mobile: 100%/1, everything else: 65%/0.65
  const projectWidthPercentage =
    timelineOuterContainerRef.current &&
    Math.round(
      (projectWidth / timelineOuterContainerRef.current.children[0].getBoundingClientRect().width) *
        1e2,
    ) / 1e2;

  // number of total projects on the timeline (-1 due to timeline line [dotted line])
  const numProjects =
    timelineOuterContainerRef.current &&
    timelineOuterContainerRef.current.children[0].childElementCount - 1;

  // width of the entire timeline that scrolls (innerContainerRef.current.scrollWidth is incorrect)
  const timelineWidth =
    projectWidthPercentage === 1
      ? projectWidth * numProjects - projectWidth
      : projectWidth * numProjects * 0.65 * 0.75 + projectWidth * 0.75 + 40;

  // width of the container/view of the timeline
  const timelineContainerWidth =
    timelineOuterContainerRef.current &&
    timelineOuterContainerRef.current.getBoundingClientRect().width;

  // keys that needed reworking for horizontal scrolling
  const onKeyDownKeys: { [key: string]: () => void } = {
    ' ': () => setScrollAmount((prevValue) => prevValue + timelineContainerWidth),
    PageUp: () => setScrollAmount((prevValue) => prevValue - timelineContainerWidth),
    PageDown: () => setScrollAmount((prevValue) => prevValue + timelineContainerWidth),
    Home: () => setScrollAmount(0),
    End: () => setScrollAmount(timelineWidth),
  };

  // don't allow control scroll variable (scrollAmount [as local state]) to go below 0 or higher than timelineWidth
  useLayoutEffect(() => {
    if (timelineOuterContainerRef.current)
      if (scrollAmount > timelineWidth) setScrollAmount(timelineWidth);
      else if (scrollAmount < 0) setScrollAmount(0);
  }, [scrollAmount, timelineWidth]);

  // scrolls when scrollAmount (state variable) updates, which is updated off of onKeyDown(s) on TimelineOuterContainer
  useEffect(() => {
    if (timelineOuterContainerRef)
      timelineOuterContainerRef.current.scrollTo({
        behavior: 'smooth',
        left: scrollAmount,
      });
  }, [scrollAmount]);

  /* ---------------------------- component return ---------------------------- */

  return (
    <TimelineOuterContainer
      onWheel={handleWheel}
      ref={timelineOuterContainerRef}
      onMouseDown={mouseDownHandler}
      onMouseLeave={mouseUpOrLeaveHandler}
      onMouseUp={mouseUpOrLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onScroll={() => {
        handleScroll();
        handleScrollTutorial();
      }}
      className="page-content-styles"
      onKeyDown={({ key }) => {
        return onKeyDownKeys[key] && onKeyDownKeys[key]();
      }}
    >
      <TimelineInnerContainer ref={timelineInnerContainerRef}>
        {timelineArray}
        <TimelineLine
          css={`
            width: calc(100% * ${timelineProjectCount});
            @media screen and (min-width: 900px) and (min-height: 650px) {
              // close enough to the correct equation
              width: calc(((100% * 0.4) * ${timelineProjectCount}) + (25%));
            }
          `}
        />
      </TimelineInnerContainer>
    </TimelineOuterContainer>
  );
};

export default TimelineCreator;
