import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://work-reviews-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const reviewsInDB = ref(database, "reviews");

const writeReview = document.getElementById("write-review");

const publishBtn = document.getElementById("publish-btn");
const readyReviews = document.getElementById("ready-reviews");

let publishReview = "";

publishBtn.addEventListener("click", function () {
  check();
  publishReview = readyReviews.innerHTML;
  push(reviewsInDB, readyReviews.innerHTML);
});

function check() {
  if (
    writeReview.value === ""
  ) {
    emptyReview();
  }else{
    addReviews(writeReview.value)
    console.log("clicked");
  }
}

function emptyReview() {
  publishReview = ""
}

function addReviews(Review) {
  readyReviews.innerHTML += `
  <li class="ready-review">
      <p>${Review}</p>
  </li>
  `;
}
