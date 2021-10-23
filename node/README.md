# Node

## Por onde começar

Crie um arquivo `.env` com base no arquivo `.env.example`. 
- Os campos `GITHUB_CLIENT_SECRET` e `GITHUB_CLIENT_ID` são referentes ao CLIENT_ID e SECRET_ID que foram gerados lá no Github.
- Tu pode usar o comando `openssl rand -base64 64` para gerar um token para o `JWT_SECRET`. 
- O `LOCAL_IP` PRECISA ser o seu IP local, como 192.168.x.x. Não pode ser `localhost` ou `0.0.0.0`.

- Crie uma conta no Expo: https://expo.dev/signup
- Crie um projeto de nome `nlwheatmobile`.
- No arquivo `.env` preencha o campo `EXPO_USERNAME` com o seu username do Expo e no campo `EXPO_PROJECT_NAME` com o nome do projeto criado.