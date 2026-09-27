const micBtn = document.getElementById('mic-btn');
const stopBtn = document.getElementById('stop-btn');
const clearBtn = document.getElementById('clear-btn');
const transcript = document.getElementById('transcript');
const orb = document.getElementById('voice-orb');
const statusLabel = document.getElementById('status-label');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (!recognition) {
    statusLabel.textContent = "Speech recognition not supported";
    micBtn.disabled = true;
}

micBtn.addEventListener('click', () => {
    if (recognition) {
        recognition.start();
        statusLabel.textContent = "Listening...";
        orb.classList.add('listening');
    }
});

if (recognition) {
    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        transcript.innerHTML += `<p><strong>You:</strong> ${text}</p>`;
        
        // Demo response
        setTimeout(() => {
            const demoResponse = "I heard you say: " + text + ". This is a demo response.";
            transcript.innerHTML += `<p><strong>AI:</strong> ${demoResponse}</p>`;
            speak(demoResponse);
        }, 1000);
    };

    recognition.onend = () => {
        orb.classList.remove('listening');
        statusLabel.textContent = "Ready to listen";
    };
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = document.getElementById('rate').value;
    utterance.volume = document.getElementById('volume').value;
    window.speechSynthesis.speak(utterance);
}

stopBtn.addEventListener('click', () => window.speechSynthesis.cancel());
clearBtn.addEventListener('click', () => transcript.innerHTML = '');
