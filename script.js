/*
   SCRIPTS PRINCIPAIS - LANDING PAGE
   Empresa Digital */

//
// INICIALIZAÇÃO DAS ANIMAÇÕES AOS
//

// Configura e inicia a biblioteca de animações AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800, // Duração da animação em ms
    easing: "ease-in-out", // Tipo de easing
    once: true, // Animação acontece apenas uma vez
    mirror: false, // Elementos não animam ao voltar
    offset: 100, // Offset do trigger da animação
  });
});

//
// EFEITO DA NAVBAR AO ROLAR
//

// Adiciona classe 'scrolled' à navbar quando o usuário rola a página
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

//
// MENU MOBILE
//

// Referências aos elementos do menu
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

// Toggle do menu mobile ao clicar no botão
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    // Alterna o ícone entre hamburger e X
    const icon = this.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Fecha o menu mobile ao clicar em um link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

//
// SCROLL SUAVE PARA LINKS
//

// Implementa scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      // Desconsidera a altura da navbar fixa
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

//
// VALIDAÇÃO DO FORMULÁRIO
//

// Referência ao formulário de contato
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  // Evento de submit do formulário
  contactForm.addEventListener("submit", function (e) {
    // Validação client-side antes do envio

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    let isValid = true;

    // Validação do nome (mínimo 2 caracteres)
    if (name.value.trim().length < 2) {
      showError(name, "Nome deve ter pelo menos 2 caracteres");
      isValid = false;
    }

    // Validação do email (formato válido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError(email, "Por favor, insira um email válido");
      isValid = false;
    }

    // Validação da mensagem (mínimo 10 caracteres)
    if (message.value.trim().length < 10) {
      showError(message, "Mensagem deve ter pelo menos 10 caracteres");
      isValid = false;
    }

    // Impede o envio se houver erros
    if (!isValid) {
      e.preventDefault();
    }
  });

  // Validação em tempo real ao perder o foco do campo
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    // Remove erro quando o usuário começa a digitar
    input.addEventListener("input", function () {
      this.parentElement.classList.remove("error");
      const errorMsg = this.parentElement.querySelector(".error-message");
      if (errorMsg) {
        errorMsg.remove();
      }
    });
  });
}

// Função para validar campos individualmente
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  if (field.id === "name" && value.length < 2) {
    showError(field, "Nome deve ter pelo menos 2 caracteres");
    isValid = false;
  }

  if (field.id === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(field, "Por favor, insira um email válido");
      isValid = false;
    }
  }

  if (field.id === "message" && value.length < 10) {
    showError(field, "Mensagem deve ter pelo menos 10 caracteres");
    isValid = false;
  }

  return isValid;
}

// Função para exibir mensagem de erro
function showError(field, message) {
  field.parentElement.classList.add("error");

  // Remove mensagem de erro existente
  const existingError = field.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Cria e exibe nova mensagem de erro
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  field.parentElement.appendChild(errorDiv);
}

//
// ANIMAÇÃO DE CARREGAMENTO DO BOTÃO
//

// Adiciona efeito de loading ao botão de submit
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.type === "submit") {
      this.classList.add("loading");
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      // Restaura o texto original após 3 segundos
      setTimeout(() => {
        this.classList.remove("loading");
        this.innerHTML = originalText;
      }, 3000);
    }
  });
});

//
// EFEITO PARALLAX NA SEÇÃO HERO
//
// Move o elemento visual do hero suavemente ao rolar
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

//
// ANIMAÇÃO DOS CONTADORES
//

// Função para animaros números das estatísticas
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    // Extrai o número alvo do texto
    const target = parseInt(counter.textContent);
    const duration = 2000; // Duração total em ms
    const step = target / (duration / 16); // Passo por frame
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";
      }
    };

    updateCounter();
  });
}

// Intersection Observer para detectar quando a seção aparece na tela
const statsSection = document.querySelector(".about-stats");
if (statsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }, // Dispara quando 50% estiver visível
  );

  observer.observe(statsSection);
}

//
// INTERAÇÃO COM CARDS FLUTUANTES
//

// Efeito hover nos cards flutuantes do hero
document.querySelectorAll(".floating-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
    this.style.transition = "transform 0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

//
// INTERAÇÃO COM CARDS DE SERVIÇOS
//

// Efeito hover nos cards de serviços
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.zIndex = "10";
  });

  card.addEventListener("mouseleave", function () {
    this.style.zIndex = "1";
  });
});

//
// BOTÃO VOLTAR AO TOPO
//

// Cria e gerencia o botão de scroll to top
function createScrollTopButton() {
  // Cria o elemento do botão
  const btn = document.createElement("button");
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.className = "scroll-top-btn";
  btn.id = "scrollTopBtn";

  // Estilos inline do botão
  btn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1e90ff 0%, #6c5ce7 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    box-shadow: 0 5px 20px rgba(30, 144, 255, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
  `;

  document.body.appendChild(btn);

  // Controla visibilidade basedo no scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.style.opacity = "1";
      btn.style.visibility = "visible";
    } else {
      btn.style.opacity = "0";
      btn.style.visibility = "hidden";
    }
  });

  // Scroll suave ao topo ao clicar
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Inicializa o botão
createScrollTopButton();

//
// EVENTO DE CARREGAMENTO COMPLETO
//

// Executa quando todos os recursos estão carregados
window.addEventListener("load", () => {
  // Adiciona classe ao body para animações CSS
  document.body.classList.add("loaded");
});

// Mensagem no console para desenvolvedores
console.log(
  "%c🚀 Landing Page Empresa Digital",
  "font-size: 20px; font-weight: bold; color: #1e90ff;",
);
console.log(
  "%cDesenvolvido com ❤️ usando HTML, CSS e JavaScript",
  "color: #6c5ce7;",
);
