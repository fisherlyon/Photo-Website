const params = new URLSearchParams(window.location.search);
const gallery_id = params.get("id");

const viewer = document.getElementById("viewer");
const viewer_image = document.getElementById("viewer-image");
const prev_btn = document.getElementById("prev");
const next_btn = document.getElementById("next");

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
        img.classList.add(image.orientation);

        imgs.push(image.file);

        img.addEventListener("click", () => {
            currentIndex = index;
            viewer_image.src = imgs[currentIndex];
            viewer.classList.remove("hidden");
        });

        images.appendChild(img);
    });
  });

// next image
next_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % imgs.length;
  viewer_image.src = imgs[currentIndex];
});

// previous image
prev_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  viewer_image.src = imgs[currentIndex];
});

// close viewer (only when clicking background)
viewer.addEventListener("click", (e) => {
  if (e.target === viewer) {
    viewer.classList.add("hidden");
  }
});

// keyboard controls
document.addEventListener("keydown", (e) => {
  if (viewer.classList.contains("hidden")) return;

  if (e.key === "ArrowRight") next_btn.click();
  if (e.key === "ArrowLeft") prev_btn.click();
  if (e.key === "Escape") viewer.classList.add("hidden");
});