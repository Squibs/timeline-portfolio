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
  ],
};
