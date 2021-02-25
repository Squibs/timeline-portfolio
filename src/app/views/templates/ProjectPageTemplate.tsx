import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { ChevronLink } from '../components';
import { Colors } from '../shared';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primaryNeutral};
`;

const ContentContainer = styled.div`
  color: ${(props) => props.theme.colors.whiteTint};
  p {
    font-weight: 300;
  }
`;

const ProjectInformationContainer = styled.div``;

const ProjectDescription = styled.div``;

const ProjectDisplay = styled.div``;

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
  };
}

/* -------------------------------- component ------------------------------- */

const ProjectPageTemplate: React.FC<ProjectPageTemplateProps> = ({
  data: {
    markdownRemark: { frontmatter, html },
  },
}: ProjectPageTemplateProps) => {
  return (
    <PageContainer className="page-container-styles">
      <ChevronLink
        fill={Colors.primaryNeutral}
        hover={Colors.whiteTint}
        position="left"
        link="/timeline"
      />

      <ContentContainer className="page-content-styles">
        <ProjectInformationContainer>
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <ProjectDescription dangerouslySetInnerHTML={{ __html: html }} />
        </ProjectInformationContainer>
        <ProjectDisplay />
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
        date(formatString: "MMM - YYYY")
        slug
        title
      }
    }
  }
`;
