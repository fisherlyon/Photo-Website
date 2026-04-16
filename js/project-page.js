// project-page.js

const buttons = document.querySelectorAll(".project-btn");
const images = document.querySelectorAll(".project-gallery img");

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