const config = {
    startDate: new Date(2025, 9, 27) 
};

AOS.init({
    once: true,
    offset: 50,
    duration: 1000,
});

const music = document.getElementById('bgm');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('next-popup');

if (sessionStorage.getItem('giftOpened') === 'true') {
    if(overlay) overlay.style.display = 'none';
    if(music) music.play().catch(e => console.log("Autoplay blocked"));
}

function openGift() {
    overlay.style.opacity = '0';
    sessionStorage.setItem('giftOpened', 'true');
    setTimeout(() => {
        overlay.style.display = 'none';
        if(music) music.play().catch(e => console.log("Audio play blocked"));
        createFloatingElements(); 
    }, 800);
}

function showPopup() {
    popup.style.display = 'flex';
}

function closePopup() {
    popup.style.display = 'none';
}

function updateTimer() {
    const now = new Date();
    const diff = now - config.startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const timerElement = document.getElementById('time-together');
    if (timerElement) {
        timerElement.innerText = `${days} Hari, ${hours} Jam, ${minutes} Menit, ${seconds} Detik`;
    }
}
setInterval(updateTimer, 1000);

function createFloatingElements() {
    const container = document.getElementById('bg-elements');
    if (!container) return; 

    const icons = ['💙', '✨', '❄️', '🦋', '🧸', '🤍'];

    setInterval(() => {
        const el = document.createElement('div');
        el.classList.add('floating-item');
        el.innerText = icons[Math.floor(Math.random() * icons.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 5 + 10) + 's'; 
        el.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(el);
        setTimeout(() => el.remove(), 15000);
    }, 1000);
}

if (sessionStorage.getItem('giftOpened') === 'true') {
    createFloatingElements();
}

function toggleEnvelope(element) {
    element.classList.toggle('is-open');
    if (element.classList.contains('is-open')) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    
    const modalHTML = `
        <div id="custom-confirm" class="confirm-overlay">
            <div class="confirm-box">
                <h3 class="confirm-title">Konfirmasi 💙</h3>
                <p class="confirm-text" id="confirm-msg">Yakin?</p>
                <div class="confirm-buttons">
                    <button class="btn-confirm-no" onclick="closeConfirm()">Batal</button>
                    <button class="btn-confirm-yes" id="confirm-yes-btn">Ya, Yakin</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
});

window.closeConfirm = function() {
    document.getElementById('custom-confirm').style.display = 'none';
}

window.customConfirm = function(message, onYes) {
    document.getElementById('confirm-msg').innerText = message;
    const yesBtn = document.getElementById('confirm-yes-btn');
    const newBtn = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newBtn, yesBtn);
    
    newBtn.addEventListener('click', () => {
        onYes();
        closeConfirm();
    });
    
    document.getElementById('custom-confirm').style.display = 'flex';
}