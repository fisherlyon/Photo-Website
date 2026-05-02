// project-page.js

const buttons = document.querySelectorAll(".project-btn");
const items = document.querySelectorAll(".project-item");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        // update active button
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        items.forEach(item => {
            const category = item.querySelector("img").dataset.category;

            if (filter === "all" || category === filter) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});