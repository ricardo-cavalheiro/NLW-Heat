# NLW Heat

## Por onde começar

Crie um app no Github: https://github.com/settings/developers
Coloque o seguinte nos campos solicitados:
- Application name: NLW HEAT
- Homepage URL: http://`<IP da sua máquina>`:3000
- Authorization callback URL: http://`<IP da sua máquina>`:4000/signin/callback
 
A porta 3000 será da aplicação Web. A porta 4000 será a porta do servidor Node.js.

Depois de criar o app, com o CLIENT_ID e o SECRET_ID em mãos, tu pode seguir para as demais pastas. Dentro de cada pasta existe um `README.md` com as informações necessárias. Recomendo seguir essa ordem:

1 - Pasta `node`
2 - Pasta `web`
3 - Pasta `mobile`