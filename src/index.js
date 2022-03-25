var argv = require('minimist')(process.argv.slice(2));
const axios = require('axios');
var shell = require('shelljs');
const repositories = []

const user = argv.user
const oldText = argv.old
const newText = argv.new
const file = argv.file
const commit = argv.commit

async function main() {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  } else if (!shell.which('sed')) {
    shell.echo('Sorry, this script requires sed');
    shell.exit(1);
  }

  getRepositories().then(
    (rawRepositories) => {
      rawRepositories.data.forEach((repository) => {
        repositories.push(repository.html_url)
      })
      changeRepository(repositories)
    }
  )
}

function changeRepository(repositories) {
  repositories.forEach((repository) => {
    shell.exec(`cd /tmp && git clone ${repository}`)
    let repositoryDir = repository.split("/")[4]
    shell.exec(`cd /tmp/${repositoryDir} && sed -i 's/${oldText}/${newText}/g' ${file} && git add . && git commit -m "${commit}" && git push`)
    console.log(`cd /tmp/${repositoryDir} && sed -i 's/${oldText}/${newText}/g' ${file} && git add . && git commit -m "${commit}" && git push`)
  })
}

async function getRepositories() {
  return await axios.get(`https://api.github.com/users/${user}/repos`)
}

main()
