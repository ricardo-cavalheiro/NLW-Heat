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

# A milha extra

Features adicionais:

- Não é necessário criar mais de um app no Github. Isso porque o servidor Node atua não só como uma API REST, mas também como um Proxy. No projeto original não é possível logar com a mesma conta tanto no web quanto no mobile porque ou o mobile + node compartilham as mesmas credenciais do Github ou o web + node compartilham as mesmas credenciais do Github.
&nbsp;<details>
       <summary>Entenda melhor</summary>
  
       Quando fazíamos o login, seja no mobile seja na web, o client tinha que usar a MESMA credencial `CLIENT_ID` 
       do backend para que o Github pudesse redirecionar o client para a URL correta 
       (lembrando que o mobile e o web têm URLs de callback diferentes). 
       De cara isso introduz um problema: se o mobile e servidor compartilham as mesmas credenciais, o web não vai 
       funcionar corretamente pois a URL de callback foi definida para as necessidades do mobile e não do web.
       Para resolver isso, criei um endpoint que serve como a URL de callback que o Github chama quando o usuário faz o login. 
       Esse endpoint verifica se o usuário está vindo do app ou do navegador e então faz o redirecionamento correto.
  
     </details>
- Ao criar uma nova mensagem, o servidor retornava os dados dessa mensagem. O problema é: neste retorno não estava incluso o ID da mensagem, o que causava um problema tanto no web quanto no mobile na hora de iterar sobre as mensagens, uma vez que ambos usavam este ID como `key`.
- O usuário no mobile pode recarregar as mensagens manualmente com a feature de `pull refresh`.
- O usuáio no web recebe um feedback visual mais explícito quando a mensagem for enviada.
- As variávies de ambiente de cada projeto foram movidas para um arquivo `.env`. Assim fica mais fácil clonar o projeto inteiro.
