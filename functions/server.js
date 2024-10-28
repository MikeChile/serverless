// Importar dependencias
const express = require('express');
const fs = require('fs');
const path = require('path');

//netlify
const serverless = require('serverless-http');

// Crear aplicación Express
const app = express();

//configura quie mi logica se compile a la version final
app.use(express.static(path.join(__dirname, '..', '')));

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para subir CV
app.post('/upload-cv', (req, res) => {
    // Obtener archivo del cuerpo de la solicitud
    const archivo = req.body.archivo;

    // Verificar si se ha seleccionado un archivo
    if (!archivo) {
        return res.status(400).json({ error: 'No se ha seleccionado un archivo' });
    }

    // Generar nombre de archivo único
    const nombreArchivo = `${Date.now()}_cv.pdf`;

    // Ruta para guardar el archivo
    const ruta = path.join('..', 'uploads', nombreArchivo);

    // Crear directorio 'uploads' si no existe
    if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
        fs.mkdirSync(path.join(__dirname, 'uploads'));
    }

    // Escribir archivo en disco
    fs.writeFileSync(ruta, archivo, 'base64');

    // Retornar respuesta exitosa
    return res.json({ message: 'Archivo subido correctamente' });
});

// Puerto para escuchar
//const PORT = 3000;

// Iniciar servidor
//app.listen(PORT, () => {
//  console.log(`Servidor escuchando en el puerto ${PORT}`);
//});

//dejar el codigo disponible para utilizarlo sin servidor
console.log("hola mundo")
module.exports.handler = serverless(app);