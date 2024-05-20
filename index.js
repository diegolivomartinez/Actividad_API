const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const estudiantes = [
    { id: 1, nombre: 'Jorge', edad: 47, suscrito: false },
    { id: 2, nombre: 'Juan', edad: 23, suscrito: true },
    { id: 3, nombre: 'Maximiano', edad: 57, suscrito: false },
    { id: 4, nombre: 'Pedro Pedro', edad: 72, suscrito: false },
    { id: 5, nombre: 'Diego', edad: 20, suscrito: true },
    { id: 6, nombre: 'David', edad: 22, suscrito: true }
];

app.get('/api/estudiantes', (req, res) => {
    res.json(estudiantes); // Asegúrate de usar res.json() para enviar la respuesta en formato JSON
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/estudiantes', (req, res) => {
    const estudiante = {
        id: estudiantes.length + 1,
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        suscrito: req.body.suscrito === true
    };
    estudiantes.push(estudiante);
    res.send(estudiante);
});

app.delete('/api/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(c => c.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).send('Estudiante no encontrado');

    const index = estudiantes.indexOf(estudiante);
    estudiantes.splice(index, 1);
    res.send(estudiante);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));

