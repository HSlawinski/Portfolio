// 1. KONFIGURACJA I ZMIENNE GLOBALNE
const phrases = {
    pl: ["Obsługa klienta Premium"],
    en: ["Premium Banking Specialist", "Investment Expert", "Wealth Management Advisor"]
};

let currentLang = 'pl'; 
let i = 0; // indeks frazy
let j = 0; // indeks litery
let currentPhrase = [];
let isDeleting = false;
let isPaused = false;

// 2. FUNKCJA MASZYNY DO PISANIA (DYNAMIC TEXT)
function loop() {
    const textElement = document.querySelector(".dynamic-text");
    if (!textElement) return;

    const currentPhrases = phrases[currentLang];
    const prefix = currentLang === 'pl' ? "Aktualne stanowisko: " : "Current position: ";
    
    // Budujemy tekst: Prefiks + aktualnie wpisane litery
    // Znajdź tę linię w funkcji loop() i zamień na tę:
    textElement.innerHTML = `${prefix}<br>${currentPhrase.join("")}`;

    if (!isPaused) {
        if (i >= currentPhrases.length) i = 0;

        // Pisanie
        if (!isDeleting && j <= currentPhrases[i].length) {
            currentPhrase.push(currentPhrases[i][j]);
            j++;
        }

        // Usuwanie
        if (isDeleting && j <= currentPhrases[i].length) {
            currentPhrase.pop();
            j--;
        }

        // Logika pauzy po napisaniu całego słowa
        if (!isDeleting && j === currentPhrases[i].length) {
            isPaused = true;
            setTimeout(() => {
                isDeleting = true;
                isPaused = false;
            }, 2000);
        }

        // Logika przejścia do kolejnego słowa
        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
        }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(loop, speed);
}

// 3. FUNKCJA ZMIANY JĘZYKA
function changeLanguage(lang) {
    currentLang = lang;
    
    // Reset maszyny do pisania przy zmianie języka
    i = 0;
    j = 0;
    currentPhrase = [];
    isDeleting = false;
    isPaused = false;

    // Tłumaczenie elementów z klasą .lang
    const langElements = document.querySelectorAll('.lang');
    langElements.forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (translation) {
            el.innerHTML = translation;
        }
    });

    // Aktualizacja wyglądu przycisków (klasa active)
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

// 4. INICJALIZACJA PO ZAŁADOWANIU DOM
document.addEventListener('DOMContentLoaded', () => {
    // Start maszyny do pisania
    loop();

    // Obsługa kliknięć w przyciski zmiany języka
    const btnPl = document.getElementById('btn-pl');
    const btnEn = document.getElementById('btn-en');

    if (btnPl) btnPl.addEventListener('click', () => changeLanguage('pl'));
    if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));

    // Animacja pasków postępu (Intersection Observer)
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