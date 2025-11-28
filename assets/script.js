document.addEventListener("DOMContentLoaded", function () {

    // Jika bukan halaman loading.html, hentikan script
    if (!window.location.pathname.includes("index.html")) return;

    const spinner = document.querySelector(".loading-spinner");

    // Jalankan animasi progress bar
    setTimeout(() => {
        document.querySelector(".progress-fill").style.width = "100%";
    }, 1100);

    // Hentikan spinner setelah progress selesai
    setTimeout(() => {
        spinner.style.animation = "none";  
    }, 4100);

    // Setelah progress bar penuh, pindah halaman
    setTimeout(() => {
        window.location.href = "beranda.html";
    }, 4400);
});

// === Testimonial Slider ===
const slider = document.getElementById("rwTestiSlider");
const dotsContainer = document.getElementById("rwTestiDots");

const slides = slider.children;
const totalSlides = slides.length;

// Generate dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
        slider.scrollTo({
            left: slides[i].offsetLeft - 10,
            behavior: "smooth"
        });
    });

    dotsContainer.appendChild(dot);
}

// Update dots while scrolling
slider.addEventListener("scroll", () => {
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < totalSlides; i++) {
        const distance = Math.abs(
            slider.scrollLeft - slides[i].offsetLeft + 10
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
        }
    }

    // Update active dot
    const dots = dotsContainer.children;
    for (let d of dots) d.classList.remove("active");
    dots[closestIndex].classList.add("active");
});

const quizData = [
    {
        question: "Berapa lama waktu yang dibutuhkan botol plastik untuk terurai?",
        options: ["50 Tahun", "100 Tahun", "450 Tahun", "20 Tahun"],
        answer: 2
    },
    {
        question: "Sampah organik dapat diolah menjadi apa?",
        options: ["Kompos", "Plastik", "Logam", "Kaca"],
        answer: 0
    },
    {
        question: "Apa warna tempat sampah untuk plastik?",
        options: ["Kuning", "Hijau", "Biru", "Merah"],
        answer: 0
    },
    {
        question: "Jenis sampah apa yang termasuk B3?",
        options: ["Daun", "Baterai", "Kardus", "Botol"],
        answer: 1
    },
    {
        question: "Berapa persen sampah organik di Indonesia?",
        options: ["10%", "67%", "30%", "90%"],
        answer: 1
    }
];

let qIndex = 0;
let selected = Array(quizData.length).fill(null);

// Elements
const qNum = document.getElementById("qNum");
const qProgress = document.getElementById("qProgress");
const qProgressBar = document.getElementById("quizProgressBar");
const qText = document.getElementById("quizQuestion");
const qOptionsBox = document.getElementById("quizOptions");

function loadQuestion() {
    const q = quizData[qIndex];

    qNum.textContent = qIndex + 1;
    qText.textContent = q.question;

    qOptionsBox.innerHTML = "";

    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "quiz-option";
        div.textContent = opt;

        if (selected[qIndex] === i) div.classList.add("selected");

        div.onclick = () => {
            selected[qIndex] = i;
            loadQuestion();
        };

        qOptionsBox.appendChild(div);
    });

    updateProgress();
}

function updateProgress() {
    let progress = Math.floor((qIndex / quizData.length) * 100);
    qProgress.textContent = progress;
    qProgressBar.style.width = progress + "%";
}

document.getElementById("quizNext").onclick = () => {
    if (qIndex < quizData.length - 1) qIndex++;
    loadQuestion();
};

document.getElementById("quizPrev").onclick = () => {
    if (qIndex > 0) qIndex--;
    loadQuestion();
};

loadQuestion();

const fileInput = document.getElementById("fileInput");
const mainPreview = document.getElementById("mainPreview");
const thumbContainer = document.getElementById("thumbContainer");

fileInput.addEventListener("change", function () {
    thumbContainer.innerHTML = "";
    const files = Array.from(fileInput.files);

    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {

            // thumbnail
            const img = document.createElement("img");
            img.src = e.target.result;

            img.onclick = () => {
                mainPreview.style.backgroundImage = `url('${e.target.result}')`;
                mainPreview.style.backgroundSize = "cover";
                mainPreview.style.backgroundPosition = "center";
            };

            thumbContainer.appendChild(img);

            // preview pertama otomatis tampil
            if (index === 0) {
                mainPreview.style.backgroundImage = `url('${e.target.result}')`;
                mainPreview.style.backgroundSize = "cover";
                mainPreview.style.backgroundPosition = "center";
            }
        };
        reader.readAsDataURL(file);
    });
});

const btn = document.getElementById("chatbotBtn");
const popup = document.getElementById("chatbotPopup");
const closeBtn = document.getElementById("chatbotClose");
const input = document.getElementById("chatbotInput");
const body = document.getElementById("chatbotBody");
const sendBtn = document.getElementById("chatbotSend");

if (!btn || !popup || !closeBtn) {
    console.warn("Chatbot tidak aktif di halaman ini.");
} else {
    // Toggle popup
    btn.addEventListener("click", () => popup.classList.add("show"));
    closeBtn.addEventListener("click", () => popup.classList.remove("show"));

    // Kirim pesan
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        let userBubble = document.createElement("div");
        userBubble.className = "user-msg";
        userBubble.textContent = text;
        body.appendChild(userBubble);

        input.value = "";

        setTimeout(() => {
            let botBubble = document.createElement("div");
            botBubble.className = "bot-msg";
            botBubble.textContent = "Terima kasih! Saya sedang memproses pertanyaan Anda.";
            body.appendChild(botBubble);

            body.scrollTop = body.scrollHeight;
        }, 600);

        body.scrollTop = body.scrollHeight;
    }

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });
}
