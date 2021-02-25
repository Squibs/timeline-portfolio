import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { ChevronLink, ChevronLinkHelper } from '../components';
import { Colors } from '../shared';

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
      <Link to="/timeline">
        <ChevronLink
          height="15%"
          minHeight="100px"
          fill={Colors.primaryNeutral}
          passedCSS={`
              position: absolute;
              left: 11px;
              top: 50%;
              transform: translateY(-50%) scale(1, 1);
              z-index: 6;
            `}
        />
      </Link>
      <ChevronLinkHelper
        height="15%"
        minHeight="100px"
        passedCSS={`
            position: absolute;
            left: 11px;
            top: 50%;
            transform: translateY(-50%) scale(1, 1);
            filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.55));
            z-index: 4;
          `}
      />
      <ContentContainer>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
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
