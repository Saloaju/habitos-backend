# Hábitos Atómicos - Backend

Esta es la API (Backend) para la aplicación de gestión de hábitos de la Actividad 1. Está desarrollada en Node.js, Express y MongoDB (Mongoose).

## Requisitos previos
- Node.js instalado.
- Cuenta de MongoDB Atlas.

## Instrucciones de ejecución

1. Clonar este repositorio.
2. Abrir la terminal en la raíz del proyecto.
3. Instalar las dependencias con el comando:
   \`\`\`bash
   npm install
   \`\`\`
4. Crear un archivo llamado `.env` en la raíz del proyecto y agregar las siguientes variables:
   \`\`\`env
   PORT=5000
   MONGO_URI=mongodb+srv://13002911_db_user:nC3sQ2PrzU1XfEoG@cluster0.bslt0o3.mongodb.net/?appName=Cluster0
   \`\`\`
5. Ejecutar el servidor en modo desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`
6. El servidor estará corriendo en `http://localhost:5000`.