const input = document.getElementById('password-input');
const button = document.getElementById('check-btn');
const feedback = document.getElementById('feedback');

// Parooli kontrollimise sündmus
button.addEventListener('click', () => {
    const password = input.value;
    let messages = [];
    
    // Kontrollib parooli tugevust kriteeriumite alusel
    if (password.length < 8) messages.push("Parool on alla 8 tähemärki pikk.");
    if (!/[A-Z]/.test(password)) messages.push("Paroolis ei ole ühtegi suurt tähte.");
    if (!/[a-z]/.test(password)) messages.push("Paroolis ei ole ühtegi väikest tähte.");
    if (!/[0-9]/.test(password)) messages.push("Paroolis pole ühtegi numbrit.");
    
    // Kui vigu ei leita kuvatakse, roheline sõnum
    if (messages.length === 0) {
        feedback.textContent = "Parool on tugev.";
        feedback.style.color = "green";
    } else {
        // Kui leitakse vigu, kuvatakse punane sõnum
        feedback.textContent = messages.join("\n");
        feedback.style.color = "red";
    }
        // Konsooli logi sõnumi kontrollimise jaoks 
        console.log(feedback.textContent);

        // Lähtesta sisendi väli pärast kontrollimist (lehte ei pea uue parooli kontrollimiseks refreshima)
        input.value= "";

        // Tagasiside kustub automaatselt 2s pärast
        setTimeout(() => {
            feedback.textContent = "";
        }, 2000);

});