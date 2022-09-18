import React from 'react';
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

const LinkContainer = (): JSX.Element => {
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

  const makeLink = (link: string, icon: IconDefinition) => {
    return (
      <a href={link}>
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
        {makeLink('https://github.com/squibs', faGithub)}
        {makeLink(
          'mailto:email@email.com?subject=Timeline Portfolio - Contact Request',
          faEnvelope,
        )}
        {makeLink('https://www.freecodecamp.org/squibs', faFreeCodeCamp)}
      </div>
      <div>
        {makeLink('https://codepen.io/Sulph', faCodepen)}
        {makeLink('https://www.youtube.com/squibsvids', faYoutube)}
        {makeLink('https://twitter.com/SquibsVids', faTwitter)}
      </div>
    </LinkContainerStyles>
  );
};

export default LinkContainer;
