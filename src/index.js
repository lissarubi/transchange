const axios = require('axios');
const Store = require('data-store');
const { Input } = require('enquirer');
var shell = require('shelljs');

const repositories = []
const tmpDir = 'tmptranschange'

let user
let oldText
let newText
let file
let commit

async function main() {
  user = await promptUserQuestion.run()
  oldText = await promptOldTextQuestion.run()
  newText = await promptNewTextQuestion.run()
  file = await promptFileQuestion.run()
  commit = await promptCommitQuestion.run()

  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  } else if (!user || !oldText || !newText || !file || !commit) {
    shell.echo('Sorry, you need to fill all fields');
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
  shell.mkdir(tmpDir)
  shell.cd(tmpDir)

  repositories.forEach((repository) => {
    let repositoryDir = `${repository.split("/")[4]}`

    shell.exec(`git clone ${repository}`)
    shell.cd(`${repositoryDir}`)
    shell.sed('-i', oldText, newText, file)
    shell.exec(`git add . && git commit -m "${commit}" && git push`)
    shell.cd('..')
  })

  shell.cd('..')
  shell.rm('-rf', tmpDir)
}

async function getRepositories() {
  return await axios.get(`https://api.github.com/users/${user}/repos`)
}

const promptUserQuestion = new Input({
  message: 'Qual o seu usuário no Github?',
  history: {
    store: new Store({ path: `${__dirname}/user.json` }),
    autosave: true
  },
});

const promptOldTextQuestion = new Input({
  message: 'Texto que será substituído (como um nome morto):',
  history: {
    store: new Store({ path: `${__dirname}/oldText.json` }),
    autosave: true
  },
});

const promptNewTextQuestion = new Input({
  message: 'Novo texto (como um nome):',
  history: {
    store: new Store({ path: `${__dirname}/newText.json` }),
    autosave: true
  },
});

const promptFileQuestion = new Input({
  message: 'Arquivo que deve ser buscado e alterado:',
  initial: 'README.md'
});

const promptCommitQuestion = new Input({
  message: 'O nome do commit que será feita essa alteração (Recomendado: "update README.md"):',
  initial: 'update README.md'
});

main()
