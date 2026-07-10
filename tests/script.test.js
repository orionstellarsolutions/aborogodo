const fs = require('fs');
const path = require('path');

describe('Borogodó Landing Page - JavaScript Tests', () => {
    let script;
    let consoleWarnSpy;

    beforeEach(() => {
        // Mute console warnings in test runs to keep output clean
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        // Set up the DOM body
        document.body.innerHTML = `
            <div id="main-body"></div>
            <h1 id="hero-title"></h1>
            <p id="hero-desc"></p>
            <div id="hero-tag"></div>
            <div id="visual-card"></div>
            <span id="visual-badge-text"></span>
            
            <div id="swaying-leaves-ambient" style="display:none;"></div>
            <div id="steam-ambient" style="display:none;"></div>
            <div id="bubbles-ambient" style="display:none;"></div>
            
            <button id="ritual-btn-coqueiro"></button>
            <button id="ritual-btn-drink"></button>
            <button id="ritual-btn-feijoada"></button>
            <button id="ritual-btn-cafe"></button>
            
            <div id="svg-default"></div>
            <div id="svg-coqueiro"></div>
            <div id="svg-drink"></div>
            <div id="svg-feijoada"></div>
            <div id="svg-cafe"></div>
            
            <div id="custom-cursor"></div>
            
            <div id="manifesto-1" class="hidden"></div>
            <span id="manifesto-1-icon" class="fa-plus"></span>
            
            <span id="footer-copyright"></span>
            <div id="admin-panel" class="hidden"></div>
            <div id="admin-auth" class="hidden"></div>
            <div id="admin-dashboard" class="hidden"></div>
            <input id="admin-password" type="password" value="" />
            <span id="auth-error-msg" class="hidden"></span>
            
            <input id="inp-substack-url" type="url" value="https://aborogodo.substack.com" />
            <a id="lnk-substack-url" href=""></a>
            
            <input id="inp-spotify-id" type="text" value="37i9dQZF1DX4b9tI0T0q7A" />
            <iframe id="spotify-iframe" src=""></iframe>
            <div id="spotify-player-card" class="hidden"></div>
            <button id="spotify-toggle-btn" aria-expanded="false"></button>
            
            <div id="service-modal" class="hidden">
                <div class="modal-content">
                    <button></button>
                </div>
            </div>
            <span id="modal-title"></span>
            <p id="modal-description"></p>
            
            <form id="contact-form"></form>
            <div id="form-success-overlay" class="hidden"></div>
            
            <div id="substack-feed-container">
                <div class="fallback-post">Fallback Post 1</div>
                <div class="fallback-post">Fallback Post 2</div>
                <div class="fallback-post">Fallback Post 3</div>
            </div>
        `;

        // Load the script
        // We delete from require cache so that it runs anew with our fresh DOM structure
        jest.isolateModules(() => {
            script = require('../script.js');
        });
    });

    afterEach(() => {
        consoleWarnSpy.mockRestore();
        jest.clearAllMocks();
    });

    test('should activate sensory ritual "coqueiro" correctly', () => {
        script.triggerSensoryRitual('coqueiro');
        const mainBody = document.getElementById('main-body');
        const leaves = document.getElementById('swaying-leaves-ambient');
        const coqueiroBtn = document.getElementById('ritual-btn-coqueiro');
        
        expect(leaves.style.display).toBe('block');
        expect(mainBody.className).toContain('text-forestGreen');
        expect(coqueiroBtn.className).toContain('text-forestGreen');
    });

    test('should activate sensory ritual "drink" and generate bubbles', () => {
        script.triggerSensoryRitual('drink');
        const bubbles = document.getElementById('bubbles-ambient');
        const drinkBtn = document.getElementById('ritual-btn-drink');
        
        expect(bubbles.style.display).toBe('block');
        expect(bubbles.querySelectorAll('.bubble').length).toBeGreaterThan(0);
        expect(drinkBtn.className).toContain('text-forestGreen');
    });

    test('should toggle manifesto lines correctly', () => {
        const line = document.getElementById('manifesto-1');
        const icon = document.getElementById('manifesto-1-icon');
        
        // Initial state: hidden
        expect(line.classList.contains('hidden')).toBe(true);
        
        script.toggleManifestoLine('manifesto-1');
        expect(line.classList.contains('hidden')).toBe(false);
        expect(icon.className).toContain('fa-xmark');
        
        script.toggleManifestoLine('manifesto-1');
        expect(line.classList.contains('hidden')).toBe(true);
        expect(icon.className).toContain('fa-plus');
    });

    test('should toggle Spotify Player state and update aria-expanded', () => {
        const card = document.getElementById('spotify-player-card');
        const toggleBtn = document.getElementById('spotify-toggle-btn');
        
        // Open player
        script.toggleSpotifyPlayer();
        expect(card.classList.contains('hidden')).toBe(false);
        expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');
        
        // Close player
        script.toggleSpotifyPlayer();
        expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    });

    test('should authenticate admin with correct credentials', () => {
        const passwordField = document.getElementById('admin-password');
        passwordField.value = 'borogodo2026';
        
        script.authenticateAdmin();
        expect(document.getElementById('admin-auth').classList.contains('hidden')).toBe(true);
        expect(document.getElementById('admin-dashboard').classList.contains('hidden')).toBe(false);
        
        // Ensure editable fields are active
        const testEl = document.createElement('div');
        testEl.className = 'editable-field';
        document.body.appendChild(testEl);
        script.enableVisualEditorMode();
        expect(testEl.getAttribute('contenteditable')).toBe('true');
    });

    test('should fail admin authentication with incorrect credentials', () => {
        const passwordField = document.getElementById('admin-password');
        const errorMsg = document.getElementById('auth-error-msg');
        passwordField.value = 'wrong_password';
        
        script.authenticateAdmin();
        expect(errorMsg.classList.contains('hidden')).toBe(false);
    });

    test('should fallback gracefully if Substack feed fetching fails', async () => {
        global.fetch = jest.fn().mockImplementation(() => 
            Promise.reject(new Error('Network failure'))
        );
        
        const feedContainer = document.getElementById('substack-feed-container');
        expect(feedContainer.querySelectorAll('.fallback-post').length).toBe(3);
        
        await script.fetchSubstackFeed();
        
        // Fallback elements are preserved
        expect(feedContainer.querySelectorAll('.fallback-post').length).toBe(3);
    });
});
