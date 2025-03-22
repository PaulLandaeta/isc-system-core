# Utilizando la imagen base de Node.js
FROM node:18-alpine

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar las dependencias de Node.js
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto en el que la aplicación va a correr
EXPOSE 5000

# Definir el comando para correr la aplicación
CMD ["npm", "start"]
