import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import socialBanner from '../../images/meta-timeline-portfolio.jpg';

/* ----------------------------- component types ---------------------------- */
type SEOProps = {
  description?: string;
  lang?: string;
  meta?: Meta;
  title: string;
};

type Meta = ConcatArray<PropertyMetaObj | NameMetaObj>;

type PropertyMetaObj = {
  property: string;
  content: string;
};

type NameMetaObj = {
  name: string;
  content: string;
};

type QueryTypes = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: string;
      image: string;
      siteUrl: string;
    };
  };
};

/* -------------------------------- component ------------------------------- */

const SEO = ({ description = '', lang = 'en', meta = [], title }: SEOProps): JSX.Element => {
  const SEOStaticQuery = graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          image
          siteUrl
        }
      }
    }
  `;
  const { site } = useStaticQuery<QueryTypes>(SEOStaticQuery);

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      defer={false}
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: site.siteMetadata?.siteUrl || ``,
        },
        {
          property: `og:site_name`,
          content: 'Timeline Portfolio - Zachary Holman',
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: socialBanner,
        },
        {
          property: `og:locale`,
          content: 'en_US',
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: socialBanner,
        },
      ].concat(meta)}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: '',
};

export default SEO;
