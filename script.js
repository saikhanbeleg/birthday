function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (username === 'Bella' && password === '20251005') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('main').style.display = 'block';
    } else {
        alert('Invalid username or password. Please try again.');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
}
function goToLogin() {
    document.getElementById('main').style.display = 'none';
    document.getElementById('pictures-page').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
function goToMain() {
    document.getElementById('pictures-page').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        login();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const mainSearch = document.getElementById('main-search');
    if (mainSearch) {
        mainSearch.addEventListener('input', function() {
            if (this.value.toLowerCase().includes('our love')) {
                goToPicturesPage();
                this.value = '';
            }
        });
    }
});
function goToPicturesPage() {
    document.getElementById('main').style.display = 'none';
    document.getElementById('pictures-page').style.display = 'block';
    setTimeout(() => {
        const pics = document.querySelectorAll('#pictures-page .our-pic');
        pics.forEach((pic, index) => {
            setTimeout(() => {
                pic.classList.add('fade-in');
            }, 200 + index * 250);
        });
    }, 100);
}
const startDate = new Date('2025-10-05T00:00:00');
function calculateElapsed() {
    const now = new Date();
    const elapsed = now - startDate;
    const totalDays = Math.floor(elapsed / (1000 * 60 * 60 * 24)) + 1;
    const days = totalDays;
    const remainingMs = elapsed % (1000 * 60 * 60 * 24);
    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
}
function updateCounters() {
    const { days, hours, minutes, seconds } = calculateElapsed();
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}
updateCounters();
setInterval(updateCounters, 1000);

let fireworksActive = false;
const surpriseBtn = document.getElementById('surprise-btn');
surpriseBtn.addEventListener('click', () => {
    if (fireworksActive) return;
    fireworksActive = true;
    surpriseBtn.style.display = 'none';
    const msg = document.createElement('h2');
    msg.id = 'birthday-msg';
    msg.textContent = 'Happy Birthday! 🎉';
    const container = document.querySelector('#main .container');
    container.insertBefore(msg, document.querySelector('#main .lyrics-section'));
    setTimeout(() => {
        startFullFireworksShow();
    }, 1000);
});
function startFullFireworksShow() {
    let totalBursts = 0;
    const maxBursts = 60;
    const phase1 = setInterval(() => {
        launchFirework();
        totalBursts++;
        if (totalBursts >= 6) {
            clearInterval(phase1);
            const phase2 = setInterval(() => {
                launchFirework();
                totalBursts++;
                if (totalBursts >= maxBursts) {
                    clearInterval(phase2);
                    setTimeout(() => { fireworksActive = false; }, 2000);
                }
            }, 150);
        }
    }, 500);
}
function launchFirework() {
    const hue = Math.random() * 360;
    const startX = Math.random() * window.innerWidth;
    const rocket = document.createElement('div');
    rocket.className = 'firework-rocket';
    rocket.style.setProperty('--hue', hue);
    rocket.style.setProperty('--start-x', `${startX}px`);
    document.body.appendChild(rocket);
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createTrailParticle(startX, window.innerHeight, hue);
        }, i * 100);
    }
    setTimeout(() => {
        const explosionX = startX;
        const explosionY = window.innerHeight * 0.3 + Math.random() * 200;
        createExplosion(explosionX, explosionY, hue, 50);
        rocket.remove();
    }, 800);
}
function createExplosion(x, y, hue, numParticles) {
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-explosion';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--hue', hue);
        const angle = (i / numParticles) * Math.PI * 2;
        const velocity = 150 + Math.random() * 100;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 50;
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);
        if (Math.random() < 0.2) {
            particle.classList.add('heart');
            particle.innerHTML = '❤️';
        }
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}
function createTrailParticle(x, y, hue) {
    const particle = document.createElement('div');
    particle.className = 'firework-trail';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--hue', hue);
    document.body.appendChild(particle);
    if (Math.random() < 0.2) {
        particle.classList.add('heart');
        particle.innerHTML = '❤️';
    }
    let posY = y;
    const speed = 10 + Math.random() * 5;
    const anim = setInterval(() => {
        posY -= speed;
        particle.style.top = `${posY}px`;
        particle.style.opacity = 1 - (y - posY) / 300;
        if (posY < y - 300) {
            clearInterval(anim);
            particle.remove();
        }
    }, 16);
}

// ── Upload Modal ──
let pendingFiles = [];

function openUploadModal() {
    document.getElementById('upload-modal').classList.add('active');
    pendingFiles = [];
    document.getElementById('upload-preview-grid').innerHTML = '';
    document.getElementById('upload-status').textContent = '';
    document.getElementById('upload-confirm-btn').style.display = 'none';
}

function closeUploadModal(event) {
    if (event.target === document.getElementById('upload-modal')) {
        document.getElementById('upload-modal').classList.remove('active');
    }
}

function closeUploadModalDirect() {
    document.getElementById('upload-modal').classList.remove('active');
}

function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    addFilesToPreview(files);
}

// Drag and drop support
document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('drop-zone');
    if (!dropZone) return;

    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', function () {
        dropZone.classList.remove('dragover');
    });
    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        addFilesToPreview(files);
    });
});

function addFilesToPreview(files) {
    const grid = document.getElementById('upload-preview-grid');
    const status = document.getElementById('upload-status');

    files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        pendingFiles.push(file);

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            grid.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    if (pendingFiles.length > 0) {
        status.textContent = `${pendingFiles.length} photo${pendingFiles.length > 1 ? 's' : ''} ready to upload 💕`;
        document.getElementById('upload-confirm-btn').style.display = 'block';
    }
}

function confirmUpload() {
    if (pendingFiles.length === 0) return;

    const gallery = document.getElementById('pictures-gallery-on-page');

    pendingFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'our-pic';
            img.alt = 'Our Love Picture';
            gallery.appendChild(img);

            setTimeout(() => {
                img.classList.add('fade-in');
            }, 100 + index * 200);
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('upload-status').textContent = '✅ Added to Our Love Pictures! 💕';
    document.getElementById('upload-confirm-btn').style.display = 'none';
    pendingFiles = [];

    setTimeout(() => {
        closeUploadModalDirect();
        goToPicturesPage();
    }, 1200);
}

// ── Simple Persistent Chat (localStorage) ──

const STORAGE_KEY = 'loveChatMessages';
let chatOpen = false;
let myRole   = null;

// ── Load messages from localStorage ──
function getMessages() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch(e) {
        return [];
    }
}

// ── Save messages to localStorage ──
function saveMessages(msgs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

// ── Toggle chat open / close ──
function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chat-window').classList.toggle('open', chatOpen);
    document.getElementById('chat-notif').style.display = 'none';
    if (chatOpen && myRole) {
        setTimeout(() => document.getElementById('chat-input').focus(), 300);
    }
}

// ── Role selection ──
function selectRole(role) {
    myRole = role;
    sessionStorage.setItem('chatRole', role);

    document.getElementById('chat-role-screen').style.display = 'none';
    const room = document.getElementById('chat-room-screen');
    room.style.display = 'flex';
    room.classList.add('active');

    document.getElementById('chat-room-avatar').textContent = role === 'GF' ? '👧' : '👦';
    document.getElementById('chat-room-title').textContent  = role === 'GF' ? 'GF 💕' : 'BF 💙';

    renderAllMessages();
    setTimeout(() => document.getElementById('chat-input').focus(), 300);
}

// ── Switch back to role selection screen ──
function switchRole() {
    myRole = null;
    sessionStorage.removeItem('chatRole');
    document.getElementById('chat-room-screen').classList.remove('active');
    document.getElementById('chat-room-screen').style.display = 'none';
    document.getElementById('chat-role-screen').style.display  = 'flex';
    document.getElementById('chat-messages').innerHTML = '';
}

// ── Render all saved messages ──
function renderAllMessages() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    const msgs = getMessages();
    let lastDate = '';

    msgs.forEach(msg => {
        // Date divider
        const msgDate = new Date(msg.timestamp).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        if (msgDate !== lastDate) {
            const divider = document.createElement('div');
            divider.className = 'chat-date-divider';
            divider.textContent = msgDate;
            container.appendChild(divider);
            lastDate = msgDate;
        }
        renderOneBubble(msg, container);
    });

    container.scrollTop = container.scrollHeight;
}

// ── Render a single message bubble ──
function renderOneBubble(msg, container) {
    const isMine = msg.role === myRole;
    const time   = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const wrapper = document.createElement('div');
    wrapper.className = `chat-msg ${isMine ? 'sent' : 'received'}`;
    wrapper.innerHTML = `
        <div class="chat-sender-name">${escapeHtml(msg.role)}</div>
        <div class="chat-bubble">${escapeHtml(msg.text)}</div>
        <div class="chat-time">${time}</div>
    `;
    container.appendChild(wrapper);
}

// ── Send a message ──
function sendMessage() {
    if (!myRole) return;
    const input = document.getElementById('chat-input');
    const text  = input.value.trim();
    if (!text) return;

    const newMsg = { role: myRole, text, timestamp: Date.now() };

    // Save to localStorage
    const msgs = getMessages();
    msgs.push(newMsg);
    saveMessages(msgs);

    // Render the new bubble immediately
    const container = document.getElementById('chat-messages');
    renderOneBubble(newMsg, container);
    container.scrollTop = container.scrollHeight;

    input.value = '';
    document.getElementById('emoji-picker').style.display = 'none';
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendMessage();
}

function toggleEmojiPicker() {
    const p = document.getElementById('emoji-picker');
    p.style.display = p.style.display === 'none' ? 'flex' : 'none';
}

function insertEmoji(emoji) {
    const input = document.getElementById('chat-input');
    input.value += emoji;
    input.focus();
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g,  '&lt;')
        .replace(/>/g,  '&gt;');
}

// Re-apply saved role when page reloads
const savedRole = sessionStorage.getItem('chatRole');
if (savedRole) selectRole(savedRole);