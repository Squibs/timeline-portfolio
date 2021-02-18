import React from 'react';
import { graphql } from 'gatsby';

export interface ProjectTemplateProps {
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

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({
  data: {
    markdownRemark: { frontmatter, html },
  },
}: ProjectTemplateProps) => {
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
    </div>
  );
};

export default ProjectTemplate;

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
