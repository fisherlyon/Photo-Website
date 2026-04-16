const params = new URLSearchParams(window.location.search);
const project_id = params.get("id");

const viewer = document.getElementById("viewer");
const viewer_image = document.getElementById("viewer-image");
const prev_btn = document.getElementById("prev");
const next_btn = document.getElementById("next");

let currentIndex = 0;
let images = [];

fetch("projects.json")
  .then(res => res.json())
  .then(data => {
    const project = data.find(p => p.id === project_id);
    if (!project) return;

    document.getElementById("title").textContent = project.title;
    document.getElementById("description").textContent = project.description;

    const gallery = document.getElementById("gallery");

    for (let i = 1; i <= project.count; i++) {
      const img = document.createElement("img");
      img.src = `${project.folder}${i}.jpg`;
      img.loading = "lazy";

      images.push(img.src); // store image paths

      img.addEventListener("click", () => {
        currentIndex = i - 1;
        viewer_image.src = images[currentIndex];
        viewer.classList.remove("hidden");
      });

      gallery.appendChild(img);
    }
  });

// next image
next_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  viewer_image.src = images[currentIndex];
});

// previous image
prev_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  viewer_image.src = images[currentIndex];
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