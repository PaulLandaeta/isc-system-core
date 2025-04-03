REQUIRED_NODE_MAJOR=20

function error_exit {
  echo "$1"
  exit 1
}

if ! command -v node &> /dev/null; then
  error_exit "Error: Node.js no está instalado. Por favor instala Node.js versión ${REQUIRED_NODE_MAJOR}.x.x."
fi

NODE_VERSION=$(node -v)
NODE_MAJOR=$(echo "$NODE_VERSION" | sed -E 's/^v?([0-9]+).*/\1/')

if [ "$NODE_MAJOR" -ne "$REQUIRED_NODE_MAJOR" ]; then
  error_exit "Error: Se requiere Node.js ${REQUIRED_NODE_MAJOR}.x.x. Versión actual: $NODE_VERSION."
fi

if [ ! -f .env ]; then # Ruta relativa al archivo .env
  error_exit "Error: No se encontró el archivo .env. Por favor crea un archivo .env con la configuración necesaria."
fi

echo "Instalando dependencias..."
npm install || error_exit "Error al instalar dependencias."

echo "Levantando contenedores Docker..."
docker-compose up -d || docker compose up -d || error_exit "Error al levantar los contenedores Docker."

echo "Ejecutando migraciones..."
npm run migrate:latest || error_exit "Error al ejecutar migraciones."

echo "Ejecutando seed..."
npm run seed:run || error_exit "Error al ejecutar seed."

echo "Levantando la aplicación..."
npm run dev || error_exit "Error al iniciar la aplicación."