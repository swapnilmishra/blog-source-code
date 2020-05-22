const ghpages = require("gh-pages")
const ora = require('ora');

const spinner = ora('Publishing blog').start();

ghpages.publish('public',
    {
        branch: 'master',
        repo: 'git@github.com:swapnilmishra/swapnilmishra.github.io.git'
    }
    , () => {
        spinner.stopAndPersist({ symbol: `🚀` })
        // console.log(`Your blog is published 🚀`)
    });