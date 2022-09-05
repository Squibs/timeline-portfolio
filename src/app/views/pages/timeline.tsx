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

  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 1800px;
  width: calc(100% - 85px);

  @media screen and (min-height: 750px) {
    width: calc(100% - 100px);
  }

  @media screen and (min-height: 800px) and (min-width: 750px) {
    width: calc(100% - 140px);
  }

  h1 {
    margin: 0px;
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
  height: 85%;
  overflow: hidden;
  border-radius: 25px;
  border: 6px solid ${({ theme }) => theme.colors.accentOne};
  z-index: 1; // iOS fix
  margin-bottom: 10px;
  max-height: 1200px;
  position: relative;
`;

/* ---------------------------------- types --------------------------------- */

type Node = {
  id: string;
  base: string;
  childImageSharp: {
    fluid: {
      base64: string;
      aspectRatio: number;
      src: string;
      srcSet: string;
      sizes: string;
    };
  };
};

type BackgroundImage = {
  childImageSharp: {
    id: string;
    fixed: {
      src: string;
    };
  };
};

type Query = {
  images: {
    nodes: Node[];
  };
  background: BackgroundImage;
  projectList: { edges: { node: { frontmatter: { slug: string } } }[] };
};

/* -------------------------------- component ------------------------------- */

const TimelinePage: React.FC = () => {
  const chevronLinkRef = useRef<HTMLDivElement>(null);
  const { selectedProject } = useSelector(
    ({ timeline: { timeline } }: AppState) => ({
      selectedProject: timeline.selectedProject,
    }),
    shallowEqual,
  );
  // not sure if this should really be a hook, if I don't need it to return anything
  useSelectedProjectHook();

  const data: Query = useStaticQuery(graphql`
    query TimelineImages {
      images: allFile(filter: { relativeDirectory: { eq: "timelinePage" } }) {
        nodes {
          id
          base
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
  `);

  const imageSelector = (imgName: string) => {
    return data.images.nodes.filter((node: Node) => node.base === imgName)[0];
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
                description: `The first `,
                image: imageSelector('screenshot-nmc-janitorial.png').childImageSharp.fluid,
                id: imageSelector('screenshot-nmc-janitorial.png').id,
                projectLink: 'nmc-janitorial',
              },
              {
                title: 'Static Site Boilerplate',
                description: `Qui commodo aute sit irure eiusmod et esse exercitation ullamco aute labore. Commodo ullamco sit dolor sunt do aliqua ea enim incididunt cupidatat culpa in culpa do. Laborum ullamco aliqua do laboris sint Lorem ut pariatur magna dolor fugiat. Voluptate veniam dolor exercitation sint occaecat velit. Ad laborum eiusmod voluptate voluptate sint excepteur sunt labore sit quis laborum.`,
                image: imageSelector('screenshot-static-site-boilerplate.png').childImageSharp
                  .fluid,
                id: imageSelector('screenshot-static-site-boilerplate.png').id,
                projectLink: 'static-site-boilerplate',
              },
              {
                title: 'Markdown Previewer',
                description: `Fugiat dolor velit nostrud commodo ut qui veniam enim nulla proident quis aliquip. Dolore ullamco velit laboris enim quis ut ex qui eiusmod nostrud fugiat eu consequat dolor. Amet voluptate adipisicing Lorem pariatur culpa sint laboris in.`,
                image: imageSelector('screenshot-markdown-previewer.png').childImageSharp.fluid,
                id: imageSelector('screenshot-markdown-previewer.png').id,
                projectLink: 'markdown-previewer',
              },
              {
                title: 'React Redux Boilerplate',
                description: `Excepteur nulla irure duis do magna labore cillum. Nostrud elit ad duis elit. Velit reprehenderit sint mollit anim dolore cupidatat sit culpa magna sunt occaecat. Aliquip deserunt qui exercitation nostrud ea aute. Consectetur esse nulla sint amet ipsum. Esse occaecat nostrud cupidatat magna duis do deserunt culpa fugiat cillum. Reprehenderit veniam non et ad non ullamco cupidatat dolore nostrud elit.`,
                image: imageSelector('screenshot-react-redux-boilerplate.png').childImageSharp
                  .fluid,
                id: imageSelector('screenshot-react-redux-boilerplate.png').id,
                projectLink: 'react-redux-boilerplate',
              },
              {
                title: 'Wind Home Appliance Repair',
                description: `Proident labore laborum aute et eu laboris non quis consequat commodo velit amet sit. Qui non enim do enim ullamco pariatur ea aute quis. Occaecat aute pariatur ullamco non elit. Eiusmod occaecat aliqua occaecat sunt qui. Aliqua dolore excepteur reprehenderit minim cillum dolore sit exercitation Lorem anim dolor. Ea duis duis nostrud sint mollit ex qui laboris quis.`,
                image: imageSelector('screenshot-wind-home.png').childImageSharp.fluid,
                id: imageSelector('screenshot-wind-home.png').id,
                projectLink: 'wind-home',
              },
              {
                title: 'Porter Tech',
                description: `Consectetur enim qui fugiat culpa commodo. Incididunt occaecat aliqua sint nisi duis deserunt nulla exercitation quis ipsum id sint. Ad enim anim dolor ipsum elit. Anim deserunt irure qui officia cupidatat duis ea elit pariatur nulla voluptate nostrud.`,
                image: imageSelector('screenshot-porter-tech.png').childImageSharp.fluid,
                id: imageSelector('screenshot-porter-tech.png').id,
                projectLink: 'porter-tech',
              },
              {
                title: 'Modern React with Redux',
                description: `Exercitation nostrud quis ad incididunt qui velit minim qui aliquip deserunt. Sint sunt minim ad proident deserunt aliqua non exercitation laborum minim culpa pariatur. Pariatur nulla magna irure occaecat fugiat sit culpa pariatur quis eiusmod adipisicing labore laboris. Pariatur nisi enim dolor aliqua elit amet duis tempor est ipsum eiusmod culpa culpa voluptate. Mollit fugiat ea eiusmod enim. Laborum consequat qui tempor duis. Ad aliqua adipisicing id irure cillum irure laboris nostrud nostrud.`,
                image: imageSelector('screenshot-modern-react-redux.png').childImageSharp.fluid,
                id: imageSelector('screenshot-modern-react-redux.png').id,
                projectLink: 'modern-react-redux',
              },
              {
                title: 'Quote Machine',
                description: `Eiusmod reprehenderit consectetur nulla laborum tempor. Excepteur deserunt tempor culpa deserunt consequat. Incididunt enim voluptate ad enim esse adipisicing esse ullamco dolore nostrud est magna. Officia do esse dolor amet ipsum sint et. Veniam culpa eu ea do id est laboris proident.`,
                image: imageSelector('screenshot-quote-machine.png').childImageSharp.fluid,
                id: imageSelector('screenshot-quote-machine.png').id,
                projectLink: 'quote-machine',
              },
              {
                title: 'Squibs Scripts',
                description: `Reprehenderit voluptate cillum nisi nostrud eiusmod nostrud consequat nulla cupidatat id esse. Quis Lorem ea aliquip eu nisi fugiat proident qui velit duis incididunt duis deserunt consectetur. Pariatur excepteur voluptate eiusmod nulla incididunt labore fugiat qui proident sint duis anim ex.`,
                image: imageSelector('screenshot-squibs-scripts.png').childImageSharp.fluid,
                id: imageSelector('screenshot-squibs-scripts.png').id,
                projectLink: 'squibs-scripts',
              },
              {
                title: 'Timeline Portfolio',
                description: `Deserunt duis officia occaecat commodo Lorem amet dolore. Anim velit pariatur do laboris est nisi duis Lorem aliquip aliquip ut do pariatur veniam. Do mollit excepteur occaecat esse nulla id ut. Amet reprehenderit voluptate veniam eu reprehenderit cillum veniam. Tempor id labore labore excepteur ea nisi quis.`,
                image: imageSelector('screenshot-timeline-portfolio.png').childImageSharp.fluid,
                id: imageSelector('screenshot-timeline-portfolio.png').id,
                projectLink: 'timeline-portfolio',
              },
            ]}
          />
        </TimelineContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelinePage;
