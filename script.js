import getWord from "./words.js";

// Seleção de elementos DOM
const ContentButons = document.querySelector(".botons");
const AdiviWorks = document.querySelector(".adivi_works");
const img = document.querySelector("img");
const Dicas = document.querySelector(".clue");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalButton = document.getElementById("modal-button");
const novoJogoButton = document.querySelector(".novo_jogo");
const scoreDisplay = document.querySelector("#score");
const section1 = document.querySelector("#section1");
const gameSection = document.querySelector("#gameSection");
const startButton = document.querySelector("#showSection2");
const ForcaImg = document.querySelector("#forcaImg");


let indexImg;
let currentWord;
let score = 0; // Pontuação atual

const maiorPontuacaoDisplay = document.getElementById('maiorPontuacao'); // Exibição da maior pontuação

// Função para atualizar a pontuação e verificar a maior pontuação
function addPoints(points) {
    score += points; // Atualiza a pontuação atual
    scoreDisplay.textContent = score; // Exibe a pontuação atual

    // Verifica e armazena a maior pontuação
    let maiorPontuacao = localStorage.getItem('maiorPontuacao') || 0;
    if (score > maiorPontuacao) {
        localStorage.setItem('maiorPontuacao', score); // Atualiza a maior pontuação no LocalStorage
    }

    // Atualiza o display da maior pontuação
    maiorPontuacaoDisplay.textContent = localStorage.getItem('maiorPontuacao');
}

// Inicializa o display da maior pontuação ao carregar a página
function inicializarPontuacoes() {
    scoreDisplay.textContent = score; // Exibe a pontuação inicial
    maiorPontuacaoDisplay.textContent = localStorage.getItem('maiorPontuacao') || 0; // Exibe a maior pontuação salva
}

// Inicializa ao carregar a página
inicializarPontuacoes();


// Esconde o modal no início
modal.classList.add("hidden");

// Configura o botão START
startButton.addEventListener("click", () => {
    section1.style.display = "none"; // Oculta a tela inicial
    gameSection.classList.remove("hidden"); // Mostra o jogo
    init(); // Inicia o jogo
});

// Reiniciar jogo ao clicar no botão do modal
modalButton.onclick = () => {
    modal.classList.add("hidden");
    init();
};

// Inicializa o estado ao carregar
document.addEventListener("DOMContentLoaded", () => {
    section1.style.display = "block"; // Mostra a tela inicial

    gameSection.classList.add("hidden"); // Oculta o jogo
});

function init() {
    indexImg = 1; // Reseta o índice da imagem
    ForcaImg.src = `img1.png`; // Reseta a imagem inicial da forca
    img.src = `img1.png`; // Reseta a imagem principal
    AdiviWorks.textContent = ""; // Limpa as letras
    ContentButons.textContent = ""; // Limpa os botões
    scoreDisplay.textContent = score; // Mantém o score acumulado
    gerarSecAdiv(); // Gera a palavra
    gerarBotons(); // Gera os botões
}

function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.remove("hidden");
}





const vidasBtns = document.querySelectorAll(".vidas");
let vidas = 4; // Número de vidas disponíveis
let cronometros = Array(vidasBtns.length).fill(null); // Lista para gerenciar cronômetros de cada vida
let tempoRestauracao = 120; // Segundos para restaurar cada vida

// Atualiza o estado visual das vidas
function atualizarVidas() {
    vidasBtns.forEach((btn, index) => {
        const icone = btn.querySelector("i");
        const cronometro = btn.querySelector(".cronometro");

        if (index < vidas) {
            icone.className = "fa-solid fa-heart"; // Vida ativa
            cronometro.textContent = ""; // Sem cronômetro ativo
        } else {
            icone.className = "fa-regular fa-heart"; // Vida perdida
            if (cronometros[index]) {
                cronometro.textContent = cronometros[index].tempoAtual + "s"; // Mostra o tempo restante
            } else {
                cronometro.textContent = ""; // Sem cronômetro se não estiver restaurando
            }
        }
    });
}

// Inicia a restauração de vidas perdidas (não restaura as vidas já restauradas)
function iniciarRestauracao() {
    // Encontra a primeira vida perdida que ainda não está restaurando
    for (let i = 0; i < vidasBtns.length; i++) {
        if (i >= vidas && !cronometros[i]) { // Apenas começa a restaurar se a vida estiver perdida e sem cronômetro ativo
            let tempoAtual = tempoRestauracao; // Tempo de restauração da vida
            const cronometro = vidasBtns[i].querySelector(".cronometro"); // Elemento visual do cronômetro

            // Atualiza o cronômetro visualmente com o tempo inicial
            // cronometro.textContent = `${tempoAtual}s`;

            // Define o cronômetro para restaurar esta vida
            cronometros[i] = {
                intervalo: setInterval(() => {
                    if (tempoAtual <= 0) {
                        clearInterval(cronometros[i].intervalo); // Para o cronômetro
                        cronometros[i] = null; // Libera o índice do cronômetro

                        vidas++; // Incrementa o número de vidas
                        atualizarVidas(); // Atualiza visualmente

                        // Reabre o teclado se pelo menos uma vida for restaurada
                        if (vidas > 0) {
                            ContentButons.classList.remove("teclado-fechado");
                        }

                        // Reinicia o processo de restauração para outra vida, se necessário
                        iniciarRestauracao();
                    } else {
                        tempoAtual--; // Decrementa o tempo restante
                        // cronometro.textContent = `${tempoAtual}s`; // Atualiza visualmente
                    }
                }, 1000), // Intervalo de 1 segundo
                tempoAtual: tempoRestauracao // Armazena o tempo restante
            };
            break; // Sai do loop após iniciar a restauração da primeira vida perdida
        }
    }
}

// Perde uma vida e inicia a restauração da primeira vida perdida
function perderVida() {
    if (vidas > 0) {
        vidas--; // Decrementa o número de vidas
        atualizarVidas(); // Atualiza visualmente

        // Inicia a restauração assim que qualquer vida for perdida
        if (vidas < vidasBtns.length) {
            iniciarRestauracao();
        }
    }

    // Fecha o teclado caso todas as vidas acabem
    if (vidas === 0) {
        ContentButons.classList.add("teclado-fechado");
    }
}

// Função para resetar o jogo
function resetarJogo() {
    vidas = 4; // Restaura todas as vidas ao máximo
    cronometros.forEach((cronometro, index) => {
        if (cronometro) clearInterval(cronometro.intervalo); // Para qualquer cronômetro ativo
        cronometros[index] = null; // Reseta o array de cronômetros
    });
    atualizarVidas(); // Atualiza visualmente
    ContentButons.classList.remove("teclado-fechado"); // Reabre o teclado
}



// Função chamada ao errar uma resposta
function wrongAnswer() {
    indexImg++;
    if (indexImg <= 7) {
        ForcaImg.src = `img${indexImg}.png`;
    }

    if (indexImg === 7) {
        setTimeout(() => {
            showModal(`Errou!! A palavra é: ${currentWord}`);
        }, 100);
        console.log("Vida perdida!");
        perderVida();
    }
}

function verifyLetter(letter) {
    const spans = document.querySelectorAll(`[word="${letter.toUpperCase()}"]`);

    if (spans.length > 0) {
        spans.forEach((span) => {
            span.textContent = letter;
        });

        // Verifica se todas as letras foram reveladas
        const allRevealed = Array.from(AdiviWorks.children).every(
            (span) => span.textContent !== "_"
        );

        if (allRevealed) {
            // Adiciona 1 ponto ao vencer
            addPoints(1);
            setTimeout(() => {
                showModal("Acertou!!");
            }, 100);
        }
    } else {
        wrongAnswer();
    }
}

// Chama a função de inicialização das vidas para garantir que o estado de todas comece completo
atualizarVidas();


function gerarSecAdiv() {
    const { word, clue } = getWord();
    currentWord = word; // Salva a palavra atual

    const wordWithoutAccent = word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    Array.from(wordWithoutAccent).forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = "_";
        span.setAttribute("word", letter.toUpperCase());
        AdiviWorks.appendChild(span);
    });

    Dicas.textContent = ` ${clue}`;
}

function gerarBotons() {
    const rows = [
        "qwertyuiop", // Primeira linha
        "asdfghjkl",  // Segunda linha
        "zxcvbnm"     // Terceira linha
    ];

    const botonsContainer = document.querySelector(".botons"); // Obtém a div com a classe botons
    let textoDigitado = ""; // Variável para armazenar as letras digitadas

    // Cria um botão para cada letra
    rows.forEach(row => {
        row.split("").forEach(letter => {
            const button = document.createElement("button");
            button.textContent = letter;

            // Adiciona a letra à variável textoDigitado quando o botão é clicado
            button.addEventListener("click", () => {
                textoDigitado += letter; // Armazena a letra na variável
                console.log("Texto digitado: ", textoDigitado); // Exibe o texto digitado no console (pode ser usado para outras manipulações)
            });

            // Adiciona o botão ao container de botões
            botonsContainer.appendChild(button);
        });
    });




    // Limpa o container antes de gerar os botões
    ContentButons.textContent = "";

    rows.forEach((row) => {
        const rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.justifyContent = "center";
        rowDiv.style.marginBottom = "8px";
        rowDiv.style.gap = "7px";

        Array.from(row).forEach((letter) => {
            const btn = document.createElement("button");
            btn.textContent = letter;
            btn.onclick = () => {
                btn.disabled = true;
                btn.style.background = "yellow";
                btn.style.color = "blue";
                verifyLetter(letter);
            };
            rowDiv.appendChild(btn);
        });

        ContentButons.appendChild(rowDiv);
    });

    // Verifica se o número de vidas é 0 para aplicar o "modo fechado"
  
}






// Canvas de cobras (otimização com intervalos e animação eficiente)
const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snakes = [];

// Classe para representar uma cobra
class Snake {
    constructor(x, y, speed, length, segmentSize) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.length = length;
        this.segmentSize = segmentSize;
        this.body = Array.from({ length }, (_, i) => ({
            x: x,
            y: y - i * segmentSize,
        }));
    }

    draw() {
        ctx.fillStyle = 'blue';
        this.body.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, this.segmentSize, this.segmentSize);
        });
    }

    update() {
        this.body.unshift({ x: this.x, y: this.y });
        this.y += this.speed;

        if (this.body.length > this.length) {
            this.body.pop();
        }

        if (this.y > canvas.height) {
            this.y = -this.segmentSize;
            this.x = Math.random() * canvas.width;
            this.body = Array.from({ length: this.length }, (_, i) => ({
                x: this.x,
                y: this.y - i * this.segmentSize,
            }));
        }
    }
}
// Adiciona cobras
for (let i = 0; i < 50; i++) {
    const length = Math.floor(Math.random() * 5) + 3;
    const segmentSize = 4;
    const speed = Math.random() * 2 + 2;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    snakes.push(new Snake(x, y, speed, length, segmentSize));
}
// Função para animar as cobras
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snakes.forEach(snake => {
        snake.update();
        snake.draw();
    });
    requestAnimationFrame(animate);
}
// Redimensiona o canvas quando a janela for redimensionada
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// Inicia a animação
animate();


// Selecionar elementos
const cadastroBtn = document.getElementById("cadastro-btn");
const cadastroModal = document.getElementById("cadastro-modal");
const salvarBtn = document.getElementById("salvar-btn");
const excluirBtn = document.getElementById("excluir-btn");
const fecharBtn = document.getElementById("fechar-btn");
const actionArea = document.getElementById("action-area");

// Função para abrir o modal
function abrirModal() {
  cadastroModal.classList.remove("hidden");
  document.querySelector('.login').classList.add('show');
}

// Função para fechar o modal
function fecharModal() {
    event.preventDefault();
  cadastroModal.classList.add("hidden");
  document.querySelector('.login').classList.remove('show');
}

// Função para limpar os campos do formulário
function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("sobrenome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("turma").value = "";
}

// Verificar se há usuário no localStorage e atualizar a interface
function carregarUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario) {
    actionArea.innerHTML = `<button id="user-name-btn">${usuario.nome}</button>`;
    const userNameBtn = document.getElementById("user-name-btn");

    // Aplicar o estilo ao botão de nome (se necessário)
    userNameBtn.classList.add("user-name-btn-style");

    // Abrir modal com os dados do usuário ao clicar no nome
    userNameBtn.addEventListener("click", () => {
      preencherCampos(usuario);
      abrirModal();
    });
  } else {
    actionArea.innerHTML = `<button id="cadastro-btn">Cadastrar</button>`;
    const novoCadastroBtn = document.getElementById("cadastro-btn");
    novoCadastroBtn.addEventListener("click", abrirModal);
  }
}

// Preencher os campos com os dados do usuário
function preencherCampos(usuario) {
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("sobrenome").value = usuario.sobrenome;
  document.getElementById("idade").value = usuario.idade;
  document.getElementById("turma").value = usuario.turma;
}

// Salvar os dados no localStorage
salvarBtn.addEventListener("click", () => {
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const idade = document.getElementById("idade").value;
  const turma = document.getElementById("turma").value;

  if (nome && sobrenome && idade && turma) {
    const usuario = {
      nome,
      sobrenome,
      idade,
      turma,
    };

    // Salvar no localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Dados salvos com sucesso!");
    carregarUsuario();
    fecharModal();
    limparCampos();
  } else {
    alert("Por favor, preencha todos os campos!");
  }
});

// Excluir os dados do usuário
excluirBtn.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja excluir sua conta?")) {
    // Remover os dados do localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("maiorPontuacao"); // Remove a maior pontuação
    actionArea.innerHTML = `<button id="cadastro-btn">Cadastrar</button>`;
    const novoCadastroBtn = document.getElementById("cadastro-btn");
    novoCadastroBtn.addEventListener("click", abrirModal);
    fecharModal();
    limparCampos();
  }
});

// Fechar o modal
fecharBtn.addEventListener("click", fecharModal);

// Inicializar a interface
carregarUsuario();
cadastroBtn.addEventListener("click", abrirModal);




