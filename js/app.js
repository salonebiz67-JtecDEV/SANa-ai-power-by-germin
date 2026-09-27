function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

const micBtn = document.getElementById('mic-btn');
const orb = document.getElementById('voice-orb');
const statusLabel = document.getElementById('status-label');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
    micBtn.addEventListener('click', () => {
        recognition.start();
        statusLabel.textContent = "Listening...";
        orb.style.transform = 'scale(1.2)';
    });

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        console.log("User said:", text);
    };

    recognition.onend = () => {
        statusLabel.textContent = "Ready";
        orb.style.transform = 'scale(1)';
    };
}
