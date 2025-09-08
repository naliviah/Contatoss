const API_URL = "https://68bed4719c70953d96edc4c2.mockapi.io/api/alunos";


const nomeInput = document.getElementById("nome");
const telefoneInput = document.getElementById("telefone");
const cidadeInput = document.getElementById("cidade");
const fotoInput = document.getElementById("foto");
const botao = document.getElementById("botao");
const contatosSection = document.getElementById("contatos");


async function carregarContatos() {
    contatosSection.innerHTML = "<h2>Contatos Salvos</h2><p>Carregando...</p>";

    try {
        const response = await fetch(API_URL);
        const contatos = await response.json();

        if (contatos.length === 0) {
            contatosSection.innerHTML = "<h2>Contatos Salvos</h2><p>Nenhum contato encontrado</p>";
            return;
        }

        contatosSection.innerHTML = "<h2>Contatos Salvos</h2>";

        contatos.forEach(c => {
            const contatoDiv = document.createElement("div");
            contatoDiv.classList.add("contato");

            contatoDiv.innerHTML = `
                <img src="${c.foto || 'https://via.placeholder.com/70'}" alt="foto de ${c.nome}">
                <div>
                    <p><strong>Nome:</strong> ${c.nome}</p>
                    <p><strong>Telefone:</strong> ${c.telefone}</p>
                    <p><strong>Cidade:</strong> ${c.cidade}</p>
                </div>
        
            `;

            contatosSection.appendChild(contatoDiv);
        });

 
    } catch (error) {
        contatosSection.innerHTML = "<h2>Contatos Salvos</h2><p>Erro ao carregar contatos</p>";
        console.error(error);
    }
}


async function adicionarContato() {
    const novoContato = {
        nome: nomeInput.value.trim(),
        telefone: telefoneInput.value.trim(),
        cidade: cidadeInput.value.trim(),
        foto: fotoInput.value.trim()
    };

    if (!novoContato.nome || !novoContato.telefone || !novoContato.cidade) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoContato)
        });

        nomeInput.value = "";
        telefoneInput.value = "";
        cidadeInput.value = "";
        fotoInput.value = "";

        carregarContatos();
    } catch (error) {
        alert("Erro ao cadastrar contato!");
        console.error(error);
    }
}

botao.addEventListener("click", adicionarContato);


carregarContatos();
