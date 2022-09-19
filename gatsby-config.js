module.exports = {
  siteMetadata: {
    title: 'Timeline Portfolio - Zachary Holman',
    description:
      'My timeline portfolio. This is the web dev portfolio of Zachary Holman. View all the projects I have worked on since I have started web development.',
    author: '@SquibsVids',
    siteUrl: 'https://zachary-holman.netlify.app/',
  },
  plugins: [
    {
      // used to point to where pages folder is for gatsby
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `src/app/views/pages`,
      },
    },
    {
      // favicon and web app manifest (PWA)
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Zachary Holman - Timeline Portfolio',
        short_name: 'Timeline Portfolio',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        icon: 'src/app/images/favicon.svg', // relative to root of site (no `${__dirname}` needed)
      },
    },
    {
      // puts markdown pages into gatsby data
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: 'src/app/views/markdown-pages',
      },
    },
    {
      // used to help convert markdown to html
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
            },
          },
        ],
      },
    },
    {
      // google fonts
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Montserrat:700', 'Puritan:400', 'Bitter:300,400'],
        display: 'swap',
      },
    },
    {
      // styled-components
      resolve: 'gatsby-plugin-styled-components',
    },
    'gatsby-plugin-sharp', // image processing functions from the sharp image processing library
    'gatsby-transformer-sharp', // creates image-sharp nodes from image types supported by the sharp image processing library
    {
      // used to put local files into the gatsby application/graphql (images in this case)
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: 'src/app/images',
      },
    },
    // page transitions when navigating
    'gatsby-plugin-transition-link',
    // use params in url query
    'gatsby-plugin-use-query-params',
    // gatsby helmet
    'gatsby-plugin-react-helmet',
  ],
};
