import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import IFrameResizer from 'iframe-resizer-react';
import { ChevronLink } from '../components';
import { Colors } from '../shared';
import { useScrollHook } from '../hooks';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primaryNeutral};
`;

const ContentContainer = styled.main`
  p {
    font-weight: 300;
  }

  outline: none;
  color: ${(props) => props.theme.colors.whiteTint};

  // remove some default styles from .page-content-styles
  padding: 0;
  max-width: unset;
  overflow: hidden;
  width: 100%;
  height: 100%;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
`;

/* PROJECT INFORMATION */
const ProjectInformationContainer = styled.div`
  height: 50%;
  overflow: hidden;
`;

const ProjectInformation = styled.div`
  h1 {
    margin: 10px 0 0 0;
  }

  h2 {
    margin: 10px 0 10px 0;
  }

  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectDescription = styled.div`
  & > p:first-child {
    margin-top: 0;
  }

  outline: none;
  overflow-y: scroll;
  width: calc(100% - 15px);
  padding: 0 5px;
`;

const BlobContainer = styled.div`
  width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 5px;
  z-index: -1;
  transform: rotate(-60deg);
`;

/* PROJECT DISPLAY */
const ProjectDisplayContainer = styled.div`
  height: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectDisplay = styled.div`
  height: 100%;
  background-color: dodgerblue;
  border-radius: 15px;
  border: 3px solid ${(props) => props.theme.colors.accentOne};
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* ---------------------------------- types --------------------------------- */

export interface ProjectPageTemplateProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        date: string;
        slug: string;
        title: string;
      };
    };

    images: {
      nodes: [
        {
          id: string;
          publicURL: string;
        },
      ];
    };
  };
}

/* -------------------------------- component ------------------------------- */

const ProjectPageTemplate: React.FC<ProjectPageTemplateProps> = ({
  data: {
    markdownRemark: { frontmatter, html },
    images,
  },
}: ProjectPageTemplateProps) => {
  const projectDescriptionRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { handleScroll } = useScrollHook(projectDescriptionRef);

  // auto focus inner div so keyboard controls can be instantly used
  useEffect(() => {
    projectDescriptionRef.current.tabIndex = -1;
    projectDescriptionRef.current.autofocus = true;
    projectDescriptionRef.current.focus();
  }, []);

  return (
    <PageContainer className="page-container-styles">
      <ChevronLink
        fill={Colors.primaryNeutral}
        hover={Colors.primaryLight}
        position="left"
        link="/timeline"
      />

      <ContentContainer className="page-content-styles">
        <ProjectInformationContainer>
          <ProjectInformation>
            <BlobContainer>
              <img src={images.nodes[0].publicURL} alt="" />
            </BlobContainer>

            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <ProjectDescription
              className="page-content-styles"
              dangerouslySetInnerHTML={{ __html: html }}
              ref={projectDescriptionRef}
              onScroll={() => handleScroll()}
            />
          </ProjectInformation>
        </ProjectInformationContainer>
        <ProjectDisplayContainer>
          <ProjectDisplay>
            <IFrameResizer
              src="https://squibs.github.io/quote-machine"
              style={{ width: '1px', minWidth: '100%', height: '100%' }}
              scrolling
            />
          </ProjectDisplay>
        </ProjectDisplayContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default ProjectPageTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM - YYYY")
        slug
        title
      }
    }

    images: allFile(filter: { relativeDirectory: { eq: "projectPages" } }) {
      nodes {
        id
        publicURL
      }
    }
  }
`;
