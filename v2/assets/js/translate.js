// translate.js
// Handles EN/AR switching via lng-tag attributes

const langToggleBtn = document.querySelectorAll('.lang-switch a');
let currentLang = localStorage.getItem('araf-lang') || 'en';

// Load language JSON and apply translations
async function changeLanguage(lang) {
    if(lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.lang = 'ar';
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.lang = 'en';
    }
    
    // Update active class on toggle buttons
    langToggleBtn.forEach(btn => {
        btn.classList.remove('active');
        if((lang === 'ar' && btn.innerText.includes('عربي')) || (lang === 'en' && btn.innerText.includes('EN'))) {
            btn.classList.add('active');
        }
    });

    try {
        const response = await fetch(`assets/lng/${lang}.json`);
        const translations = await response.json();
        
        // Find all elements with a lng-tag attribute
        const elements = document.querySelectorAll('[lng-tag]');
        
        elements.forEach(element => {
            const key = element.getAttribute('lng-tag');
            if (translations[key]) {
                // Check if element is an input placeholder
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key];
                } 
                // Handle complex HTML inside element (like our <i> tags in headings)
                else {
                    element.innerHTML = translations[key];
                }
            }
        });
        
        // Save preference
        localStorage.setItem('araf-lang', lang);
        currentLang = lang;
        
        // Re-calculate ScrollTrigger positions after translation changes layout
        if(typeof ScrollTrigger !== 'undefined') {
            setTimeout(() => {
                ScrollTrigger.refresh();
                window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
            }, 100);
        }
        
    } catch (error) {
        console.error('Error loading language file:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
});
