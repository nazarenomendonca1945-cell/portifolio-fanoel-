/*
Uso de IA: utilizei o ChatGPT como apoio para organizar a estrutura do projeto,
revisar requisitos e compreender exemplos de HTML, CSS e JavaScript.
O código foi organizado para ser estudado e explicado durante a defesa.
*/

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const themeToggle = document.querySelector("#themeToggle");
const contactForm = document.querySelector("#contactForm");
const saudacao = document.querySelector("#saudacao");
const projectsGrid = document.querySelector("#projectsGrid");
const backTop = document.querySelector("#backTop");
const projectDialog = document.querySelector("#projectDialog");

const projetos = [
  {
    titulo: "Tabela Periódica Inclusiva",
    descricao: "Projeto de tabela periódica interativa, pensado para facilitar o aprendizado e tornar a consulta aos elementos químicos mais acessível. Reúne organização visual e recursos interativos.",
    tecnologias: ["HTML", "CSS", "JavaScript", "Figma"],
    imagem: "img/tabela-periodica.png",
    url: "https://share.google/C1pXlSYUro9CQ85GA",
    alt: "Prévia do projeto Tabela Periódica Inclusiva",
    detalhes: "Este projeto foi desenvolvido como uma proposta de apoio ao aprendizado de Química, com foco em organização, clareza visual e inclusão."
  },
  {
    titulo: "Clínica Vida Saudável",
    descricao: "Página institucional de uma clínica, criada para praticar estruturação de conteúdo, HTML semântico e estilização responsiva.",
    tecnologias: ["HTML", "CSS"],
    imagem: "img/clinica.png",
    alt: "Prévia do site Clínica Vida Saudável",
    detalhes: "O projeto apresenta uma página de clínica com informações organizadas e uma interface simples, clara e adaptável a diferentes telas."
  },
  {
    titulo: "Vision Wear",
    descricao: "Projeto de site para uma marca de roupas, com identidade visual própria e componentes de interface.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    imagem: "img/vision-wear.png",
    url: "https://www.figma.com/proto/o7PvJSpqV4gIZjQ8zMw6wK/landing-page-ti?node-id=8-2&starting-point-node-id=8%3A2",
    alt: "Prévia do site Vision Wear",
    detalhes: "O objetivo foi praticar a criação de uma identidade visual e a construção de uma página de apresentação de marca."
  }
];

function alternarMenu() {
  const aberto = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(aberto));
  menuToggle.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
}

function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) return "Bom dia";
  if (hora >= 12 && hora < 18) return "Boa tarde";
  return "Boa noite";
}

function atualizarSaudacao() {
  saudacao.textContent = `${obterSaudacao(new Date().getHours())}! Seja bem-vindo.`;
}

function aplicarTema(tema) {
  const claro = tema === "claro";
  document.body.classList.toggle("light-theme", claro);
  themeToggle.textContent = claro ? "☾" : "☀";
  themeToggle.setAttribute("aria-pressed", String(claro));
  themeToggle.setAttribute("aria-label", claro ? "Ativar modo escuro" : "Ativar modo claro");
}

function alternarTema() {
  const novoTema = document.body.classList.contains("light-theme") ? "escuro" : "claro";
  aplicarTema(novoTema);
  localStorage.setItem("temaPortfolio", novoTema);
}

function abrirDetalhesProjeto(projeto) {
  document.querySelector("#dialogImage").src = projeto.imagem;
  document.querySelector("#dialogImage").alt = projeto.alt;
  document.querySelector("#dialogTitle").textContent = projeto.titulo;
  document.querySelector("#dialogDescription").textContent = projeto.descricao;
  document.querySelector("#dialogNote").textContent = projeto.detalhes;
  const tags = document.querySelector("#dialogTags");
  tags.replaceChildren();
  projeto.tecnologias.forEach(tecnologia => {
    const item = document.createElement("li");
    item.textContent = tecnologia;
    tags.appendChild(item);
  });
  projectDialog.showModal();
}

function renderizarProjetos(filtro = "todos") {
  projectsGrid.replaceChildren();
  const filtrados = projetos.filter(projeto =>
    filtro === "todos" || projeto.tecnologias.some(tec => tec.toLowerCase() === filtro)
  );

  filtrados.forEach(projeto => {
    const article = document.createElement("article");
    article.className = "project-card";

    const imagem = document.createElement("img");
    imagem.src = projeto.imagem;
    imagem.alt = projeto.alt;
    imagem.loading = "lazy";

    const content = document.createElement("div");
    content.className = "project-content";

    const titulo = document.createElement("h3");
    titulo.textContent = projeto.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = projeto.descricao;

    const lista = document.createElement("ul");
    lista.className = "tags";
    lista.setAttribute("aria-label", "Tecnologias utilizadas");
    projeto.tecnologias.forEach(tecnologia => {
      const item = document.createElement("li");
      item.textContent = tecnologia;
      lista.appendChild(item);
    });

    const link = document.createElement(projeto.url ? "a" : "button");
    link.className = "project-link";
    if (projeto.url) {
      link.href = projeto.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Abrir projeto →";
      link.setAttribute("aria-label", `Abrir ${projeto.titulo} em uma nova aba`);
    } else {
      link.type = "button";
      link.textContent = "Ver detalhes do projeto →";
      link.addEventListener("click", () => abrirDetalhesProjeto(projeto));
    }

    content.append(titulo, descricao, lista, link);
    article.append(imagem, content);
    projectsGrid.appendChild(article);
  });
}

function mostrarErro(idCampo, mensagem) {
  const campo = document.querySelector(`#${idCampo}`);
  const erro = document.querySelector(`#${idCampo}Erro`);
  if (campo) {
    campo.classList.add("input-error");
    campo.setAttribute("aria-invalid", "true");
  }
  if (erro) erro.textContent = mensagem;
}

function limparErros() {
  contactForm.querySelectorAll("input, textarea").forEach(campo => {
    campo.classList.remove("input-error");
    campo.removeAttribute("aria-invalid");
  });
  ["nome", "email", "mensagem", "consentimento"].forEach(id => {
    const erro = document.querySelector(`#${id}Erro`);
    if (erro) erro.textContent = "";
  });
}

function validarFormulario() {
  limparErros();
  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const mensagem = document.querySelector("#mensagem").value.trim();
  const consentimento = document.querySelector("#consentimento").checked;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  let valido = true;

  if (!nome) { mostrarErro("nome", "Digite seu nome."); valido = false; }
  if (!email) { mostrarErro("email", "Digite seu e-mail."); valido = false; }
  else if (!emailValido) { mostrarErro("email", "Digite um endereço de e-mail válido."); valido = false; }
  if (!mensagem) { mostrarErro("mensagem", "Digite sua mensagem."); valido = false; }
  else if (mensagem.length < 10) { mostrarErro("mensagem", "Escreva uma mensagem com pelo menos 10 caracteres."); valido = false; }
  if (!consentimento) { mostrarErro("consentimento", "Marque o consentimento para continuar."); valido = false; }

  return valido;
}

/*
 * Envio do formulário pelo Web3Forms.
 * A Access Key do Web3Forms está configurada no campo oculto do index.html.
 */
async function processarFormulario(event) {
  event.preventDefault();
  const status = document.querySelector("#formStatus");
  const botao = contactForm.querySelector('[type="submit"]');
  status.className = "form-status";
  status.textContent = "";

  if (!validarFormulario()) return;

  const accessKey = contactForm.querySelector('[name="access_key"]').value.trim();
  if (!accessKey) {
    status.classList.add("error");
    status.textContent = "Falta configurar a chave de envio. Consulte o arquivo LEIA-ME.";
    return;
  }

  const dados = new FormData(contactForm);
  dados.set("name", document.querySelector("#nome").value.trim());
  dados.set("email", document.querySelector("#email").value.trim());
  dados.set("message", document.querySelector("#mensagem").value.trim());

  botao.disabled = true;
  botao.textContent = "Enviando...";
  status.textContent = "Enviando sua mensagem...";

  try {
    const resposta = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: dados
    });
    const resultado = await resposta.json();

    if (resposta.ok && resultado.success) {
      status.classList.add("success");
      status.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
      contactForm.reset();
    } else {
      throw new Error(resultado.message || "O serviço não aceitou o envio.");
    }
  } catch (erro) {
    status.classList.add("error");
    status.textContent = "Não foi possível enviar agora. Confira sua conexão e a Access Key e tente novamente.";
  } finally {
    botao.disabled = false;
    botao.textContent = "Enviar mensagem";
  }
}

function atualizarAno() {
  document.querySelector("#anoAtual").textContent = new Date().getFullYear();
}

function iniciarDigitacao() {
  const elemento = document.querySelector("#textoDigitado");
  if (!elemento) return;
  const texto = "crio experiências para a web.";
  let indice = 0;
  elemento.textContent = "";
  function digitar() {
    if (indice < texto.length) {
      elemento.textContent += texto.charAt(indice++);
      setTimeout(digitar, 55);
    }
  }
  digitar();
}

function controlarVoltarTopo() {
  backTop.classList.toggle("show", window.scrollY > 500);
}

menuToggle.addEventListener("click", alternarMenu);
themeToggle.addEventListener("click", alternarTema);
contactForm.addEventListener("submit", processarFormulario);
window.addEventListener("scroll", controlarVoltarTopo);

document.querySelector("#closeProjectDialog").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", event => {
  if (event.target === projectDialog) projectDialog.close();
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".filter-btn").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
    botao.classList.add("active");
    renderizarProjetos(botao.dataset.filter);
  });
});

aplicarTema(localStorage.getItem("temaPortfolio") || "escuro");
atualizarSaudacao();
atualizarAno();
renderizarProjetos();
iniciarDigitacao();
controlarVoltarTopo();
