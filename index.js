const writeReview = document.getElementById("write-review")
const writeTo = document.getElementById("to-input")
const writeFrom = document.getElementById("from-input")



const publishBtn = document.getElementById("publish-btn")
const readyReviews = document.getElementById("ready-reviews")

let publishReview = ''
let likesCount = 0

publishBtn.addEventListener("click", function(){
    
    function check(){
        if(writeReview.value === '' || writeFrom.value === '' || writeTo.value === ''){
            publishReview = ''
        }else{
            publishReview += `
            <div class="ready-review">
              <h3> To ${writeTo.value} </h3>
              <p> ${writeReview.value}</p>
              <div class="from-rate">
              <h3 class="from"> From ${writeFrom.value} </h3>
              <div class="likes">
              <button id="like"><img class="rate-img" src="img/hearth.svg"/></button>
              <h3>${likesCount}</h3>
              </div>
              </div>   
            </div>
            `
        }
    }
    
    check()
    readyReviews.innerHTML = publishReview
})


