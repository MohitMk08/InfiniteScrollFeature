// const apiKey = "SAXkK9dlUqKRLMGa2g4vfFKUYal5XuJwlWnTV2r-4T8";
// const imgContainer = document.querySelector(".container");

// function updateScreen(data) {
//     data.forEach((e) => {
//         let eachImage = document.createElement('img');
//         eachImage.src = e.urls.small;
//         imgContainer.appendChild(eachImage);
//     });
// }

// async function fetchImages() {
//     const count = 20;
//     const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`);
//     const data = await response.json();
//     console.log(data);
//     updateScreen(data);
// }

// fetchImages();

// 
const apiKey = "SAXkK9dlUqKRLMGa2g4vfFKUYal5XuJwlWnTV2r-4T8";
const imgContainer = document.querySelector(".container");
const loader = document.querySelector(".loader");
let loading = false;
const count = 20;

async function fetchImages() {
    if (loading) return;
    loading = true;
    loader.style.display = "block"; // Show loader

    try {
        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`);
        const data = await response.json();
        console.log(data);
        updateScreen(data);
    } catch (error) {
        console.error("Error fetching images:", error);
    } finally {
        setTimeout(() => {
            loader.style.display = "none"; // Hide loader after 5 seconds
            loading = false;
        }, 3000);
    }
}


function updateScreen(data) {
    data.forEach((e) => {
        const imgCard = document.createElement("div");
        imgCard.classList.add("image-card");

        const eachImage = document.createElement("img");
        eachImage.src = e.urls.small;
        eachImage.loading = "lazy";

        const downloadBtn = document.createElement("a");
        downloadBtn.innerText = "Download";
        downloadBtn.href = e.urls.full; // High-resolution image URL
        downloadBtn.download = "image.jpg"; // Suggested filename
        downloadBtn.classList.add("download-btn");
        downloadBtn.setAttribute("target", "_blank"); // Opens in new tab

        imgCard.appendChild(eachImage);
        imgCard.appendChild(downloadBtn);
        imgContainer.appendChild(imgCard);
    });
}

// Infinite Scroll Logic
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchImages();
    }
});

// Initial Fetch
fetchImages();

// Scroll to Top Button Logic
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


const darkModeToggle = document.getElementById('darkModeToggle');

// Check if dark mode is already active from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.querySelector('.container').classList.add('dark-mode');
    document.querySelectorAll('.image-card').forEach(card => card.classList.add('dark-mode'));
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelectorAll('.image-card').forEach(card => card.classList.toggle('dark-mode'));

    // Save dark mode preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.removeItem('darkMode');
    }
});





