# Challenge Pushstart

Server side feito usando Laravel.

Necessário instalar o [composer](https://getcomposer.org/)

### Instruções
Renomear o .env.example para .env e colocar as configurações de conexão com banco de dados

No Terminal dentro da pasta src usar os seguintes comandos:

```
composer update // baixa/atualiza as dependencias
php artisan migrate // gera o banco
php artisan db:seed // gera o usurario padrão (email: user@gmail.com, senha: 123)
php artisan serve // sobe a aplicação
```

Depois de tudo certo é possível usar o client side com o index.html
