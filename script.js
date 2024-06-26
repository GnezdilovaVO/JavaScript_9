"use strict";
const data = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]`;
const key = "exercises";
const divEl = document.querySelector(".containerExercises");

if (!localStorage.getItem(key)) {
  localStorage.setItem(key, data);
}

const exercises = JSON.parse(localStorage.getItem(key));

divEl.innerHTML = exercises
  .map((element) => createExerciseHTML(element))
  .join("");

function createExerciseHTML(exercise) {
  return `<div class="exercise box" data-id = ${exercise.id}>
  <div class="name">${exercise.name}</div>
  <div class="time">${exercise.time}</div>
  <div class="maxParticipants">${exercise.maxParticipants}</div>
  <div class="currentParticipants">${exercise.currentParticipants}</div>
  <button class="sign_up">Sign up</button>
  <button class="cancel">Cancel</button>
</div>`;
}

divEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("sign_up")) {
    return;
  }
  const exerciseEl = e.target.closest(".exercise");
  const exercise = exercises.find(
    (exercise) => exercise.id === +exerciseEl.getAttribute("data-id")
  );
  const maxPart = +exerciseEl.querySelector(".maxParticipants").innerHTML;
  const currentPart = +exerciseEl.querySelector(".currentParticipants")
    .innerHTML;
  if (maxPart > currentPart) {
    exerciseEl.querySelector(".currentParticipants").textContent =
      currentPart + 1;
    exercise.currentParticipants = currentPart + 1;
    localStorage.setItem(key, JSON.stringify(exercises));
    if (maxPart === currentPart) {
      exerciseEl.querySelector(".sign_up").setAttribute("disabled", true);
    }
  }
});

divEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cancel")) {
    return;
  }
  const exerciseEl = e.target.closest(".exercise");
  const exercise = exercises.find(
    (exercise) => exercise.id === +exerciseEl.getAttribute("data-id")
  );
  const currentPart = +exerciseEl.querySelector(".currentParticipants")
    .innerHTML;
  if (currentPart > 0) {
    exerciseEl.querySelector(".currentParticipants").textContent =
      currentPart - 1;
    exercise.currentParticipants = currentPart + -1;
    localStorage.setItem(key, JSON.stringify(exercises));
  } else {
    exerciseEl.querySelector(".cancel").setAttribute("disabled", true);
  }
});
