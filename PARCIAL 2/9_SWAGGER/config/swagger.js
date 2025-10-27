import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Frutas',
    version: '1.0.0',
    description: 'API simple de ejemplo para manejar frutas con Express y ES Modules',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../index.js')], // 🔥 Ruta absoluta correcta
}

const swaggerSpec = swaggerJSDoc(options)

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log('📘 Documentación disponible en: http://localhost:3000/api-docs')
}
