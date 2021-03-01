import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { ChevronLink } from '../components';
import { Colors } from '../shared';
import { useScrollHook } from '../hooks';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primaryNeutral};
`;

const ContentContainer = styled.main`
  outline: none;
  color: ${(props) => props.theme.colors.whiteTint};
  p {
    font-weight: 300;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // remove some default styles from .page-content-styles
  padding: 0;
  max-width: unset;
  overflow: hidden;
  width: 100%;
  height: 100%;
  /* width: calc(100% - 80px); */
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

  height: 100%;
  margin: 0 auto;
  padding: 0 10px; // moves scrollbar, does shrink overall width.
  position: relative;
  width: calc(100% - 60px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectDescription = styled.div`
  & > p:first-child {
    margin-top: 0;
  }

  overflow-y: scroll;
  width: calc(100% - 21px);
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectDisplay = styled.div`
  height: 100%;
  background-color: dodgerblue;
  border-radius: 15px;

  width: calc(100% - 60px);
  height: calc(100% - 20px);
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
          <ProjectDisplay />
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
