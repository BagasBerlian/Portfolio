/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TYPED JS ===============*/
const typedHome = new Typed("#home-typed", {
    strings: ["Web Developer", "Web/Mobile Designer", "Freelance", "Fullstack Developer", "Data Analyst", "Project Manager"],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    cursorChar: "_",
});

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".services__modal"),
    modalBtn = document.querySelectorAll(".services__button"),
    modalClose = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
    document.body.classList.add('disable-scroll');
}

modalBtn.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i)
    })
});

modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove("active-modal");
        })
        document.body.classList.remove('disable-scroll');
    })
});


/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */
const linkWork = document.querySelectorAll('.work__item');
function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'));
    this.classList.add('active-work');
}

linkWork.forEach(l => l.addEventListener('click', activeWork));

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    }
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active-link");
        }
    })
}

window.addEventListener('scroll', scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById('theme-button');
const lightTheme = 'light-theme';
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme);
    themeButton.classList[selectedIcon == 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000, // Sedikit dipercepat agar lebih responsif tapi tetap elegan
    delay: 300,
    // reset: true // Bisa diubah ke true jika ingin animasi selalu muncul saat di-scroll ulang
})

// Home Section
sr.reveal(`.home__data`)
sr.reveal(`.home__handle`, { delay: 600 })
sr.reveal(`.home__social, .home__scroll`, { delay: 800, origin: 'bottom' })

// Section Title & Subtitle
sr.reveal(`.section__title, .section__subtitle`, { delay: 200, origin: 'top' })

// About Section
sr.reveal(`.about__img`, { origin: 'left', delay: 400 })
sr.reveal(`.about__data`, { origin: 'right', delay: 400 })

// Skills, Services, Work, and Contact Elements (Grid/Cards)
sr.reveal(`.skills__content, .services__card, .work__card, .contact__content`, { interval: 150, origin: 'bottom' })

// Footer
sr.reveal(`.footer__container`, { delay: 300, origin: 'bottom' })

/*=============== CONTACT FORM SUBMIT TO GOOGLE SHEETS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactToast = document.getElementById('contact-toast'),
    contactToastClose = document.getElementById('contact-toast-close');

// Ganti dengan URL Web App Google Apps Script Anda setelah dideploy
const scriptURL = 'https://script.google.com/macros/s/AKfycbzXv3wbHMq5Xbw1ujd8nbw-C3UaiU5ks0FyvzTneZBWDRiujxw_dny1tLceIDUjT6r1/exec';

let toastTimeout;

function showToast(title, desc, type = 'success') {
    if (!contactToast) return;

    const toastIcon = contactToast.querySelector('.contact__toast-icon');
    const toastTitle = contactToast.querySelector('.contact__toast-title');
    const toastDesc = contactToast.querySelector('.contact__toast-desc');

    // Set konten teks
    toastTitle.textContent = title;
    toastDesc.textContent = desc;

    // Atur kelas styling dan ikon berdasarkan tipe
    if (type === 'error') {
        contactToast.classList.add('error');
        if (toastIcon) {
            toastIcon.className = 'bx bx-error-circle contact__toast-icon';
        }
    } else {
        contactToast.classList.remove('error');
        if (toastIcon) {
            toastIcon.className = 'bx bx-check-circle contact__toast-icon';
        }
    }

    // Tampilkan toast
    contactToast.classList.add('show');

    // Bersihkan timeout sebelumnya jika ada agar tidak tumpang tindih
    clearTimeout(toastTimeout);

    // Sembunyikan otomatis setelah 5 detik
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    if (contactToast) {
        contactToast.classList.remove('show');
    }
}

if (contactToastClose) {
    contactToastClose.addEventListener('click', hideToast);
}

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;

        // Nonaktifkan tombol dan tampilkan loading spinner
        submitButton.disabled = true;
        submitButton.innerHTML = 'Mengirim... <i class="bx bx-loader-alt bx-spin"></i>';

        const formData = new FormData(contactForm);

        // Anti-spam honeypot check
        const honeypot = formData.get('_honey');
        if (honeypot) {
            // Jika bot mengisi honeypot, simulasi sukses secara diam-diam agar bot tidak mencoba lagi
            showToast('Sukses!', 'Pesan Anda berhasil dikirim ke Google Sheet.', 'success');
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            return;
        }

        // Cek jika URL script masih berupa placeholder
        if (scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' || !scriptURL) {
            // Simulasi sukses dalam Mode Demo
            setTimeout(() => {
                showToast(
                    'Mode Demo Sukses!',
                    'Form sudah siap! Hubungkan URL Google Apps Script Anda di assets/js/main.js.',
                    'success'
                );
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }, 1000);
            return;
        }

        // Pengiriman asli ke Google Apps Script Web App
        // Menggunakan mode: 'no-cors' agar tidak terblokir oleh kebijakan CORS browser
        fetch(scriptURL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
            .then(() => {
                showToast('Sukses!', 'Pesan Anda berhasil dikirim ke Google Sheet.', 'success');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                showToast('Gagal!', 'Terjadi kesalahan saat mengirim pesan. Coba lagi.', 'error');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
    });
}
