module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
    },
    {
      resolve: `gatsby-theme-notes`,
      options: {
        basePath: `/notes`
      },
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: `Swapnil Mishra`,
    author: `Swapnil Mishra`,
    description: `Swapnil's Blog'`,
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/swapnil_mishra`,
      },
      {
        name: `github`,
        url: `https://github.com/swapnilmishra`,
      },
    ],
  },
}
