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

const inputFieldEl = document.getElementById("write-review");

const addButtonEl = document.getElementById("publish-btn");
const readyReviewsEl = document.getElementById("ready-reviews");

addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value
  
  push(reviewsInDB, inputValue)
  
  clearInputFieldEl()
})

onValue(reviewsInDB, function(snapshot) {
  if (snapshot.exists()) {
      let reviewsArray = Object.entries(snapshot.val())
  
      clearEl()
      
      for (let i = 0; i < reviewsArray.length; i++) {
          let currentItem = reviewsArray[i]
          let currentItemID = currentItem[0]
          let currentItemValue = currentItem[1]
          
          appendItemToreadyReviewsEl(currentItem)
      }    
  } else {
    readyReviewsEl.innerHTML = "No items here... yet"
  }
})

function clearEl() {
  readyReviewsEl.innerHTML = ""
}

function clearInputFieldEl() {
  inputFieldEl.value = ""
}

function appendItemToreadyReviewsEl(item) {
  let reviewsId = item[0]
  let reviewsValue = item[1]
  
  let newReview = document.createElement("li")
  
  newReview.textContent = reviewsValue
  
  newReview.addEventListener("click", function() {
      let exactLocationOfItemInDB = ref(database, `shoppingList/${reviewsId}`)
      
      remove(exactLocationOfItemInDB)
  })
  
  readyReviewsEl.append(newReview)
}