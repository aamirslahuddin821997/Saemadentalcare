
/* =========================================
   1. SELECT HTML ELEMENTS
========================================= */

const header = document.querySelector("header");
const nav = document.querySelector("nav");
const navMenu = document.querySelector("nav ul");
const contactForm = document.querySelector(".contact form");


/* =========================================
   2. MOBILE NAVIGATION TOGGLE
========================================= */

// Create hamburger button
const menuButton = document.createElement("button");

menuButton.className = "menu-toggle";
menuButton.innerHTML = "&#9776;";
menuButton.setAttribute("aria-label", "Open navigation menu");
menuButton.setAttribute("aria-expanded", "false");

nav.insertAdjacentElement("beforebegin", menuButton);


// Open and close navigation
menuButton.addEventListener("click", function () {

    nav.classList.toggle("active");

    const isOpen = nav.classList.contains("active");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";

});


// Close menu after clicking a navigation link
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("active");

        menuButton.innerHTML = "&#9776;";

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

    });

});


/* =========================================
   3. SMOOTH SCROLLING
========================================= */

const allLinks = document.querySelectorAll('a[href^="#"]');

allLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================
   4. BACK TO TOP BUTTON
========================================= */

// Create back-to-top button
const topButton = document.createElement("button");

topButton.id = "backToTop";
topButton.innerHTML = "&#8593;";

topButton.setAttribute("aria-label", "Back to top");

document.body.appendChild(topButton);


// Show button when scrolling down
window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});


// Scroll to top when button is clicked
topButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   5. CONTACT FORM VALIDATION
========================================= */

if (contactForm) {

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const messageInput = document.querySelector("#message");


    // Make all fields mandatory
    nameInput.required = true;
    emailInput.required = true;
    phoneInput.required = true;
    messageInput.required = true;

    nameInput.minLength = 2;
    messageInput.minLength = 10;


    // Create success message element
    const successMessage = document.createElement("p");

    successMessage.id = "successMessage";
    successMessage.setAttribute("role", "status");
    successMessage.setAttribute("aria-live", "polite");

    contactForm.appendChild(successMessage);


    // Form submission event
    contactForm.addEventListener("submit", function (event) {

        // Stop default form submission
        event.preventDefault();

        // Clear previous success message
        successMessage.textContent = "";
        successMessage.classList.remove("success");

        // Validate name
        const name = nameInput.value.trim();

        if (name.length < 2) {

            alert("Please enter a valid name.");

            nameInput.focus();

            return;

        }


        // Validate email
        const email = emailInput.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            emailInput.focus();

            return;

        }


        // Validate phone number
        const phone = phoneInput.value.trim();

        const phonePattern = /^\+?[0-9\s()-]{10,20}$/;

        const digitCount = phone.replace(/\D/g, "").length;

        if (!phonePattern.test(phone) || digitCount < 10 || digitCount > 15) {

            alert("Please enter a valid phone number.");

            phoneInput.focus();

            return;

        }


        // Validate message
        const message = messageInput.value.trim();

        if (message.length < 10) {

            alert("Please enter a message with at least 10 characters.");

            messageInput.focus();

            return;

        }


        // Display success message
        successMessage.textContent =
            "Thank you! Your form has been submitted successfully.";

        successMessage.classList.add("success");


        // Clear form fields
        contactForm.reset();

    });

}


/* =========================================
   6. CLOSE MOBILE MENU ON RESIZE
========================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 600) {

        nav.classList.remove("active");

        menuButton.innerHTML = "&#9776;";

        menuButton.setAttribute("aria-expanded", "false");

    }

});
