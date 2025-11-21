// Näita/peida parool
function togglePassword() {
    const input = document.getElementById("password-input");
    input.type = (input.type === "password") ? "text" : "password";
}


const input = document.getElementById('password-input');
const button = document.getElementById('check-btn');
const feedback = document.getElementById('feedback');
const strengthBar = document.getElementById('strength-bar');

function checkPasswordStrength(password) {
    let score = 0;

    // Lisame punkte parooli tugevuse eest
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return score
}

function updateStrengthBar() {
    const password = input.value;
    const score = checkPasswordStrength(password);

    let strength = 0;
    let color = "red";
    let message = "";

    switch (score) {
        case 0:
            strength = 0;
            message = "";
            color = "transparent";
            break;
        case 1:
            strength = 20;
            message = "Väga nõrk parool!";
            color = "red";
            break;
        case 2:
            strength = 40;
            message = "Nõrk parool!";
            color = "orange";
            break;
        case 3:
            strength = 60;
            message = "Keskmine parool.";
            color = "yellow";
            break;
        case 4:
            strength = 80;
            message = "Hea parool!";
            color = "lightgreen";
            break;
        case 5:
            strength = 100;
            message = "Väga hea parool!";
            color = "green";
            break;
    }

    strengthBar.style.width = strength + "%";
    strengthBar.style.backgroundColor = color;
    feedback.textContent = message;
}

// Reaalajas kontroll
input.addEventListener('input', updateStrengthBar);

function calculateEntropy(password) {
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32; // erimärgid
    if(password.length < 8) charsetSize *= 2;
    return password.length * Math.log2(charsetSize);
}

// Arvutab murdmisaja sekundites
const attackSpeeds = {
    cpu: 5e7,
    gpu: 1e10,
    cluster: 1e12
};

function crackTimeSeconds(entropy, attacker="gpu") {
    const speed = attackSpeeds[attacker];
    return Math.pow(2, entropy) / speed;
}

// Formaat inimesele loetavaks
function formatTime(seconds) {
    const minute = 60, hour = 3600, day = 86400, year = 31557600;
    if (seconds < 1) return (seconds*1000).toFixed(0)+" ms";
    if (seconds < minute) return seconds.toFixed(2)+" sekundit";
    if (seconds < hour) return (seconds/minute).toFixed(2)+" minutit";
    if (seconds < day) return (seconds/hour).toFixed(2)+" tundi";
    if (seconds < year) return (seconds/day).toFixed(2)+" päeva";
    return (seconds/year).toFixed(2)+" aastat";
}

// Funktsioon, mis kontrollib parooli
function checkPassword() {
    const password = input.value;
    let messages = [];
    updateStrengthBar();

    // Kontrollib parooli tugevust kriteeriumite alusel
    if (password.length < 8) messages.push("Parool on alla 8 tähemärki pikk.");
    if (!/[A-Z]/.test(password)) messages.push("Paroolis ei ole ühtegi suurt tähte.");
    if (!/[a-z]/.test(password)) messages.push("Paroolis ei ole ühtegi väikest tähte.");
    if (!/[0-9]/.test(password)) messages.push("Paroolis pole ühtegi numbrit.");
    if (!/[^A-Za-z0-9]/.test(password)) messages.push("Paroolis pole ühtegi erilist tähemärki.")
    if (/(\w)\1\1\1/.test(password)) messages.push("Parool sisaldab liiga palju korduvaid märke.")
    if ("abcdefghijklmnopqrstuvwxyz".includes(password.toLowerCase())) messages.push("Parool sisaldab lihtsat tähestiku järjestust.")
    if ("0123456789".includes(password)) messages.push("Parool sisaldab järjestikuseid numbreid.")
    

    
    // Kui vigu ei leita kuvatakse, roheline sõnum
    if (messages.length === 0) {
        feedback.textContent = "Parool on tugev.";
        feedback.style.color = "green";
    } else {
        // Kui leitakse vigu, kuvatakse punane sõnum
        feedback.textContent = messages.join("\n");
        feedback.style.color = "red";
    }

    // Lisame parooli murdmisaja hinnangu
    const entropy = calculateEntropy(password);
    const seconds = crackTimeSeconds(entropy, "gpu");
    const humanTime = formatTime(seconds);

    const timeMessage = `Hinnanguline murdmis-aeg (GPU rünne): ${humanTime}`;
    console.log(timeMessage);

    const timeFeedback = document.getElementById("crack-time");
    if(timeFeedback){
        timeFeedback.textContent = timeMessage;
    }

    input.value= "";

    setTimeout(() => {
        feedback.textContent = "";
        if(timeFeedback) timeFeedback.textContent = "";
    }, 5000);
}

    // Konsooli logi sõnumi kontrollimise jaoks 
    console.log(feedback.textContent);
       
    // Lähtesta sisendi väli pärast kontrollimist (lehte ei pea uue parooli kontrollimiseks refreshima)
    input.value= "";

    // Tagasiside kustub automaatselt 2s pärast
    setTimeout(() => {
        feedback.textContent = "";
    }, 5000);

// Nupuvajutuse korral tehakse kontroll    
button.addEventListener('click', checkPassword);

// Kontroll "Enter" vajutuse korral klaviatuuril
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

// Et muuta KKK nähtavaks, kui lehte on piisavalt keritud.
window.addEventListener("scroll", function() {
    const faq = document.querySelector('.faq-container');
    const scrollY = window.scrollY || window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    if (scrollY + viewportHeight >= documentHeight * 0.8) {
        faq.style.opacity = 1;
        document.body.classList.add("scrolled");
    }
});

    document.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            document.body.classList.add("scrolled");
    }
});

// Funktsioon mille abil saab kasutaja KKK tabelis küsimuste peale vajutada
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {

        const answer = item.nextElementSibling;

        if (answer.style.display === "none" || answer.style.display === "") {
            answer.style.display = "block";
        } else {
            answer.style.display = "none";
        }
    });
});

window.addEventListener('scroll', function() {
    const bottomHeader = document.getElementById('bottom-header');
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight * 0.8) {
        bottomHeader.classList.add('show');
    } else {
        bottomHeader.classList.remove('show');
    }
});
 
// Funktsioon menüü kuvamiseks/peitmiseks
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('active');
}
    
 


        
        
    

