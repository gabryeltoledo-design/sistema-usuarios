const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "sistema_usuarios"
});

db.connect((err) => {
    if (err) {
        console.log("Erro ao conectar no banco:", err);
    } else {
        console.log("Conectado ao MySQL!");
    }
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

// API cadastro de usuário
app.post("/usuarios", (req, res) => {

    console.log("ROTA /usuarios CHAMADA");

    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    const sql = "INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?)";

    db.query(sql, [nome, email, senha], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Erro ao cadastrar usuário");
        }

        res.send("Usuário cadastrado com sucesso!");

    });

});

// API ROTA LISTAR USUÁRIOS
app.get("/usuarios", (req, res) => {

const sql = "SELECT * FROM usuarios";

db.query(sql, (err, result) => {

if (err) {
return res.status(500).send(err);
}

res.json(result);

});

});

// API ROTA EXCLUIR USUARIO
app.delete("/usuarios/:id",(req,res)=>{

const {id} = req.params;

const sql = "DELETE FROM usuarios WHERE id = ?";

db.query(sql,[id],(err,result)=>{

if(err){
return res.status(500).send(err);
}

res.send("Usuário excluído");

});

});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});