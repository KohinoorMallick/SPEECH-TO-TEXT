document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resultText = document.getElementById('result-text');
    const instructions = document.getElementById('instructions');

    let recognition;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
        recognition = new SpeechRecognition();
    } else {
        alert('Speech Recognition API is not supported in this browser.');
        return;
    }

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        instructions.textContent = 'Voice recognition activated. Try speaking into the microphone.';
        startBtn.disabled = true;
        stopBtn.disabled = false;
    };

    recognition.onerror = function(event) {
        instructions.textContent = 'Error occurred in recognition: ' + event.error;
    };

    recognition.onend = function() {
        instructions.textContent = 'Voice recognition stopped.';
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.onresult = function(event) {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        resultText.textContent = finalTranscript + interimTranscript;
    };

    startBtn.addEventListener('click', function() {
        recognition.start();
    });

    stopBtn.addEventListener('click', function() {
        recognition.stop();
    });
});
