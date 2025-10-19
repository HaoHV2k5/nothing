
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};

document.addEventListener("click", function () {
  const audio = document.getElementById("bg-music");
  if (audio.paused) {
    audio.play().catch(err => console.log("Không thể tự phát nhạc:", err));
  }
}, { once: true });
