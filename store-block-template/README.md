# Shelf Indicate

Para usar este App em seu projeto você precisa linkar ambos, em dois terminais diferentes, utilizando o seguinte comando:

vtex link

Lembre-se de utilizar seu próprio workspace!

Com ambos os links ativos (tema e bloco customizado), vamos adicionar o bloco ao tema. Para fazer isso, é necessário adicioná-lo nas dependências do tema:

{
    ...
    "dependencies": {
        ...
+        "vtex."shelf-indicate"": "0.x",
        ...
    },
    ...
}
Por fim, nós queremos adicionar o bloco na loja, para que este possa ser visto. Dentro do arquivo store-theme/store/blocks/home/home.jsonc, declare um bloco countdown:

{
    "store.home": {
        "blocks": [
+           "shelf-indicate",
            ...
        ]
        ...
    }
    ...
}

Caso seu tema não tenha uma pasta react você deve cria, dentro da pasta react execute o comando yarn no seu terminal.