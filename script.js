let layoutState = 'brisa';
let clickCount = 0;
let isEditingEnabled = false;
let isPlayerOpen = false;

// FUNÇÃO DE RITUAIS SENSORIAIS EDITORIAIS (Bossa & Brisa Exclusivo)
function triggerSensoryRitual(ritual) {
    const mainBody = document.getElementById('main-body');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const heroTag = document.getElementById('hero-tag');

    // Elementos de composição do Card Visual
    const visualCard = document.getElementById('visual-card');
    const visualBadgeText = document.getElementById('visual-badge-text');

    // Elementos de suporte de efeitos ambientais
    const leaves = document.getElementById('swaying-leaves-ambient');
    const steam = document.getElementById('steam-ambient');
    const bubbles = document.getElementById('bubbles-ambient');

    // Resetar estados de efeitos se os elementos existirem
    if (leaves) leaves.style.display = 'none';
    if (steam) steam.style.display = 'none';
    if (bubbles) {
        bubbles.style.display = 'none';
        bubbles.innerHTML = '';
    }

    // Resetar todos os botões de rituais para estilo não-ativo
    const rBtns = ['coqueiro', 'drink', 'feijoada', 'cafe'];
    rBtns.forEach(b => {
        const btn = document.getElementById(`ritual-btn-${b}`);
        if (btn) {
            btn.className = "group flex items-center gap-2 pb-1 border-b border-transparent hover:border-forestGreen transition-all duration-300 interactive-target font-semibold text-stone-500";
        }
    });

    // Ativar o botão atual
    const activeBtn = document.getElementById(`ritual-btn-${ritual}`);
    if (activeBtn) {
        activeBtn.className = "group flex items-center gap-2 pb-1 border-b-2 border-vibrantOrange transition-all duration-300 interactive-target font-bold text-forestGreen";
    }

    // Ativa a ilustração vetorial correspondente
    setActiveIllustration(ritual);

    // Transições de Rituais
    if (ritual === 'coqueiro') {
        if (leaves) leaves.style.display = 'block';
        if (mainBody) mainBody.className = "bg-creamWhite text-forestGreen font-canvasans antialiased theme-transition noise-texture selection:bg-vibrantOrange selection:text-white";

        if (heroTag) heroTag.innerHTML = `<span class="w-2 h-2 rounded-full bg-vibrantOrange"></span><span id="txt-hero-tag" class="editable-field">🌴 RITUAL MARÍTIMO ATIVADO</span>`;
        if (heroTitle) heroTitle.innerHTML = `Brisa suave, <br/><span class="text-vibrantOrange italic font-normal">marcas que marcam</span> <br/>como o mar.`;

        if (visualCard) visualCard.style.backgroundColor = "rgba(59, 81, 41, 0.08)";
        if (visualBadgeText) visualBadgeText.innerText = "Maresia Co.";

    } else if (ritual === 'drink') {
        if (bubbles) {
            bubbles.style.display = 'block';
            generateBubbles();
        }
        if (mainBody) mainBody.className = "bg-creamWhite text-vibrantOrange font-canvasans antialiased theme-transition noise-texture selection:bg-skyBlue selection:text-white";

        if (heroTag) heroTag.innerHTML = `<span class="w-2 h-2 rounded-full bg-skyBlue"></span><span id="txt-hero-tag" class="editable-field">🍹 PÉ NA AREIA & CAIPIRINHA</span>`;
        if (heroTitle) heroTitle.innerHTML = `Refresque a alma <br/><span class="text-forestGreen italic font-normal">brinde ao novo</span> <br/>com orgulho.`;

        if (visualCard) visualCard.style.backgroundColor = "rgba(231, 93, 11, 0.08)";
        if (visualBadgeText) visualBadgeText.innerText = "Sunset Hour";

    } else if (ritual === 'feijoada') {
        if (mainBody) mainBody.className = "bg-creamWhite text-deepWine font-canvasans antialiased theme-transition noise-texture selection:bg-warmGold selection:text-deepWine";

        if (heroTag) heroTag.innerHTML = `<span class="w-2 h-2 rounded-full bg-warmGold"></span><span id="txt-hero-tag" class="editable-field">🍲 TRADIÇÃO, CORPO E ALMA</span>`;
        if (heroTitle) heroTitle.innerHTML = `Design consistente, <br/><span class="text-vibrantOrange italic font-normal">receita completa</span> <br/>para vencer.`;

        if (visualCard) visualCard.style.backgroundColor = "rgba(80, 5, 0, 0.08)";
        if (visualBadgeText) visualBadgeText.innerText = "Receita de Legado";

    } else if (ritual === 'cafe') {
        if (steam) steam.style.display = 'block';
        if (mainBody) mainBody.className = "bg-creamWhite text-forestGreen font-canvasans antialiased theme-transition noise-texture selection:bg-vibrantOrange selection:text-white";

        if (heroTag) heroTag.innerHTML = `<span class="w-2 h-2 rounded-full bg-vibrantOrange"></span><span id="txt-hero-tag" class="editable-field">☕ O RITUAL DO CAFEZINHO</span>`;
        if (heroTitle) heroTitle.innerHTML = `Ideias quentes, <br/><span class="text-warmGold italic font-normal">café fresco</span> <br/>e grandes negócios.`;

        if (visualCard) visualCard.style.backgroundColor = "rgba(253, 178, 68, 0.12)";
        if (visualBadgeText) visualBadgeText.innerText = "Foco & Conversa";
    }

    // Se estiver em modo edição, garante que novos elementos criados herdem comportamento contenteditable
    if (isEditingEnabled) {
        enableVisualEditorMode();
    }
}

// FUNÇÃO AUXILIAR PARA ATIVAR A ILUSTRAÇÃO RELEVANTE COM TRANSIÇÃO FLUIDA
function setActiveIllustration(id) {
    const illustrations = ['default', 'coqueiro', 'drink', 'feijoada', 'cafe'];
    illustrations.forEach(item => {
        const svg = document.getElementById(`svg-${item}`);
        if (svg) {
            if (item === id) {
                svg.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
                svg.classList.add('opacity-100', 'scale-100');
            } else {
                svg.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
                svg.classList.remove('opacity-100', 'scale-100');
            }
        }
    });
}

// Auxiliar para gerar bolhas no drink
function generateBubbles() {
    const container = document.getElementById('bubbles-ambient');
    if (!container) return;
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 15 + 5;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.animationDelay = Math.random() * 4 + 's';
        bubble.style.animationDuration = Math.random() * 5 + 3 + 's';
        container.appendChild(bubble);
    }
}

// SISTEMA DO CURSOR PERSONALIZADO (Segue física fluida com atraso leve)
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.15;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;

    ballX += distX * speed;
    ballY += distY * speed;

    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        cursor.style.left = ballX + 'px';
        cursor.style.top = ballY + 'px';
    }
    if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(animateCursor);
    }
}

// Inicializar cursor fora do ambiente de testes puro
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const cursorEl = document.getElementById('custom-cursor');
    if (cursorEl) {
        animateCursor();
    }
}

// INTERAÇÃO DO CURSOR COM ELEMENTOS SELECIONADOS
function initCursorInteractions() {
    const cursor = document.getElementById('custom-cursor');
    const interactiveTargets = document.querySelectorAll('.interactive-target');
    interactiveTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.width = '55px';
                cursor.style.height = '55px';
                cursor.style.backgroundColor = '#fdb244';
                cursor.style.mixBlendMode = 'difference';
            }
        });
        target.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = '#e75d0b';
                cursor.style.mixBlendMode = 'multiply';
            }
        });
    });
}

if (typeof window !== 'undefined') {
    initCursorInteractions();
}

// MOVIMENTO PARALLAX COM O MOUSE (Reação física sutil no card visual, SVGs e selo)
const heroSection = document.getElementById('hero-section');
if (heroSection) {
    const visualCard = document.getElementById('visual-card');
    const rotatingSeal = document.getElementById('rotating-seal');
    const visualIllustrationContainer = document.getElementById('visual-illustration-container');

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);

        if (visualCard) {
            visualCard.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px) rotateY(${x * 0.01}deg) rotateX(${-y * 0.01}deg)`;
        }
        if (rotatingSeal) {
            rotatingSeal.style.transform = `translate(${-x * 0.04}px, ${-y * 0.04}px) rotate(${x * 0.02}deg)`;
        }
        if (visualIllustrationContainer) {
            visualIllustrationContainer.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) scale(1.03)`;
        }

        const steamGroup = document.getElementById('coffee-steam-group');
        if (steamGroup) {
            steamGroup.style.transform = `translateX(${x * 0.08}px) skewX(${x * 0.04}deg)`;
        }
    });

    heroSection.addEventListener('mouseleave', () => {
        if (visualCard) {
            visualCard.style.transform = 'translate(0px, 0px) rotateY(0deg) rotateX(0deg)';
        }
        if (rotatingSeal) {
            rotatingSeal.style.transform = 'none';
        }
        if (visualIllustrationContainer) {
            visualIllustrationContainer.style.transform = 'translate(0px, 0px) scale(1)';
        }

        const steamGroup = document.getElementById('coffee-steam-group');
        if (steamGroup) {
            steamGroup.style.transform = 'none';
        }
    });
}

// REVELAR MANIFESTO ACORDEÃO
function toggleManifestoLine(id) {
    const line = document.getElementById(id);
    const icon = document.getElementById(`${id}-icon`);

    if (!line) return;

    if (line.classList.contains('hidden')) {
        line.classList.remove('hidden');
        if (icon) {
            icon.classList.add('rotate-45');
            icon.className = icon.className.replace('fa-plus', 'fa-xmark');
        }
    } else {
        line.classList.add('hidden');
        if (icon) {
            icon.classList.remove('rotate-45');
            icon.className = icon.className.replace('fa-xmark', 'fa-plus');
        }
    }
}

// SISTEMA DO PAINEL ADMINISTRATIVO SECRETO "ESTÚDIO BOROGODÓ"
const footerCopyright = document.getElementById('footer-copyright');
if (footerCopyright) {
    footerCopyright.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 5) {
            clickCount = 0;
            openAdminPanel();
        }
    });
}

// Atalho de teclado Ctrl + Shift + E abre o painel secreto
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'E') {
        e.preventDefault();
        openAdminPanel();
    }
});

function openAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (!adminPanel) return;
    adminPanel.classList.remove('hidden');
    
    const adminAuth = document.getElementById('admin-auth');
    const adminDashboard = document.getElementById('admin-dashboard');
    
    if (isEditingEnabled) {
        if (adminAuth) adminAuth.classList.add('hidden');
        if (adminDashboard) adminDashboard.classList.remove('hidden');
    } else {
        if (adminAuth) adminAuth.classList.remove('hidden');
        if (adminDashboard) adminDashboard.classList.add('hidden');
    }
}

function closeAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) adminPanel.classList.add('hidden');
}

function authenticateAdmin() {
    const passwordField = document.getElementById('admin-password');
    const errorMsg = document.getElementById('auth-error-msg');
    
    if (!passwordField) return;

    if (passwordField.value === 'borogodo2026') {
        isEditingEnabled = true;
        if (errorMsg) errorMsg.classList.add('hidden');
        
        const adminAuth = document.getElementById('admin-auth');
        const adminDashboard = document.getElementById('admin-dashboard');
        
        if (adminAuth) adminAuth.classList.add('hidden');
        if (adminDashboard) adminDashboard.classList.remove('hidden');
        enableVisualEditorMode();
    } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
    }
}

function enableVisualEditorMode() {
    const editableElements = document.querySelectorAll('.editable-field');
    editableElements.forEach(el => {
        el.setAttribute('contenteditable', 'true');
        el.classList.add('editable-active');
    });
}

function exportUpdatedHTMLFile() {
    // Desativa temporariamente as bordas pontilhadas de edição para clonar o código limpo
    const editableElements = document.querySelectorAll('.editable-field');
    editableElements.forEach(el => {
        el.removeAttribute('contenteditable');
        el.classList.remove('editable-active');
    });

    // Atualiza os valores dos atributos e links conforme o painel do admin
    const substackUrlInput = document.getElementById('inp-substack-url');
    if (substackUrlInput) {
        const newSubstackUrl = substackUrlInput.value.trim();
        substackUrlInput.setAttribute('value', newSubstackUrl);
        const substackLink = document.getElementById('lnk-substack-url');
        if (substackLink) {
            substackLink.setAttribute('href', newSubstackUrl);
        }
    }

    const spotifyIdInput = document.getElementById('inp-spotify-id');
    if (spotifyIdInput) {
        const newSpotifyId = spotifyIdInput.value.trim();
        spotifyIdInput.setAttribute('value', newSpotifyId);
        const spotifyIframe = document.getElementById('spotify-iframe');
        if (spotifyIframe) {
            spotifyIframe.setAttribute('src', `https://open.spotify.com/embed/playlist/${newSpotifyId}?utm_source=generator&theme=0`);
        }
    }

    // Coleta todo o documento HTML consolidado
    const clonedDocHTML = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;

    // Restaura as marcações visuais de edição
    if (isEditingEnabled) {
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.classList.add('editable-active');
        });
    }

    // Força a exportação do arquivo index.html em tempo de execução
    const blob = new Blob([clonedDocHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// SISTEMA DE DETECTAR SCROLL PARA ANIMAÇÃO DE ELEMENTOS REVELÁVEIS
const revealElements = document.querySelectorAll('.reveal-element');
function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
}

// Modais de Serviços
function openServiceModal(title, text) {
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');

    if (!modal) return;
    if (modalTitle) modalTitle.innerText = title;
    if (modalDesc) modalDesc.innerText = text;

    modal.classList.remove('hidden');
    setTimeout(() => {
        if (modal.firstElementChild) {
            modal.firstElementChild.classList.remove('scale-95');
            modal.firstElementChild.classList.add('scale-100');
        }
    }, 50);
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    if (modal.firstElementChild) {
        modal.firstElementChild.classList.remove('scale-100');
        modal.firstElementChild.classList.add('scale-95');
    }
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 150);
}

// Submissão de Formulário
function submitBriefingForm(event) {
    event.preventDefault();
    const success = document.getElementById('form-success-overlay');
    if (success) success.classList.remove('hidden');
}

function resetBriefingForm() {
    const success = document.getElementById('form-success-overlay');
    const form = document.getElementById('contact-form');
    if (form) form.reset();
    if (success) success.classList.add('hidden');
}

// CONTROLE DA RÁDIO SPOTIFY
function toggleSpotifyPlayer() {
    const card = document.getElementById('spotify-player-card');
    const toggleBtn = document.getElementById('spotify-toggle-btn');
    if (!card) return;

    if (isPlayerOpen) {
        card.classList.add('scale-95', 'opacity-0');
        setTimeout(() => card.classList.add('hidden'), 300);
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
        card.classList.remove('hidden');
        setTimeout(() => card.classList.remove('scale-95', 'opacity-0'), 50);
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    }
    isPlayerOpen = !isPlayerOpen;
}

// FUNÇÃO PARA BUSCAR E RENDERIZAR ARTIGOS REAIS DO SUBSTACK
function fetchSubstackFeed() {
    const substackUrlInput = document.getElementById('inp-substack-url');
    if (!substackUrlInput) return;

    let substackUrl = substackUrlInput.value.trim();
    if (!substackUrl) return;

    // Remove eventuais barras e sufixos de feed duplicados
    substackUrl = substackUrl.replace(/\/feed\/?$/, '').replace(/\/$/, '');
    const feedUrl = `${substackUrl}/feed`;

    // Utiliza proxy CORS AllOrigins para contornar restrições do navegador
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;

    const feedContainer = document.getElementById('substack-feed-container');
    if (!feedContainer) return;

    fetch(proxyUrl)
        .then(response => {
            if (!response.ok) throw new Error('Falha na resposta da rede');
            return response.json();
        })
        .then(data => {
            if (!data.contents) throw new Error('Conteúdo do feed vazio');

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");

            // Verifica se houve erro de análise do XML
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) throw new Error('Erro ao analisar XML do feed');

            const items = xmlDoc.querySelectorAll("item");
            if (items.length === 0) throw new Error('Nenhum artigo encontrado no feed');

            // Limpa o container de posts agora que sabemos que há artigos
            feedContainer.innerHTML = '';

            // Renderiza até 3 artigos do feed
            const maxItems = Math.min(items.length, 3);
            for (let i = 0; i < maxItems; i++) {
                const item = items[i];

                const title = item.querySelector("title")?.textContent || "Sem título";
                const link = item.querySelector("link")?.textContent || substackUrl;
                const pubDateStr = item.querySelector("pubDate")?.textContent;

                // Extrai categorias do feed
                const categories = Array.from(item.querySelectorAll("category")).map(c => c.textContent);
                const category = categories.length > 0 ? categories[0] : "Crônica";

                // Formata a data de publicação (Padrão pt-BR)
                let dateDisplay = "";
                if (pubDateStr) {
                    const date = new Date(pubDateStr);
                    if (!isNaN(date.getTime())) {
                        dateDisplay = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    }
                }

                // Limpa e trunca a descrição
                const descRaw = item.querySelector("description")?.textContent || "";
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = descRaw;
                const descriptionText = tempDiv.textContent || tempDiv.innerText || "";
                const cleanDescription = descriptionText.trim().substring(0, 150) + (descriptionText.length > 150 ? "..." : "");

                // Calcula tempo de leitura estimado (média de 200 palavras por minuto)
                const words = descriptionText.split(/\s+/).filter(w => w.length > 0).length;
                const readingTime = Math.max(1, Math.round(words / 200));

                const indexStr = String(i + 1).padStart(2, '0');

                // Cria o card dinamicamente com suporte a leitores de tela
                const postCard = document.createElement('div');
                postCard.className = "bg-white p-8 rounded-[2rem] border border-stone-100 hover:shadow-lg transition-all flex flex-col justify-between min-h-[300px]";
                postCard.innerHTML = `
                    <div class="space-y-4">
                        <span class="text-[10px] font-bold text-stone-400 uppercase font-canvasans">${indexStr} / ${category} ${dateDisplay ? `• ${dateDisplay}` : ''}</span>
                        <h3 class="text-xl font-tangarland font-bold text-forestGreen">${title}</h3>
                        <p class="text-stone-600 text-xs leading-relaxed font-canvasans line-clamp-3">
                            ${cleanDescription}
                        </p>
                    </div>
                    <div class="pt-6 border-t border-stone-50 flex justify-between items-center mt-6">
                        <span class="text-[10px] text-stone-400 font-semibold font-canvasans">Tempo de Leitura: ${readingTime} min</span>
                        <a href="${link}" target="_blank" class="text-xs font-bold text-vibrantOrange hover:underline font-canvasans interactive-target">Ler Carta</a>
                    </div>
                `;
                feedContainer.appendChild(postCard);
            }
        })
        .catch(error => {
            console.warn('Erro ao carregar o feed do Substack (mantendo artigos estáticos de fallback):', error);
            // Fallbacks originais definidos no HTML são mantidos intactos, pois a limpeza do container
            // só ocorre após o parsing bem-sucedido dos posts.
        });
}

// INICIALIZAÇÃO DO SITE NO LAYOUT BOSSA & BRISA COM MARESIA DE FORMA PADRÃO
if (typeof window !== 'undefined') {
    window.onload = function () {
        triggerSensoryRitual('coqueiro');
        fetchSubstackFeed();
    };
}

// Exportar funções para fins de testes unitários (Node environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        layoutState,
        clickCount,
        isEditingEnabled,
        isPlayerOpen,
        triggerSensoryRitual,
        setActiveIllustration,
        generateBubbles,
        toggleManifestoLine,
        openAdminPanel,
        closeAdminPanel,
        authenticateAdmin,
        enableVisualEditorMode,
        exportUpdatedHTMLFile,
        checkReveal,
        openServiceModal,
        closeServiceModal,
        submitBriefingForm,
        resetBriefingForm,
        toggleSpotifyPlayer,
        fetchSubstackFeed
    };
}