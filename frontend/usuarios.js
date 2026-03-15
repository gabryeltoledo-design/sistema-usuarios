async function carregarUsuarios(){

const resposta = await fetch("http://localhost:3000/usuarios");

const usuarios = await resposta.json();

const lista = document.getElementById("listaUsuarios");

const total = document.getElementById("totalUsuarios");

lista.innerHTML = "";

/* contador */
total.innerText = usuarios.length;

usuarios.forEach(usuario => {

lista.innerHTML += `
<tr>
<td>${usuario.nome}</td>
<td>${usuario.email}</td>
<td>
<button onclick="excluirUsuario(${usuario.id})">Excluir</button>
</td>
</tr>
`;

});

}

async function excluirUsuario(id){

await fetch(`http://localhost:3000/usuarios/${id}`,{
method:"DELETE"
});

alert("Usuário excluído com sucesso");

carregarUsuarios();

}

carregarUsuarios();

function filtrarUsuarios(){

const filtro = document.getElementById("buscarUsuario").value.toLowerCase();

const linhas = document.querySelectorAll("#listaUsuarios tr");

linhas.forEach(linha => {

const nome = linha.children[0].textContent.toLowerCase();

if(nome.includes(filtro)){
linha.style.display = "";
}else{
linha.style.display = "none";
}

});

}