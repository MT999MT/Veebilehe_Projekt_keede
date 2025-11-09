const input = document.getElementById('password-input');
const button = document.getElementById('check-btn');
const feedback = document.getElementById('feedback');

button.addEventListener('click', () => {
    const password = input.value;
    let messages = [];
    
    if (password.length < 8) messages.push("Parool on alla 8 tähemärki pikk.");
    if (!/[A-Z]/.test(password)) messages.push("Paroolis ei ole ühtegi suurt tähte.");
    if (!/[a-z]/.test(password)) messages.push("Paroolis ei ole ühtegi väikest tähte.");
    if (!/[0-9]/.test(password)) messages.push("Paroolis pole ühtegi numbrit.");
    
    if (messages.length === 0) {
        feedback.textContent = "Parool on tugev.";
        feedback.style.color = "green";
    } else {
        feedback.textContent = messages.join("\n");
        feedback.style.color = "red";
    }
});