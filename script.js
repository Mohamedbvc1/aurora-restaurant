const photos = [
  "images/margherita.jpg",
  "images/spinach-burrata.jpg",
  "images/veggie-supreme.jpg",
  "images/cherry-tomato-pesto.jpg",
  "images/four-cheese.jpg",
  "images/classic-burger.jpg",
  "images/cheeseburger.jpg",
  "images/double-smash-burger.jpg",
  "images/buffalo-wings.jpg",
  "images/honey-garlic-wings.jpg",
  "images/ribeye-steak.jpg",
  "images/sirloin-steak.jpg"
];

let current = 0;
const slide = document.getElementById("slide");

function showNext() {
  current = current + 1;
  if (current >= photos.length) {
    current = 0;
  }
  slide.src = photos[current];
}






let timer = setInterval(showNext, 3000);
let paused = false;

function showPrevious() {
  current = current - 1;
  if (current < 0) {
    current = photos.length - 1;
  }
  slide.src = photos[current];
}

document.getElementById("nextBtn").addEventListener("click", showNext);
document.getElementById("prevBtn").addEventListener("click", showPrevious);

document.getElementById("pauseBtn").addEventListener("click", function () {
  if (paused) {
    timer = setInterval(showNext, 3000);
    this.textContent = "Pause";
  } else {
    clearInterval(timer);
    this.textContent = "Resume";
  }
  paused = !paused;
});

const credits = document.createElement("p");
credits.id = "credits";
credits.textContent = "Photos from Unsplash by David Foodphototasty, Sehoon Ye, Dima Solomin, Artem Mihailov, Amirali Mirhashemian, Mike, Alina Chernysheva, Diego Arenas, Tim Toomey and Karolina Kołodziejczak.";
document.querySelector("main").append(credits);
