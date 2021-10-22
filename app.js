const { createServer } = require('http');
const fs = require('fs');

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method == 'POST') {
        let finalData;
        let body = '';

        req.on('data', (data) => {
            body += data;
        });

        req.on('end', async() => {
            finalData = JSON.parse(body);
            if (req.url === '/api/v1/registrar') {
                const response = await registrar(finalData);
                res.end();
            }
        });
    }
})

server.listen(3000);

console.log('escuchando puerto 3000')


registrar = async(usuario) => {
    try {
        const data = fs.readFileSync('./baseDeDatos.json');
        const usuarios = JSON.parse(data);
        usuarios.push(usuario);
        fs.writeFileSync('./baseDeDatos.json', JSON.stringify(usuarios));
        return 'exito';
    } catch (e) {
        console.log(e);
        return 'error';
    }
}