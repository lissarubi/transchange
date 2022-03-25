## Transchange

Transchange é um programa criado para pessoas transgênero desenvolvedoras que precisam ter o trabalho de mudar as referências aos seus nomes em seus repositórios no Github, mas teriam muito trabalho para fazer isso manualmente, e também seria um processo doloroso ter que ficar lendo e corrigindo seu nome morto.

Por isso, criei esse utilitário de linha de comando para fazer essa alteração de maneira **automática** em **todos** os repositórios de alguém, tornando este processo pelo menos um pouco menos amargo.

## Requisitos

Para utilizar o Transchange, é necessário ter o `git` de linha de comando instalado, e o `sed`, programa de edição de textos também via linha de comando.

POR ENQUANTO o Transchange só funciona em sistemas Linux, mas desejo altera-lo para funcionar em qualquer sistema operacional. Caso tenha uma ideia de como fazer isso, crie uma *issue* ou uma *Pull Request*.

## Instalação

Para instalar o Transchange de maneira simples, use o comando abaixo:

```
npm install -g transchange
```

Caso dê um erro relacionado á permissão, adicione um `sudo` antes, como no comando abaixo:

```
sudo npm install -g transchange
```

## Uso

Para utilizar o transchange, é necessário passar quatro parâmetros:

- `user`: Seu usuário no Github;
- `old`: Texto antigo (como um nome morto);
- `new`: Texto novo (como um nome);
- `file`: Arquivo que deve ser mudado (README.md, LICENSE,etc.)
- `commit`: O nome do commit que será feita essa alteração (eu recomendo esconder essa mudança com um commit chamado `update README`)

Somando todos esses comandos, podemos usar o transchange dessa maneira:

```
transchange --user rubiadev --old nomemorto --new rubia --file README.md --commit "update README.md"
```

Esse comando pode ser repetido várias vezes mudando o arquivo que você deseja editar.

## Contribuições

O projeto aceita de braços abertos contribuições que possam ser feitas, tanto no código quanto fora dele, mas principalmente, divulgue o projeto para que mais pessoas trans tenham acesso, e menos dor em pelo menos um único aspecto de um processo tão amargo quanto fel. :heart:
