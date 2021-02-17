module.exports = {
  siteMetadata: {
    title: 'Timeline Portfolio',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Zachary Holman - Timeline Portfolio',
        short_name: 'Timeline Portfolio',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        icon: 'src/images/favicon.svg', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    'gatsby-transformer-remark', // markdown to html
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Montserrat:700', 'Puritan:400', 'Bitter:400'],
        display: 'swap',
      },
    },
  ],
};
