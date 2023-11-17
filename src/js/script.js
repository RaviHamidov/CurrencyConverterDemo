let listFrom = document.querySelector(".project_content-primary--list");
let listFromLi = document.querySelectorAll(".project_content-primary--list--valueFrom");
let listTo = document.querySelector(".project_content-secondary--list");
let listToLi = document.querySelectorAll(".project_content-secondary--list--valueTo");
let fromInput = document.querySelector(".fromInput");
let toInput = document.querySelector(".toInput");
let form = document.querySelector(".project_content-primary--inputFrom");
let fromP = document.querySelector(".from-p");
let toP = document.querySelector(".to-p");
let from = "RUB", to = "USD";
fromInput.value = 100;

eventListeners();
checkLi();

function eventListeners() {
  listFrom.addEventListener("click", fromValue);
  listTo.addEventListener("click", toValue);
  fromInput.addEventListener("keyup", getData);
  listTo.addEventListener("click", getData);
  listFrom.addEventListener("click", getData);

  document.addEventListener("DOMContentLoaded", getData);
}

function getData(e) {
  let out;
  e.preventDefault();
  fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Qr9ZVWp7XvynRwhlHo4QqRp5Wlt46dbFEnDQyqno&currencies=${to}&base_currency=${from}`)
    .then((response) => {
      return response.json();
    })

    .then((data) => { 
      out = Object.values(data.data)[0];
      fromP.innerText = `1 ${from} = ${out} ${to}`;
      toP.innerText = `1 ${to} = ${1 / out} ${from}`;
      calc(out);
    })
    .catch((err) => {
    });
}

function fromValue(e) {
  if (e.target.className === "project_content-primary--list--valueFrom") {
    from = e.target.innerText;
    console.log(from);
    checkLi();
  }
  e.preventDefault();
}

function toValue(e) {
  if (e.target.className === "project_content-secondary--list--valueTo") {
    to = e.target.innerText;
    console.log(to);
    checkLi();
  }
  e.preventDefault();
}

function calc(out) {
  toInput.value = (out * fromInput.value).toFixed(2);
}

function checkLi() {
  listFromLi.forEach((item) => {
    item.classList.remove("active");
    if (from == item.innerText) {
      item.classList.add("active");
    }
  });
  
  listToLi.forEach((item) => {
    item.classList.remove("active");
    if (to == item.innerText) {
      item.classList.add("active");
    }
  });
}
