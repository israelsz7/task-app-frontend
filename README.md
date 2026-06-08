# Task App - Frontend

Aplicativo mobile com React Native e Expo para gerenciamento de tarefas.

## Requisitos

- Node.js 18+
- npm
- Expo CLI
- Aplicativo **Expo Go** no celular (Android/iOS)

## Instalação

```bash
cd frontend
npm install
```

## Configuração

Antes de rodar, edite o arquivo `src/api/tasks.js` e troque o IP pelo IP da sua máquina na rede local:

```js
const BASE_URL = 'http://SEU_IP_LOCAL:3000';
```

Para descobrir seu IP: no terminal, rode `ipconfig` (Windows) ou `ifconfig` / `ip a` (Linux/Mac).

## Execução

```bash
npm start
```

Isso abrirá o Expo DevTools no navegador. Escaneie o QR Code com o app **Expo Go** no celular.

## Funcionalidades

- Listar tarefas
- Criar nova tarefa
- Editar tarefa existente
- Marcar como concluída
- Excluir tarefa
