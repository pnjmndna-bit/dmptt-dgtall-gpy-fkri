/* =====================================================
   GOPAY UI - FULL SCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       JAM INDONESIA
    ================================================= */

    const wibTime = document.getElementById("wibTime");
    const witaTime = document.getElementById("witaTime");
    const witTime = document.getElementById("witTime");


    function updateIndonesiaTime() {

        const now = new Date();


        /* ================= WIB ================= */

        if (wibTime) {

            const wib = new Intl.DateTimeFormat(
                "id-ID",
                {
                    timeZone: "Asia/Jakarta",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }
            ).format(now);

            wibTime.textContent = `${wib} WIB`;

        }


        /* ================= WITA ================= */

        if (witaTime) {

            const wita = new Intl.DateTimeFormat(
                "id-ID",
                {
                    timeZone: "Asia/Makassar",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }
            ).format(now);

            witaTime.textContent = `${wita} WITA`;

        }


        /* ================= WIT ================= */

        if (witTime) {

            const wit = new Intl.DateTimeFormat(
                "id-ID",
                {
                    timeZone: "Asia/Jayapura",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }
            ).format(now);

            witTime.textContent = `${wit} WIT`;

        }

    }


    /* Jalankan langsung */

    updateIndonesiaTime();


    /* Update setiap 1 detik */

    setInterval(
        updateIndonesiaTime,
        1000
    );



    /* =================================================
       PROMO SLIDER
    ================================================= */

    const promoSlider =
        document.querySelector(".promo-grid");

    const promoBanners =
        document.querySelectorAll(".promo-banner");


    let promoIndex = 0;

    let promoTimer = null;


    /* =================================================
       SLIDE FUNCTION
    ================================================= */

    function slidePromo() {

        if (
            !promoSlider ||
            promoBanners.length <= 1
        ) {
            return;
        }


        promoIndex++;


        if (
            promoIndex >=
            promoBanners.length
        ) {

            promoIndex = 0;

        }


        promoSlider.scrollTo({

            left:
                promoBanners[promoIndex].offsetLeft,

            behavior: "smooth"

        });

    }



    /* =================================================
       START AUTO SLIDE
    ================================================= */

    function startPromoSlider() {

        clearInterval(promoTimer);


        if (
            !promoSlider ||
            promoBanners.length <= 1
        ) {
            return;
        }


        promoTimer = setInterval(

            slidePromo,

            4000

        );

    }


    startPromoSlider();



    /* =================================================
       PAUSE SAAT DISENTUH
    ================================================= */

    if (promoSlider) {


        promoSlider.addEventListener(

            "touchstart",

            () => {

                clearInterval(
                    promoTimer
                );

            },

            {
                passive: true
            }

        );


        promoSlider.addEventListener(

            "touchend",

            () => {

                startPromoSlider();

            },

            {
                passive: true
            }

        );

    }



    /* =================================================
       DETECT MANUAL SWIPE
    ================================================= */

    if (promoSlider) {


        promoSlider.addEventListener(

            "scroll",

            () => {

                const scrollLeft =
                    promoSlider.scrollLeft;


                let closestIndex = 0;

                let closestDistance =
                    Infinity;


                promoBanners.forEach(

                    (banner, index) => {

                        const distance =
                            Math.abs(
                                banner.offsetLeft -
                                scrollLeft
                            );


                        if (
                            distance <
                            closestDistance
                        ) {

                            closestDistance =
                                distance;

                            closestIndex =
                                index;

                        }

                    }

                );


                promoIndex =
                    closestIndex;

            },

            {
                passive: true
            }

        );

    }



    /* =================================================
       MINI LOADING
    ================================================= */

    const miniLoading =
        document.createElement("div");


    miniLoading.className =
        "mini-loading";


    miniLoading.innerHTML = `

        <div class="mini-loading-box">

            <div class="mini-spinner"></div>

            <span>Memuat...</span>

        </div>

    `;


    document.body.appendChild(
        miniLoading
    );



    /* =================================================
       REDIRECT KE LOADING.HTML
    ================================================= */

    function goToLoading(element) {


        /* Cegah klik berkali-kali */

        if (
            document.body.classList.contains(
                "is-loading"
            )
        ) {

            return;

        }


        document.body.classList.add(
            "is-loading"
        );


        /* Efek tekan */

        if (element) {

            element.classList.add(
                "clicked"
            );

        }


        /* Tampilkan loading */

        miniLoading.classList.add(
            "show"
        );


        /* Redirect */

        setTimeout(() => {

            window.location.href =
                "loading.html";

        }, 1000);

    }



    /* =================================================
       SERVICE BUTTON
    ================================================= */

    const serviceButtons =
        document.querySelectorAll(
            ".service"
        );


    serviceButtons.forEach(

        button => {

            button.addEventListener(
                "click",
                function () {

                    goToLoading(
                        this
                    );

                }
            );

        }

    );



    /* =================================================
       PROMO ITEM
    ================================================= */

    const promoItems =
        document.querySelectorAll(
            ".promo-item"
        );


    promoItems.forEach(

        item => {

            item.addEventListener(
                "click",
                function () {

                    goToLoading(
                        this
                    );

                }
            );

        }

    );



    /* =================================================
       PROMO BANNER
    ================================================= */

    promoBanners.forEach(

        banner => {

            banner.addEventListener(
                "click",
                function () {

                    goToLoading(
                        this
                    );

                }
            );

        }

    );



    /* =================================================
       OPTIONAL:
       STOP SLIDER SAAT LOADING
    ================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                clearInterval(
                    promoTimer
                );

            } else {

                startPromoSlider();

            }

        }
    );

});
