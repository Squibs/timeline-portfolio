import React, { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { BorderContainer, ChevronLink, TimelineCreator } from '../components';
import { Colors } from '../shared';
import { AppState } from '../../state/store';
import { useSelectedProjectHook } from '../hooks';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  overflow: hidden;
`;

const ContentContainer = styled.main`
  outline: none;
  color: ${({ theme }) => theme.colors.primaryDark};
  p {
    font-weight: 400;
  }

  display: flex;
  flex-direction: column;
  max-width: 1800px;
  width: calc(100% - 85px);

  ${({ theme }) => theme.breakpoints.for6BigDesktopUp()`
    justify-content: center;
  `}

  @media screen and (min-height: 750px) {
    width: calc(100% - 100px);
  }

  @media screen and (min-height: 800px) and (min-width: 750px) {
    width: calc(100% - 140px);
  }

  h1 {
    margin: 10px 0;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-height: 800px) {
      font-size: 30px;
    }
  }
`;

const TimelineContainer = styled.div`
  height: 80%;
  overflow: hidden;
  border-radius: 25px;
  border: 6px solid ${({ theme }) => theme.colors.accentOne};
  z-index: 1; // iOS fix
  margin-bottom: 10px;
  max-height: 1200px;
  position: relative;
  box-shadow: 0px 4px 6px black;

  ${({ theme }) => theme.breakpoints.for6BigDesktopUp()`
    width: 90vw;
    align-self: center;
  `}

  @media screen and (min-height: 1800px) {
    margin-bottom: 5vh;
  }
`;

// mask over entire TimelineContainer so that box shadow will cast on scrolling elements instead of just background
const ShadowMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 18px;

  pointer-events: none; /* allow clicks to pass through */

  box-shadow: 0 0 10px black inset;
  box-shadow: ${({ theme }) => theme.reusedCSS.boxShadow};
`;

const BlobContainer = styled.div`
  height: 80%;
  z-index: -1;
  margin-bottom: 10px;
  max-height: 1200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  align-self: center;

  & > img {
    transform: rotate(-15deg);
    transform: scale(0.5);
    position: absolute;
    bottom: -160px;
    right: -80px;

    ${({ theme }) => theme.breakpoints.for2SlightlyBiggerPhoneUp()`
      transform: scale(0.7);
    `}

    ${({ theme }) => theme.breakpoints.for5DesktopUp()`
      transform: scale(1);
      bottom: -140px;
      right: -90px;
    `}

    ${({ theme }) => theme.breakpoints.for6BigDesktopUp()`
      right: -110px;
    `}
  }
`;

/* ---------------------------------- types --------------------------------- */

export interface TimelineProps {
  data: {
    images: {
      nodes: [
        {
          id: string;
          base: string;
          publicURL: string;
          childImageSharp: {
            fluid: {
              base64: string;
              aspectRatio: number;
              src: string;
              srcSet: string;
              sizes: string;
            };
          };
        },
      ];
    };

    background: {
      childImageSharp: {
        id: string;
        fixed: {
          src: string;
        };
      };
    };

    projectList: { edges: { node: { frontmatter: { slug: string } } }[] };
  };
}

/* -------------------------------- component ------------------------------- */

const TimelinePage: React.FC<TimelineProps> = ({ data }: TimelineProps) => {
  const chevronLinkRef = useRef<HTMLDivElement>(null);
  const { selectedProject } = useSelector(
    ({ timeline: { timeline } }: AppState) => ({
      selectedProject: timeline.selectedProject,
    }),
    shallowEqual,
  );
  // not sure if this should really be a hook, if I don't need it to return anything
  useSelectedProjectHook();

  const imageSelector = (imgName: string) => {
    return data.images.nodes.filter((node) => node.base === imgName)[0];
  };

  const getChevronElement = () => {
    return chevronLinkRef;
  };

  // check if currently selected project is an actual project with a page, before showing chevron (by passing correct/non-empty link)
  const handleLink = () => {
    if (selectedProject) {
      const projectList = [
        ...data.projectList.edges.map((project) => project.node.frontmatter.slug.slice(9)),
      ];

      for (let i = 0; i < projectList.length; i += 1) {
        if (selectedProject === projectList[i]) {
          return `/project/${selectedProject}`;
        }
      }
    }

    return '';
  };

  return (
    <PageContainer className="page-container-styles">
      <BorderContainer />
      {/* left chevron */}
      <ChevronLink
        fill={Colors.whiteTint}
        hover={Colors.primaryDark}
        position="left"
        link={`${selectedProject ? `/?project=${selectedProject}` : '/'}`}
        direction="right"
      />
      {/* right chevron */}
      <ChevronLink
        fill={Colors.whiteTint}
        hover={Colors.primaryNeutral}
        position="right"
        link={handleLink()}
        ref={chevronLinkRef}
        direction="left"
      />
      <ContentContainer className="page-content-styles">
        <h1>My Timeline</h1>
        <TimelineContainer
          style={{
            background: `url('${data.background.childImageSharp.fixed.src}')`,
          }}
        >
          <TimelineCreator
            chevronRef={getChevronElement()}
            projects={[
              {
                title: 'Learning To Necro',
                description: `My first steps into web development. While it might not have served a real purpose for players of the game at the time, or even today, I was just happy to have made something that was functional.`,
                image: imageSelector('screenshot-learning-to-necro.png').childImageSharp.fluid,
                id: imageSelector('screenshot-learning-to-necro.png').id,
                projectLink: 'learning-to-necro',
              },
              {
                title: 'Tribute Page',
                description: `The first project I created for freeCodeCamp. A small project to take those first few steps into making something of your own; a tribute page for a person that could be considered influential.`,
                image: imageSelector('screenshot-tribute-page.png').childImageSharp.fluid,
                id: imageSelector('screenshot-tribute-page.png').id,
                projectLink: 'tribute-page',
              },
              {
                title: 'Product Landing Page',
                description: `A page that is meant to accent as well as show off a new product. This was one of the first few freeCodeCamp projects I completed. While the site itself is fairly basic, I just wanted to focus on using various elements such as a video player and an image carousel.`,
                image: imageSelector('screenshot-product-landing-page.png').childImageSharp.fluid,
                id: imageSelector('screenshot-product-landing-page.png').id,
                projectLink: 'product-landing-page',
              },
              {
                title: 'freeCodeCamp Repository',
                description: `The first GitHub repository that I created. This repository is dedicated to everything I have done while going through the freeCodeCamp curriculum. I have loads of notes to myself, as well as my own solutions to the various challenges freeCodeCamp provides to help you learn various aspects of web development, in this repository.`,
                image: imageSelector('screenshot-free-code-camp.png').childImageSharp.fluid,
                id: imageSelector('screenshot-free-code-camp.png').id,
                projectLink: 'free-code-camp',
              },
              {
                title: 'Personal Portfolio',
                description: `An early showcase for the various projects I have created. I started using more responsive design aspects, having different layouts based on screen width. This is the project I wanted to improve upon, while making the site you are currently on.`,
                image: imageSelector('screenshot-personal-portfolio.png').childImageSharp.fluid,
                id: imageSelector('screenshot-personal-portfolio.png').id,
                projectLink: 'personal-portfolio',
              },
              {
                title: 'Old Quote Machine',
                description: `My introduction to working with dynamic content, which is pulled from an API. Displays random quotes, and implements a Tweet button for Twitter. This is a project which I have revisited multiple times.`,
                image: imageSelector('screenshot-quote-machine-old.png').childImageSharp.fluid,
                id: imageSelector('screenshot-quote-machine-old.png').id,
                projectLink: 'quote-machine-old',
              },
              {
                title: 'Local Weather',
                description: `A small webpage that displays your local weather in Fahrenheit or Celsius based off of your browser geolocation. Features a dynamic weather icon, to show weather quickly at a glance. Pulls data from the Dark Sky API, which unfortunately no longer accepts new signups.`,
                image: imageSelector('screenshot-local-weather.png').childImageSharp.fluid,
                id: imageSelector('screenshot-local-weather.png').id,
                projectLink: 'local-weather',
              },
              {
                title: 'Wikipedia Viewer',
                description: `One of the first projects, where I was very pleased with the aesthetics I ended up with. This is a Wikipedia viewer, or an alternative Wikipedia searchbar, that makes use of Wikipedia's fairly simple API.`,
                image: imageSelector('screenshot-wikipedia-viewer.png').childImageSharp.fluid,
                id: imageSelector('screenshot-wikipedia-viewer.png').id,
                projectLink: 'wikipedia-viewer',
              },
              {
                title: 'Technical Documentation',
                description: `For this freeCodeCamp project I was tasked with creating a technical documentation page. I decided to recreate the manual that came with my AMD Ryzen CPU. The navigation contains each heading in order to quickly get to any section.`,
                image: imageSelector('screenshot-technical-documentation.png').childImageSharp
                  .fluid,
                id: imageSelector('screenshot-technical-documentation.png').id,
                projectLink: 'technical-documentation',
              },
              {
                title: 'Twitch Streamers',
                description: `This is a project where I worked with the Twitch API. It displays a list of streamers that can be filtered to show only the ones that are live or the ones that are offline. The Twitch API is constantly changing, so this is now running off of a freeCodeCamp cached pass-through that may show out of date information.`,
                image: imageSelector('screenshot-twitch-streamers.png').childImageSharp.fluid,
                id: imageSelector('screenshot-twitch-streamers.png').id,
                projectLink: 'twitch-streamers',
              },
              {
                title: 'JavaScript Calculator',
                description: `The first project I made that is focused more on JavaScript. Everything could have definitely been improved, but this was my first real steps in trying to make something with JavaScript without really following a specific example.`,
                image: imageSelector('screenshot-js-calculator.png').childImageSharp.fluid,
                id: imageSelector('screenshot-js-calculator.png').id,
                projectLink: 'js-calculator',
              },
              {
                title: 'Pomodoro Clock',
                description: `A clock to help out with maintaining the use of the pomodoro time management technique. Different time intervals can be set for focus time and break time. I took a stab at using JavaScript classes in order to create this project.`,
                image: imageSelector('screenshot-pomodoro-clock.png').childImageSharp.fluid,
                id: imageSelector('screenshot-pomodoro-clock.png').id,
                projectLink: 'pomodoro-clock',
              },
              {
                title: 'Simon Game',
                description: `The classic game of Simon Says. Featuring two different game modes. This is another project, in which I was very pleased with the aesthetics that I created. I was slightly intimidated going into this project, but after doing the JavaScript calculator project, I knew I would be able to figure it out in the end.`,
                image: imageSelector('screenshot-simon-game.png').childImageSharp.fluid,
                id: imageSelector('screenshot-simon-game.png').id,
                projectLink: 'simon-game',
              },
              {
                title: 'Tic Tac Toe',
                description: `A game of Tic-Tac-Toe. Play against a very simple "computer" opponent, or take turns playing locally. I surprised myself making this project, as it took very little time to make, following the Simon Says game I had just previously made.`,
                image: imageSelector('screenshot-tic-tac-toe.png').childImageSharp.fluid,
                id: imageSelector('screenshot-tic-tac-toe.png').id,
                projectLink: 'tic-tac-toe',
              },
              {
                title: 'NMC Janitorial Services',
                description: `The first freelance or professional business website I created for a NMC Commercial Janitorial Services, Inc. A janitorial service company that is based in Washington and has since expanded into Arizona. I gave their website a complete revamp using my own static site boilerplate.`,
                image: imageSelector('screenshot-nmc-janitorial.png').childImageSharp.fluid,
                id: imageSelector('screenshot-nmc-janitorial.png').id,
                projectLink: 'nmc-janitorial',
              },
              {
                title: 'Static Site Boilerplate',
                description: `During the creation of the NMC Janitorial Services project, it was clear to me I needed a way to bundle and deploy the code I was writing. I decided to make a boilerplate to do just that.`,
                image: imageSelector('screenshot-static-site-boilerplate.png').childImageSharp
                  .fluid,
                id: imageSelector('screenshot-static-site-boilerplate.png').id,
                projectLink: 'static-site-boilerplate',
              },
              {
                title: 'Markdown Previewer',
                description: `A fairly basic markdown previewer that I created using React. The use of Marked.js for markdown interpretation and Prism.js for syntax highlighting is what allows this project to exist. This project was more about using and learning more about React than it was anything else. I go back to this project as a reference whenever I need to re-remember anything about markdown.`,
                image: imageSelector('screenshot-markdown-previewer.png').childImageSharp.fluid,
                id: imageSelector('screenshot-markdown-previewer.png').id,
                projectLink: 'markdown-previewer',
              },
              {
                title: 'React Redux Boilerplate',
                description: `I decided since I was moving on from static sites into more dynamic React websites, I would need a new boilerplate. A lot more of learning the behind the scenes of Webpack, React, and Node happened for the creation of this boilerplate.`,
                image: imageSelector('screenshot-react-redux-boilerplate.png').childImageSharp
                  .fluid,
                id: imageSelector('screenshot-react-redux-boilerplate.png').id,
                projectLink: 'react-redux-boilerplate',
              },
              {
                title: 'Wind Home Appliance Repair',
                description: `The second freelance website I created for Wind Home Appliance Repair. For this project, I returned to a static website workflow. I did not have a previous website to reference for content this time around, as I built everything for this site from the ground up for a business that was just starting up. This project will forever be one of my most memorable ones.`,
                image: imageSelector('screenshot-wind-home.png').childImageSharp.fluid,
                id: imageSelector('screenshot-wind-home.png').id,
                projectLink: 'wind-home',
              },
              {
                title: 'Porter Tech',
                description: `A third freelance website I created for Porter Tech, LLC. Another freelance project I did, where the overall design changed quite frequently as I delightedly wanted to meet client requests. A from the ground up project.`,
                image: imageSelector('screenshot-porter-tech.png').childImageSharp.fluid,
                id: imageSelector('screenshot-porter-tech.png').id,
                projectLink: 'porter-tech',
              },
              {
                title: 'Modern React with Redux',
                description: `After taking a small hiatus from working with React and Redux, I wanted a way to get back into it. I decided to take on Stephen Grider's Udemy course <em style="display: inline-flex;">Modern React with Redux</em>. In this course I created several different applications that make use of React and Redux.`,
                image: imageSelector('screenshot-modern-react-redux.png').childImageSharp.fluid,
                id: imageSelector('screenshot-modern-react-redux.png').id,
                projectLink: 'modern-react-redux',
              },
              {
                title: 'Quote Machine',
                description: `There's no mistake you saw this project earlier in my timeline. I've revisited this project numerous times and have now created version four of this project, using React, Redux, and TypeScript.`,
                image: imageSelector('screenshot-quote-machine.png').childImageSharp.fluid,
                id: imageSelector('screenshot-quote-machine.png').id,
                projectLink: 'quote-machine',
              },
              {
                title: 'Squibs Scripts',
                description: `I grew tired of redoing all of my preferences for every project and decided to do something about it. My first set of NPM packages that I published for myself to use on future projects. These packages contain my various config files for Prettier, ESLint, and other packages I use that need configuration.`,
                image: imageSelector('screenshot-squibs-scripts.png').childImageSharp.fluid,
                id: imageSelector('screenshot-squibs-scripts.png').id,
                projectLink: 'squibs-scripts',
              },
              {
                title: 'Timeline Portfolio',
                description: `It was time to update my portfolio. I was happy with my previous portfolio, but it was one of the first few projects in the freeCodeCamp curriculum. I felt I could do better with all that I have learned since then. I decided to throw everything together for for this project: React, Redux, TypeScript, and Gatsby.`,
                image: imageSelector('screenshot-timeline-portfolio.png').childImageSharp.fluid,
                id: imageSelector('screenshot-timeline-portfolio.png').id,
                projectLink: 'timeline-portfolio',
              },
            ]}
          />
          <ShadowMask />
        </TimelineContainer>
        <BlobContainer>
          <img src={data.images.nodes[0].publicURL} alt="" />
        </BlobContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelinePage;

export const data = graphql`
  query TimelineImages {
    images: allFile(filter: { relativeDirectory: { eq: "timelinePage" } }) {
      nodes {
        id
        base
        publicURL
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }

    background: file(relativePath: { eq: "timelinePage/diagonal-striped-brick-pattern.png" }) {
      childImageSharp {
        id
        fixed(width: 1920) {
          src
        }
      }
    }

    projectList: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            slug
          }
        }
      }
    }
  }
`;
