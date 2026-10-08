# Grupo ALMA — projeto Vite pronto para a Vercel

## O que já está pronto aqui
- Projeto Vite + React + Tailwind configurado corretamente
- src/App.jsx = o sistema completo (site público + painel administrativo)
- src/storage-polyfill.js = substitui o window.storage do Claude por localStorage do navegador,
  para o site funcionar de verdade fora daqui (dados ficam salvos no navegador de cada pessoa —
  ainda não é um banco compartilhado entre computadores; isso vem na próxima etapa, com Supabase)

## Como colocar no ar (5 minutos)
1. Extraia esta pasta no computador
2. Abra um terminal dentro dela e rode:
   npm install
3. Para testar localmente antes de publicar (opcional):
   npm run dev
4. Para publicar na Vercel:
   npx vercel --prod
   (na primeira vez ele pede para logar com a conta Vercel e confirmar o nome do projeto — aceite os padrões)

Pronto — a Vercel devolve o link de produção.

## Já existe um projeto "grupo-alma" criado na Vercel
Durante os testes, já criei e publiquei este mesmo projeto uma vez (com uma página simples, só para confirmar
que o build funciona). Rodar "npx vercel --prod" dentro desta pasta deve reconhecer o projeto existente e
atualizá-lo — se perguntar, escolha "grupo-alma".

## Próximo passo depois de estar no ar
Trocar o storage-polyfill.js por uma conexão de verdade com banco de dados (Supabase é o que recomendei) —
é aí que os dados passam a ser compartilhados entre todos os computadores da equipe, e o login passa a ser seguro de verdade.
