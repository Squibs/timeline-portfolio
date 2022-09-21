import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCodepen,
  faFreeCodeCamp,
  faGithub,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { shallowEqual, useSelector } from 'react-redux';
import { AppState } from '../../state/store';

/* --------------------------------- styles --------------------------------- */

const LinkContainerStyles = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;

  & > div {
    margin-bottom: 10px;
  }
`;

/* -------------------------------- component ------------------------------- */

const LinkContainer = ({ redirect }: { redirect: boolean }): JSX.Element => {
  const { selectedProject } = useSelector(
    ({ timeline: { timeline } }: AppState) => ({
      selectedProject: timeline.selectedProject,
    }),
    shallowEqual,
  );

  const customThinCircle = () => {
    return (
      <svg
        className="fa-stack-2x"
        viewBox="0 0 256 256"
        id="Flat"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: '#bda453' }}
      >
        <path
          fill="#bda453"
          d="M128,228A100,100,0,1,1,228,128,100.11316,100.11316,0,0,1,128,228Zm0-192a92,92,0,1,0,92,92A92.1042,92.1042,0,0,0,128,36Z"
        />
      </svg>
    );
  };

  const fontawesomeHelper = (icon: IconDefinition) => {
    return (
      <FontAwesomeIcon
        icon={icon}
        className="fa-stack-1x"
        style={{ color: '#bda453', fontSize: '40px' }}
      />
    );
  };

  const makeLink = (link: string, icon: IconDefinition, label: string) => {
    let linkTo = link;

    // used on contact page - no redirect, just mailto:
    // decrypted here to obscure my email, will it work? time will tell
    if (!redirect && icon === faEnvelope) {
      const decrypt = (email: string) => {
        const alpha =
          'abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM';
        return email.replace(/[a-z]/gi, (letter) => alpha[alpha.indexOf(letter) + 13]);
      };

      linkTo = decrypt(link);
    }

    // used for homepage email link - redirects to contact page, anilink
    if (redirect && icon === faEnvelope) {
      return (
        <AniLink
          paintDrip
          hex="#cdd7d9"
          to={`${selectedProject ? `/contact?project=${selectedProject}` : '/contact'}`}
          duration={1.5}
          entryOffset={100}
          style={{ padding: '10px' }}
        >
          <span className="fa-stack fa-2x">
            {customThinCircle()}
            {fontawesomeHelper(icon)}
          </span>
        </AniLink>
      );
    }

    // all other links, normal links
    return (
      <a href={linkTo} aria-label={label}>
        <span className="fa-stack fa-2x">
          {customThinCircle()}
          {fontawesomeHelper(icon)}
        </span>
      </a>
    );
  };

  return (
    <LinkContainerStyles>
      <div>
        {makeLink('https://github.com/squibs', faGithub, `Visit Zachary's Github profile`)}
        {makeLink(
          'znvygb:mnpunel.e.ubyzna@tznvy.pbz?fhowrpg=Gvzryvar Cbegsbyvb - Pbagnpg Erdhrfg',
          faEnvelope,
          `Send an email to Zachary`,
        )}
        {makeLink(
          'https://www.freecodecamp.org/squibs',
          faFreeCodeCamp,
          `Visit Zachary's freeCodeCamp profile`,
        )}
      </div>
      <div>
        {makeLink('https://codepen.io/Sulph', faCodepen, `Visit Zachary's CodePen profile`)}
        {makeLink(
          'https://www.youtube.com/squibsvids',
          faYoutube,
          `Visit Zachary's YouTube channel`,
        )}
        {makeLink('https://twitter.com/SquibsVids', faTwitter, `Visit Zachary's Twitter profile`)}
      </div>
    </LinkContainerStyles>
  );
};

export default LinkContainer;
