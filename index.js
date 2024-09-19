const express = require("express");
const app = express();
const cors = require('cors');

// Configurações do CORS
app.use(cors());
app.use(express.json()); // Para lidar com JSON no corpo das requisições

// Middleware para configurar CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let nomes = [
    { nome: "Eliel" }
];

// Adicionar Nome
app.post("/nomes", (req, res) => {
    const nome = req.query.nome; // Obtém o nome do parâmetro de consulta

    if (nome && !nomes.some(item => item.nome === nome)) {
        nomes.push({ nome });
        res.status(201).json({ message: 'Nome adicionado com sucesso', nomes });
    } else {
        res.status(400).json({ message: 'Nome já existe ou não foi fornecido' });
    }
});

// Editar Nome
app.put("/nomes", (req, res) => {
    const oldNome = req.query.oldNome; // Obtém o nome antigo do parâmetro de consulta
    const newNome = req.query.newNome; // Obtém o novo nome do parâmetro de consulta

    let nomeIndex = nomes.findIndex(item => item.nome === oldNome);

    if (nomeIndex !== -1 && newNome) {
        nomes[nomeIndex] = { nome: newNome };
        res.json({ message: 'Nome editado com sucesso', nomes });
    } else {
        res.status(404).json({ message: 'Nome não encontrado ou novo nome não fornecido' });
    }
});

// Deletar Nome
app.delete("/nomes", (req, res) => {
    const nome = req.query.nome; // Obtém o nome do parâmetro de consulta

    let nomeIndex = nomes.findIndex(item => item.nome === nome);

    if (nomeIndex !== -1) {
        nomes.splice(nomeIndex, 1);
        res.json({ message: 'Nome deletado com sucesso', nomes });
    } else {
        res.status(404).json({ message: 'Nome não encontrado' });
    }
});

// Buscar Nome
app.get("/nomes", (req, res) => {
    const nome = req.query.nome; // Obtém o nome do parâmetro de consulta

    if (nome) {
        const result = nomes.filter(item => item.nome.includes(nome));
        res.json(result);
    } else {
        res.json(nomes);
    }
});

app.listen(8080, () => {
    let data = new Date();
    console.log("Servidor node iniciado em: " + data);
});
