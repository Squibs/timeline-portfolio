import React, { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { BorderContainer, ChevronLink, TimelineCreator } from '../components';
import { Colors } from '../shared';
import { AppState } from '../../state/store';

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
    }
  `);

  const imageSelector = (imgName: string) => {
    return data.images.nodes.filter((node: Node) => node.base === imgName)[0];
  };

  const getChevronElement = () => {
    return chevronLinkRef;
  };

  return (
    <PageContainer className="page-container-styles">
      <BorderContainer />
      <ChevronLink
        fill={Colors.whiteTint}
        hover={Colors.primaryDark}
        position="left"
        link="/"
        direction="right"
      />
      <ChevronLink
        fill={Colors.whiteTint}
        hover={Colors.primaryNeutral}
        position="right"
        link={selectedProject}
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
                description:
                  'Aliquip aliquip ad nisi sunt. Ipsum ipsum laborum et labore pariatur adipisicing.',
                image: imageSelector('screenshot-learning-to-necro.png').childImageSharp.fluid,
                id: imageSelector('screenshot-learning-to-necro.png').id,
                projectLink: '/project/learning-to-necro',
              },
              {
                title: 'Tribute Page',
                description:
                  'Voluptate cupidatat cillum quis do commodo duis fugiat Lorem veniam eu fugiat labore officia. Lorem excepteur eu veniam adipisicing consequat non eiusmod aliqua. Ullamco veniam cillum nostrud consectetur labore proident veniam enim. Minim excepteur consequat eu consequat irure eiusmod. Sint non dolore nisi fugiat. Cillum consectetur Lorem pariatur do veniam fugiat veniam nostrud proident labore voluptate dolore magna esse. Aute sunt quis ullamco sint occaecat cillum dolor proident irure.',
                image: imageSelector('screenshot-tribute-page.png').childImageSharp.fluid,
                id: imageSelector('screenshot-tribute-page.png').id,
                projectLink: '/project/tribute-page',
              },
              {
                title: 'freeCodeCamp Repository',
                description:
                  'Enim irure incididunt quis duis pariatur Lorem aliquip elit id quis ex fugiat commodo sit. Proident in in minim non deserunt est fugiat fugiat ea est irure elit excepteur. Deserunt fugiat dolore dolore commodo nulla consectetur. Est officia amet irure deserunt elit. Magna in culpa eu aliqua exercitation elit irure quis sint et veniam. Reprehenderit anim aliqua quis anim sunt voluptate dolor aute laboris aliquip pariatur. Officia sint incididunt tempor proident non incididunt reprehenderit pariatur.',
                image: imageSelector('screenshot-free-code-camp.png').childImageSharp.fluid,
                id: imageSelector('screenshot-free-code-camp.png').id,
                projectLink: '/project/free-code-camp',
              },
              {
                title: 'Personal Portfolio',
                description:
                  'Exercitation mollit et labore deserunt aute aute. Nostrud laboris aliquip cupidatat et laborum ex officia labore sit eiusmod. Aute exercitation sint officia irure id nostrud enim eu ad dolore amet. Ex proident laboris duis anim commodo dolor id.',
                image: imageSelector('screenshot-personal-portfolio.png').childImageSharp.fluid,
                id: imageSelector('screenshot-personal-portfolio.png').id,
                projectLink: '/project/personal-portfolio',
              },
              {
                title: 'Old Quote Machine',
                description:
                  'Amet excepteur Lorem ullamco do dolor qui. Labore consequat amet elit id enim quis in voluptate excepteur aute occaecat labore. Dolore eu sunt aute amet sit. Sit quis anim cillum tempor cupidatat quis quis minim. Excepteur commodo culpa nulla voluptate reprehenderit ex.',
                image: imageSelector('screenshot-quote-machine-old.png').childImageSharp.fluid,
                id: imageSelector('screenshot-quote-machine-old.png').id,
                projectLink: '/project/quote-machine-old',
              },
              {
                title: 'Local Weather',
                description:
                  'Dolor ex proident enim duis. Sint exercitation do do commodo deserunt aliqua esse ullamco ex consectetur laboris eu qui. Dolore magna fugiat dolor sit velit minim aute pariatur officia ad mollit in enim. Nulla in occaecat reprehenderit aute consequat proident do et sint sunt. Minim ipsum amet nulla sit. Aute reprehenderit exercitation ipsum adipisicing cillum fugiat incididunt.',
                image: imageSelector('screenshot-local-weather.png').childImageSharp.fluid,
                id: imageSelector('screenshot-local-weather.png').id,
                projectLink: '/project/local-weather',
              },
              {
                title: 'Wikipedia Viewer',
                description:
                  'Eu consectetur exercitation reprehenderit aute ea. Consectetur ea nostrud irure Lorem enim nostrud esse veniam incididunt cupidatat adipisicing elit. Excepteur laboris ullamco consequat eiusmod labore qui ullamco commodo. Irure ex minim nostrud nulla voluptate qui ut velit.',
                image: imageSelector('screenshot-wikipedia-viewer.png').childImageSharp.fluid,
                id: imageSelector('screenshot-wikipedia-viewer.png').id,
                projectLink: '/project/wikipedia-viewer',
              },
              {
                title: 'Technical Documentation',
                description:
                  'Culpa amet cupidatat laboris in consequat nostrud commodo et ullamco enim culpa tempor. Esse pariatur minim laborum consequat aliqua tempor sit consequat aliqua. Sint deserunt aliqua anim id ex aliqua. Culpa ex aliquip ut non Lorem Lorem aliquip in in Lorem incididunt pariatur. Minim reprehenderit adipisicing laborum velit esse ex velit occaecat Lorem. Eiusmod irure adipisicing pariatur aliquip aliquip ullamco cillum incididunt Lorem eu reprehenderit duis nulla consequat. Esse dolor elit est sunt amet dolor dolor non sint fugiat.',
                image: imageSelector('screenshot-technical-documentation.png').childImageSharp
                  .fluid,
                id: imageSelector('screenshot-technical-documentation.png').id,
                projectLink: '/project/technical-documentation',
              },
              {
                title: 'Twitch Streamers',
                description:
                  'Id dolore minim fugiat culpa. Nisi minim labore aliqua ullamco sint. Non reprehenderit sit consectetur laboris eiusmod. Fugiat elit do et in mollit reprehenderit adipisicing laboris sit ipsum reprehenderit quis pariatur. Magna sunt ea proident quis ex ipsum sint sunt et in. Esse veniam excepteur commodo labore qui in nostrud ad adipisicing Lorem. Eiusmod nisi anim dolor anim.',
                image: imageSelector('screenshot-twitch-streamers.png').childImageSharp.fluid,
                id: imageSelector('screenshot-twitch-streamers.png').id,
                projectLink: '/project/twitch-streamers',
              },
              {
                title: 'JavaScript Calculator',
                description:
                  'Mollit est irure eu elit do commodo enim dolor do sit sint est velit mollit. Voluptate ea fugiat officia est sunt tempor. Cillum cupidatat ea reprehenderit consequat tempor sunt officia sint magna enim ex eu.',
                image: imageSelector('screenshot-js-calculator.png').childImageSharp.fluid,
                id: imageSelector('screenshot-js-calculator.png').id,
                projectLink: '/project/js-calculator',
              },
              {
                title: 'Pomodoro Clock',
                description:
                  'Esse dolor sit elit sunt nostrud incididunt incididunt ex ex incididunt adipisicing fugiat eiusmod deserunt adipisicing incididunt adipisicing adipisicing cupidatat enim do. Ipsum pariatur reprehenderit irure ullamco. Non exercitation deserunt adipisicing adipisicing cupidatat enim do mollit velit consequat non aliqua fugiat.',
                image: imageSelector('screenshot-pomodoro-clock.png').childImageSharp.fluid,
                id: imageSelector('screenshot-pomodoro-clock.png').id,
                projectLink: '/project/pomodoro-clock',
              },
              {
                title: 'Simon Game',
                description:
                  'Consequat qui culpa adipisicing ut exercitation mollit sunt do. Quis sunt mollit dolore laborum enim eu eu ipsum. Lorem eiusmod excepteur sit commodo pariatur culpa minim aliquip magna. Fugiat Lorem officia esse Lorem. Minim labore aliqua voluptate dolore sunt cillum nulla et commodo. Eu minim velit voluptate minim ullamco magna amet nisi cillum occaecat reprehenderit excepteur.',
                image: imageSelector('screenshot-simon-game.png').childImageSharp.fluid,
                id: imageSelector('screenshot-simon-game.png').id,
                projectLink: '/project/simon-game',
              },
              {
                title: 'Tic Tac Toe',
                description:
                  'Id ea veniam eu aliquip enim amet dolore adipisicing sunt labore tempor id voluptate. Sunt qui in cupidatat nisi magna. Est exercitation sunt mollit minim ullamco irure nulla.',
                image: imageSelector('screenshot-tic-tac-toe.png').childImageSharp.fluid,
                id: imageSelector('screenshot-tic-tac-toe.png').id,
                projectLink: '/project/tic-tac-toe',
              },
              {
                title: 'NMC Janitorial Services',
                description:
                  'Duis nostrud ad duis officia ad tempor dolore laboris laboris dolor eu consectetur. Pariatur laborum voluptate aliquip consectetur ut commodo qui est et. Ad ipsum officia deserunt pariatur ea occaecat aliquip ipsum irure est et dolor. Deserunt ea excepteur anim duis aliquip nisi. Officia amet magna aliqua nostrud laborum occaecat irure aliquip. Exercitation anim sit in sunt dolore est excepteur qui sunt qui.',
                image: imageSelector('screenshot-nmc-janitorial.png').childImageSharp.fluid,
                id: imageSelector('screenshot-nmc-janitorial.png').id,
                projectLink: '/project/nmc-janitorial',
              },
              {
                title: 'Static Site Boilerplate',
                description:
                  'Qui commodo aute sit irure eiusmod et esse exercitation ullamco aute labore. Commodo ullamco sit dolor sunt do aliqua ea enim incididunt cupidatat culpa in culpa do. Laborum ullamco aliqua do laboris sint Lorem ut pariatur magna dolor fugiat. Voluptate veniam dolor exercitation sint occaecat velit. Ad laborum eiusmod voluptate voluptate sint excepteur sunt labore sit quis laborum.',
                image: imageSelector('screenshot-static-site-boilerplate.png').childImageSharp
                  .fluid,
                id: imageSelector('screenshot-static-site-boilerplate.png').id,
                projectLink: '/project/static-site-boilerplate',
              },
              {
                title: 'Markdown Previewer',
                description:
                  'Fugiat dolor velit nostrud commodo ut qui veniam enim nulla proident quis aliquip. Dolore ullamco velit laboris enim quis ut ex qui eiusmod nostrud fugiat eu consequat dolor. Amet voluptate adipisicing Lorem pariatur culpa sint laboris in.',
                image: imageSelector('screenshot-markdown-previewer.png').childImageSharp.fluid,
                id: imageSelector('screenshot-markdown-previewer.png').id,
                projectLink: '/project/markdown-previewer',
              },
              {
                title: 'React Redux Boilerplate',
                description:
                  'Excepteur nulla irure duis do magna labore cillum. Nostrud elit ad duis elit. Velit reprehenderit sint mollit anim dolore cupidatat sit culpa magna sunt occaecat. Aliquip deserunt qui exercitation nostrud ea aute. Consectetur esse nulla sint amet ipsum. Esse occaecat nostrud cupidatat magna duis do deserunt culpa fugiat cillum. Reprehenderit veniam non et ad non ullamco cupidatat dolore nostrud elit.',
                image: imageSelector('screenshot-react-redux-boilerplate.png').childImageSharp
                  .fluid,
                id: imageSelector('screenshot-react-redux-boilerplate.png').id,
                projectLink: '/project/react-redux-boilerplate',
              },
              {
                title: 'Wind Home Appliance Repair',
                description:
                  'Proident labore laborum aute et eu laboris non quis consequat commodo velit amet sit. Qui non enim do enim ullamco pariatur ea aute quis. Occaecat aute pariatur ullamco non elit. Eiusmod occaecat aliqua occaecat sunt qui. Aliqua dolore excepteur reprehenderit minim cillum dolore sit exercitation Lorem anim dolor. Ea duis duis nostrud sint mollit ex qui laboris quis.',
                image: imageSelector('screenshot-wind-home.png').childImageSharp.fluid,
                id: imageSelector('screenshot-wind-home.png').id,
                projectLink: '/project/wind-home',
              },
              {
                title: 'Porter Tech',
                description:
                  'Consectetur enim qui fugiat culpa commodo. Incididunt occaecat aliqua sint nisi duis deserunt nulla exercitation quis ipsum id sint. Ad enim anim dolor ipsum elit. Anim deserunt irure qui officia cupidatat duis ea elit pariatur nulla voluptate nostrud.',
                image: imageSelector('screenshot-porter-tech.png').childImageSharp.fluid,
                id: imageSelector('screenshot-porter-tech.png').id,
                projectLink: '/project/porter-tech',
              },
              {
                title: 'Modern React with Redux',
                description:
                  'Exercitation nostrud quis ad incididunt qui velit minim qui aliquip deserunt. Sint sunt minim ad proident deserunt aliqua non exercitation laborum minim culpa pariatur. Pariatur nulla magna irure occaecat fugiat sit culpa pariatur quis eiusmod adipisicing labore laboris. Pariatur nisi enim dolor aliqua elit amet duis tempor est ipsum eiusmod culpa culpa voluptate. Mollit fugiat ea eiusmod enim. Laborum consequat qui tempor duis. Ad aliqua adipisicing id irure cillum irure laboris nostrud nostrud.',
                image: imageSelector('screenshot-modern-react-redux.png').childImageSharp.fluid,
                id: imageSelector('screenshot-modern-react-redux.png').id,
                projectLink: '/project/modern-react-redux',
              },
              {
                title: 'Quote Machine',
                description:
                  'Eiusmod reprehenderit consectetur nulla laborum tempor. Excepteur deserunt tempor culpa deserunt consequat. Incididunt enim voluptate ad enim esse adipisicing esse ullamco dolore nostrud est magna. Officia do esse dolor amet ipsum sint et. Veniam culpa eu ea do id est laboris proident.',
                image: imageSelector('screenshot-quote-machine.png').childImageSharp.fluid,
                id: imageSelector('screenshot-quote-machine.png').id,
                projectLink: '/project/quote-machine',
              },
              {
                title: 'Squibs Scripts',
                description:
                  'Reprehenderit voluptate cillum nisi nostrud eiusmod nostrud consequat nulla cupidatat id esse. Quis Lorem ea aliquip eu nisi fugiat proident qui velit duis incididunt duis deserunt consectetur. Pariatur excepteur voluptate eiusmod nulla incididunt labore fugiat qui proident sint duis anim ex.',
                image: imageSelector('screenshot-squibs-scripts.png').childImageSharp.fluid,
                id: imageSelector('screenshot-squibs-scripts.png').id,
                projectLink: '/project/squibs-scripts',
              },
              {
                title: 'Timeline Portfolio',
                description:
                  'Deserunt duis officia occaecat commodo Lorem amet dolore. Anim velit pariatur do laboris est nisi duis Lorem aliquip aliquip ut do pariatur veniam. Do mollit excepteur occaecat esse nulla id ut. Amet reprehenderit voluptate veniam eu reprehenderit cillum veniam. Tempor id labore labore excepteur ea nisi quis.',
                image: imageSelector('screenshot-timeline-portfolio.png').childImageSharp.fluid,
                id: imageSelector('screenshot-timeline-portfolio.png').id,
                projectLink: '/project/timeline-portfolio',
              },
            ]}
          />
        </TimelineContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default TimelinePage;
