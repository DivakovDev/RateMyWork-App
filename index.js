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
const writeTo = document.getElementById("to-input");
const writeFrom = document.getElementById("from-input");

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
    writeReview.value === "" ||
    writeFrom.value === "" ||
    writeTo.value === ""
  ) {
    emptyReview();
  }else{
    addReviews(writeTo.value, writeReview.value, writeFrom.value)
  }
}

function emptyReview() {
  publishReview
}

function addReviews(To, Review, From) {
  readyReviews.innerHTML += `
  <div class="ready-review">
      <h3>${To} </h3>
      <p>${Review}</p>
      <div class="from-rate">
        <h3 class="from">${From}</h3>
      </div>   
  </div>
  `;
}
