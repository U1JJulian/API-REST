import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Obtenemos la ruta del archivo .yml
const filePath = path.join(__dirname, 'config.yml');

//Leemos el contenido del archivo como texto
const fileContent = fs.readFileSync(filePath, 'utf8');

//Parseamos el contenido YAML a un objeto de JavaScript
const config = yaml.parse(fileContent);

//Convertimos ese objeto a JSON (string)
const jsonConfig = JSON.stringify(config, null, 2);

//Mostramos en consola
console.log('Objeto JS:', config);        // Como objeto
console.log('JSON String:', jsonConfig);  // Como texto JSON
