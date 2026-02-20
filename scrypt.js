const phrases = {
    pl: ["Obsługa klienta Premium"],
    en: ["Premium client service"]
};

let currentLang = 'pl'; 
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isPaused = false;

function loop() {
    const textElement = document.querySelector(".dynamic-text");
    if (!textElement) return;

    const currentPhrases = phrases[currentLang];
    const prefix = currentLang === 'pl' ? "Aktualne stanowisko: " : "Current position: ";

    textElement.innerHTML = `${prefix}<br>${currentPhrase.join("")}`;

    if (!isPaused) {
        if (i >= currentPhrases.length) i = 0;

        if (!isDeleting && j <= currentPhrases[i].length) {
            currentPhrase.push(currentPhrases[i][j]);
            j++;
        }

        if (isDeleting && j <= currentPhrases[i].length) {
            currentPhrase.pop();
            j--;
        }

        if (!isDeleting && j === currentPhrases[i].length) {
            isPaused = true;
            setTimeout(() => {
                isDeleting = true;
                isPaused = false;
            }, 2000);
        }

        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
        }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(loop, speed);
}

function changeLanguage(lang) {
    currentLang = lang;
    
    i = 0;
    j = 0;
    currentPhrase = [];
    isDeleting = false;
    isPaused = false;

    const langElements = document.querySelectorAll('.lang');
    langElements.forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (translation) {
            el.innerHTML = translation;
        }
    });

    const btnPl = document.getElementById('btn-pl');
    const btnEn = document.getElementById('btn-en');
    
    if (lang === 'pl') {
        btnPl.classList.add('active');
        btnEn.classList.remove('active');
    } else {
        btnEn.classList.add('active');
        btnPl.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loop();

    const btnPl = document.getElementById('btn-pl');
    const btnEn = document.getElementById('btn-en');

    if (btnPl) btnPl.addEventListener('click', () => changeLanguage('pl'));
    if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));

    const skillsSection = document.querySelector('#experience');
    const progressFills = document.querySelectorAll('.progress-fill');

    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFills.forEach(fill => {
                        fill.style.width = fill.getAttribute('data-width');
                    });
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }
});
