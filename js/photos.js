/* photos.js */

const buttons = document.querySelectorAll(".gallery-btn");
const images = document.querySelectorAll(".gallery img");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        images.forEach(img => {
            if (filter === "all" || img.dataset.category === filter) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
        });
    });
});

const viewer = document.getElementById("viewer");
const viewer_image = document.getElementById("viewer-image");

document.querySelector(".gallery").addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    viewer_image.src = img.src;
    viewer.classList.remove("hidden");
});

viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
        viewer.classList.add("hidden");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") viewer.classList.add("hidden");
});