// --- Mobile Menu Toggle ---
let sideMenu = document.getElementById("sideMenu");

function openMenu() {
    sideMenu.classList.add("active");
}

function closeMenu() {
    sideMenu.classList.remove("active");
}

document.querySelectorAll('.navItems').forEach(item => {
    item.addEventListener('click', () => {
        closeMenu();
    });
});

// --- Scroll Reveal Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// --- Google Sheets Contact Form Integration ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbygBkzEbhPyT4Yx32lOXncXPJsenpKIN3IkRYHvky3KmhzdBb_z5BZbntRaMXjMfG6sFw/exec'; 
const form = document.forms['submit-to-google-sheet'];
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");

form.addEventListener('submit', e => {
    e.preventDefault();
    
    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    

    fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
        .then(response => {
            successMsg.style.display = "block";
            submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            form.reset();
            
            setTimeout(function(){
                successMsg.style.display = "none";
            }, 5000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            alert("Something went wrong. Please try again.");
        });
});