/* =========================================================
   HESHIMA PROGRESSIVE GROUP
   GODMODE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header =
        document.getElementById("siteHeader");

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const joinForm =
        document.getElementById("joinForm");

    const year =
        document.getElementById("year");

    const pageLoader =
        document.getElementById("pageLoader");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("loaded");
            }

        }, 500);

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const closeMenu = () => {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

        menuToggle
            .querySelectorAll("span")
            .forEach((span, index) => {

                span.style.transform = "";
                span.style.opacity = "";

            });

    };


    const openMenu = () => {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.add("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );

        const spans =
            menuToggle.querySelectorAll("span");

        if (spans.length === 3) {

            spans[0].style.transform =
                "translateY(6px) rotate(45deg)";

            spans[1].style.opacity =
                "0";

            spans[2].style.transform =
                "translateY(-6px) rotate(-45deg)";

        }

    };


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.contains("open");

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );

    }


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

                if (
                    lightbox &&
                    lightbox.classList.contains("active")
                ) {

                    closeLightbox();

                }

            }

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const observerOptions = {

        root: null,

        rootMargin:
            "-35% 0px -55% 0px",

        threshold: 0

    };


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    const id =
                        entry.target.getAttribute(
                            "id"
                        );

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            href === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            observerOptions
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       WHATSAPP FORM
    ===================================================== */

    if (joinForm) {

        joinForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const formData =
                    new FormData(joinForm);


                const name =
                    formData.get("name") || "";

                const phone =
                    formData.get("phone") || "";

                const email =
                    formData.get("email") || "";

                const interest =
                    formData.get("interest") || "";

                const message =
                    formData.get("message") || "";


                /*
                    IMPORTANT:

                    Replace this number with
                    Heshima's official WhatsApp
                    number before launch.

                    Format:
                    2547XXXXXXXX
                */

                const whatsappNumber =
                    "254793714575";


                const whatsappMessage =

`Hello Heshima Progressive Group,

I would like to connect with Heshima.

Name: ${name}
Phone: ${phone}
Email: ${email}
I want to: ${interest}

Message:
${message}

I found Heshima through the website.`;


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const openLightbox =
        imageSrc => {

            if (!lightbox || !lightboxImage)
                return;

            lightboxImage.src =
                imageSrc;

            lightbox.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        };


    function closeLightbox() {

        if (!lightbox)
            return;

        lightbox.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

        setTimeout(() => {

            if (lightboxImage) {
                lightboxImage.src = "";
            }

        }, 300);

    }


    galleryItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const image =
                    item.dataset.image;

                if (image) {

                    openLightbox(
                        image
                    );

                }

            }
        );

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR HANDLING
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });


    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%cHESHIMA PROGRESSIVE GROUP",
        "font-size:20px;font-weight:800;color:#2d7047;"
    );

    console.log(
        "%cYoung people. Real action. Lasting progress.",
        "font-size:13px;color:#66736c;"
    );

});
