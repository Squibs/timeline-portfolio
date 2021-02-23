import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

/* --------------------------------- styles --------------------------------- */

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryNeutral};
  color: ${(props) => props.theme.colors.whiteTint};
`;

const ContentContainer = styled.div`
  text-align: center;
  width: calc(100% - 43px);
  height: calc(100% - 40px);
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
  };
}

/* -------------------------------- component ------------------------------- */

const ProjectPageTemplate: React.FC<ProjectPageTemplateProps> = ({
  data: {
    markdownRemark: { frontmatter, html },
  },
}: ProjectPageTemplateProps) => {
  return (
    <PageContainer>
      <ContentContainer>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
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
