# Use a imagem oficial do Node.js como base
FROM node:20-alpine

# Cria e define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte
COPY src/ ./src/

# Compila a aplicação
RUN npm run build

# Expõe a porta que a aplicação utiliza
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
