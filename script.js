// Seleciona o botão de alternar tema (presente em todas as páginas)
const themeToggle = document.getElementById('themeToggle');

/**
 * Aplica o tema salvo no localStorage ao carregar a página,
 * para que a preferência do usuário persista entre navegações.
 */
function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem('tema'); // lê preferência salva
  if (temaSalvo === 'dark') {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☾'; // ícone de lua no escuro
  } else {
    if (themeToggle) themeToggle.textContent = '☀'; // ícone de sol no claro
  }
}

/**
 * Alterna entre tema claro e escuro ao clicar no botão,
 * e salva a escolha no localStorage.
 */
if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark'); // adiciona/remove a classe "dark"

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('tema', 'dark'); // salva preferência
      themeToggle.textContent = '☾';        // atualiza ícone
    } else {
      localStorage.setItem('tema', 'light');
      themeToggle.textContent = '☀';
    }
  });
}

// Aplica o tema ao carregar qualquer página
aplicarTemaSalvo();

// VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO

const form = document.getElementById('contactForm');

if (form) {

  // Referências aos campos do formulário
  const campoNome     = document.getElementById('nome');
  const campoEmail    = document.getElementById('email');
  const campoMensagem = document.getElementById('mensagem');

  // Referências às mensagens de erro
  const erroNome     = document.getElementById('erroNome');
  const erroEmail    = document.getElementById('erroEmail');
  const erroMensagem = document.getElementById('erroMensagem');

  // Referências ao modal de confirmação
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose   = document.getElementById('modalClose');

  /**
   * Limpa o estado de erro de um campo específico.
   * @param {HTMLElement} campo - o input ou textarea
   * @param {HTMLElement} msgErro - o span com a mensagem de erro
   */
  function limparErro(campo, msgErro) {
    campo.classList.remove('error'); // remove borda vermelha
    msgErro.textContent = '';        // apaga texto de erro
  }

  /**
   * Marca um campo como inválido: borda vermelha + texto de erro.
   * @param {HTMLElement} campo
   * @param {HTMLElement} msgErro
   * @param {string} mensagem - texto a exibir
   */
  function mostrarErro(campo, msgErro, mensagem) {
    campo.classList.add('error');
    msgErro.textContent = mensagem;
  }

  /**
   * Valida o formato de e-mail com expressão regular.
   * Formato esperado: usuario@dominio.com
   * @param {string} email
   * @returns {boolean}
   */
  function emailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Remove erros em tempo real enquanto o usuário digita,
   * melhorando a experiência de interação.
   */
  campoNome.addEventListener('input', function () {
    limparErro(campoNome, erroNome);
  });
  campoEmail.addEventListener('input', function () {
    limparErro(campoEmail, erroEmail);
  });
  campoMensagem.addEventListener('input', function () {
    limparErro(campoMensagem, erroMensagem);
  });

  /**
   * Intercepta o envio do formulário para fazer validação manual.
   * Evita o comportamento padrão do navegador (recarregar a página).
   */
  form.addEventListener('submit', function (evento) {
    evento.preventDefault(); // impede recarregamento da página

    // Obtém os valores dos campos (sem espaços extras)
    const nome     = campoNome.value.trim();
    const email    = campoEmail.value.trim();
    const mensagem = campoMensagem.value.trim();

    let formularioValido = true; // assume válido; muda se encontrar erro

    // Validação do nome
    if (nome === '') {
      mostrarErro(campoNome, erroNome, 'Por favor, informe seu nome.');
      formularioValido = false;
    } else {
      limparErro(campoNome, erroNome);
    }

    // Validação do e-mail
    if (email === '') {
      mostrarErro(campoEmail, erroEmail, 'Por favor, informe seu e-mail.');
      formularioValido = false;
    } else if (!emailValido(email)) {
      mostrarErro(campoEmail, erroEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
      formularioValido = false;
    } else {
      limparErro(campoEmail, erroEmail);
    }

    // --- Validação da mensagem ---
    if (mensagem === '') {
      mostrarErro(campoMensagem, erroMensagem, 'Por favor, escreva uma mensagem.');
      formularioValido = false;
    } else {
      limparErro(campoMensagem, erroMensagem);
    }

    // Se tudo válido: simula envio
    if (formularioValido) {
      form.reset();                          // limpa todos os campos
      modalOverlay.classList.add('active'); // exibe o modal de sucesso
    }
  });

  /**
   * Fecha o modal ao clicar no botão "Fechar".
   */
  if (modalClose) {
    modalClose.addEventListener('click', function () {
      modalOverlay.classList.remove('active'); // esconde o modal
    });
  }

  /**
   * Fecha o modal ao clicar fora dele (no overlay escuro).
   */
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (evento) {
      // Verifica se o clique foi no overlay e não no conteúdo interno do modal
      if (evento.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

}