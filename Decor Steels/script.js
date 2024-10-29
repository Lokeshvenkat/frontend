// script.js

function showAbout() {
  document.getElementById("aboutSection").style.display = "block";
}

function hideAbout() {
  document.getElementById("aboutSection").style.display = "none";
}

// Load Popper.js
const popperScript = document.createElement("script");
popperScript.src =
  "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js";
popperScript.crossOrigin = "anonymous";
document.head.appendChild(popperScript);

// Load Bootstrap bundle
popperScript.onload = () => {
  const bootstrapScript = document.createElement("script");
  bootstrapScript.src =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
  bootstrapScript.crossOrigin = "anonymous";
  document.head.appendChild(bootstrapScript);
};
