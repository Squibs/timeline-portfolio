import React, { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { BorderContainer, LinkContainer } from '../components';
import { useScrollHook } from '../hooks';
import { AppState } from '../../state/store';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  overflow: hidden;

  & h1 {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ScrollingContainer = styled.div`
  overflow-y: scroll;
  display: flex;
  outline: none;
`;

const ContentContainer = styled.div`
  outline: none;
  margin: auto;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  & form {
    display: flex;
    flex-direction: column;

    & label {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 5px;
    }

    & input,
    & textarea {
      border-radius: 5px;
      border-color: ${({ theme }) => theme.colors.accentOne};
      border-style: solid;
      border-width: 2px;
      background-color: ${({ theme }) => theme.colors.whiteTint};
      width: 100%;
      max-width: 350px;
      min-width: 200px;
    }

    & textarea {
      margin-bottom: 5px;
    }

    input[type='submit'] {
      color: ${({ theme }) => theme.colors.primaryDark};
      font-family: 'Bitter', sans-serif;
      margin: auto;
      width: 100px;
      min-width: unset;
      margin-bottom: 20px;
    }
  }
`;

/* ---------------------------------- types --------------------------------- */
/* -------------------------------- component ------------------------------- */

const ContactPage = (): JSX.Element => {
  const scrollingContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const handleScroll = useScrollHook(scrollingContainerRef);
  const { selectedProject } = useSelector(
    ({ timeline: { timeline } }: AppState) => ({
      selectedProject: timeline.selectedProject,
    }),
    shallowEqual,
  );

  return (
    <PageContainer className="page-container-styles">
      <BorderContainer />
      <ScrollingContainer
        className="page-content-styles"
        ref={scrollingContainerRef}
        onScroll={() => handleScroll()}
      >
        <ContentContainer>
          <h1>Contact Me</h1>
          <p>
            Interesting in learning more about anything you see here, or about other things I&apos;m
            involved in? Check out my social media links below, or get in contact with me by sending
            a message. I would love to hear about anything you have to say!
          </p>
          <AniLink
            swipe
            direction="up"
            to={`${selectedProject ? `/timeline?project=${selectedProject}` : '/timeline'}`}
            duration={1.5}
            entryOffset={100}
            style={{ padding: '10px' }}
          >
            Back to Timeline
          </AniLink>
          <AniLink
            paintDrip
            hex="#2f343c"
            to={`${selectedProject ? `/?project=${selectedProject}` : '/'}`}
            duration={1.5}
            entryOffset={100}
            style={{ padding: '10px' }}
          >
            Back to Homepage
          </AniLink>
          <LinkContainer redirect={false} />
          <FormContainer>
            <h2>Send me a message:</h2>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact">
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="contact" />
              <label htmlFor="formNameField">
                Your Name:
                <input id="formNameField" type="text" name="first-name" required />
              </label>
              <label htmlFor="formEmailField">
                Your Email:
                <input id="formEmailField" type="email" name="email" required />
              </label>
              <label htmlFor="formMessageField">
                Message To Send Me:
                <textarea id="formMessageField" name="bio" rows={3} cols={30} />
              </label>
              <input type="submit" value="Send" />
            </form>
          </FormContainer>
        </ContentContainer>
      </ScrollingContainer>
    </PageContainer>
  );
};

export default ContactPage;
