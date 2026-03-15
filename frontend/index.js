console.log("JS carregou");
document.getElementById("formCadastro").addEventListener("submit", async function(e){

e.preventDefault();

console.log("Form enviado");

const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;
const senha = document.getElementById("senha").value;

const resposta = await fetch("http://localhost:3000/usuarios", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
nome,
email,
senha
})

});

const texto = await resposta.text();

document.getElementById("mensagem").innerText = texto;

});