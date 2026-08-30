const params = new URLSearchParams(window.location.search);
const gallery_id = params.get("id");

const viewer = document.getElementById("viewer");
const viewer_image = document.getElementById("viewer-image");

const prev_btn = document.getElementById("prev");
const next_btn = document.getElementById("next");

const next_gallery_btn = document.getElementById("next-gallery");
const prev_gallery_btn = document.getElementById("prev-gallery");

let currentIndex = 0;
let imgs = [];

fetch("galleries.json")
    .then(res => res.json())
    .then(data => {

        const gallery = data.find(p => p.id === gallery_id);

        if (!gallery) return;

        document.getElementById("title").textContent = gallery.title;

        const images = document.getElementById("images");

        gallery.images.forEach((image, index) => {

            const img = document.createElement("img");

            img.src = image.file;
            img.loading = "lazy";

            if (image.orientation) {
                img.classList.add(image.orientation);
            }

            imgs.push(image.file);

            img.addEventListener("click", () => {

                currentIndex = index;

                viewer_image.src = imgs[currentIndex];

                viewer.classList.remove("hidden");

            });

            images.appendChild(img);
        });

        // -------------------------
        // NEXT / PREVIOUS GALLERY
        // -------------------------

        const nextGallery = data.find(
            p => p.id === gallery["next-gallery"]
        );

        const prevGallery = data.find(
            p => p.id === gallery["prev-gallery"]
        );


        // NEXT GALLERY

        if (nextGallery) {

            next_gallery_btn.querySelector(".gallery-name").textContent =
                nextGallery.title;

            next_gallery_btn.addEventListener("click", () => {

                window.location.href =
                    `gallery-template.html?id=${nextGallery.id}`;

            });

        } else {

            next_gallery_btn.style.display = "none";

        }


        // PREVIOUS GALLERY

        if (prevGallery) {

            prev_gallery_btn.querySelector(".gallery-name").textContent =
                prevGallery.title;

            prev_gallery_btn.addEventListener("click", () => {

                window.location.href =
                    `gallery-template.html?id=${prevGallery.id}`;

            });

        } else {

            prev_gallery_btn.style.display = "none";

        }

    });


// -------------------------
// NEXT IMAGE
// -------------------------

next_btn.addEventListener("click", (e) => {

    e.stopPropagation();

    currentIndex = (currentIndex + 1) % imgs.length;

    viewer_image.src = imgs[currentIndex];

});


// -------------------------
// PREVIOUS IMAGE
// -------------------------

prev_btn.addEventListener("click", (e) => {

    e.stopPropagation();

    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;

    viewer_image.src = imgs[currentIndex];

});


// -------------------------
// CLOSE VIEWER
// -------------------------

viewer.addEventListener("click", (e) => {

    if (e.target === viewer) {

        viewer.classList.add("hidden");

    }

});


// -------------------------
// KEYBOARD CONTROLS
// -------------------------

document.addEventListener("keydown", (e) => {

    if (viewer.classList.contains("hidden")) return;

    if (e.key === "ArrowRight") next_btn.click();

    if (e.key === "ArrowLeft") prev_btn.click();

    if (e.key === "Escape") viewer.classList.add("hidden");

});