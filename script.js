"use strict";

const btn = document.querySelector(".btn");
const scoreCount = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const btnCLoseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const description = document.querySelector(".show-modal-description");
const displayModal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text");
const modalText2 = document.querySelector(".modal-text2");
const difficulty = document.querySelector(".difficulty");
const line = document.querySelector(".line");
const easy = document.querySelector(".easy");
const hard = document.querySelector(".hard");
const countText = document.querySelector(".count");

let score = 0;
let count = 20;
let time = 800;
scoreCount.textContent = score;
countText.textContent = count;
easy.classList.add("active");
btn.addEventListener("click", function () {
  //so it can't be started again
  btn.disabled = true;
  //nothing can be clicked
  difficulty.disabled = true;
  description.disabled = true;

  //when restarted
  score = 0;
  count = 20;
  scoreCount.textContent = score;
  countText.textContent = count;

  btn.textContent = "WHACK FAST";

  //main loop
  let loop = 0;
  let interval = setInterval(() => {
    //for counter
    count--;
    countText.textContent = count;

    let random = Math.trunc(Math.random() * 6);
    loop++;
    let m = moles[random];
    //show the mole
    m.classList.remove("hidden");
    //add up score when clicked on mole
    m.addEventListener("click", a);
    //hide the mole after time up
    setTimeout(() => {
      m.classList.add("hidden");
      //remove handler for next iteration
      m.removeEventListener("click", a);
    }, time);
    //when total 20s is up
    if (loop === 20) {
      btn.disabled = false;
      difficulty.disabled = false;
      description.disabled = false;
      btn.textContent = "TRY AGAIN";
      clearInterval(interval);
      return;
    }
  }, 1000);
});

function a() {
  score++;
  scoreCount.textContent = score;
}
//closing the modal and blurring overlay
function closeModal() {
  displayModal.classList.add("hidden");
  overlay.classList.add("hidden");
  if (!line.classList.contains("hidden")) {
    line.classList.add("hidden");
    easy.classList.add("hidden");
    hard.classList.add("hidden");
  }
}

btnCLoseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//opening the modal
function openModal() {
  displayModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

//opening description
description.addEventListener("click", function () {
  modalText.textContent = `Hii.
  So a classic game.
  Hit the musa and get points.
  Total time 20s.
  Good luck and yes there is an exploit😜.
  `;
  openModal();
});

//changing the difficulty
difficulty.addEventListener("click", function () {
  //configuring the modal
  modalText.textContent = `Change the difficulty.`;
  line.classList.remove("hidden");
  easy.classList.remove("hidden");
  hard.classList.remove("hidden");
  openModal();

  //which button is clicked
  //easy clicked
  easy.addEventListener("click", function () {
    time = 800;
    if (!easy.classList.contains("active")) {
      easy.classList.add("active");
      if (hard.classList.contains("active")) {
        hard.classList.remove("active");
      }
    }
  });
  //hard clicked
  hard.addEventListener("click", function () {
    time = 600;
    if (!hard.classList.contains("active")) {
      hard.classList.add("active");
      if (easy.classList.contains("active")) {
        easy.classList.remove("active");
      }
    }
  });
});
