const ghpages = require("gh-pages")

ghpages.publish('public',
    {
        branch: 'gh-pages',
        repo: 'git@github.com:swapnilmishra/swapnilmishra.github.io.git'
    }
    , () => {
        console.log(`Your blog is published 🚀`)
    });