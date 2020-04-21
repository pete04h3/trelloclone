"use strict";

//GET
const endpoint = "https://frontendspring20-760f.restdb.io/rest/superheroes";
const apiKey = "5e956e75436377171a0c2305";

window.addEventListener("load", (e) => {
  document.querySelector("button.add-new").addEventListener("click", () => {
    const data = {
      title: "Title" + Math.random(),
      description: "",
    };
    post(data);
  });
});
function get() {
  document.querySelector("main").innerHTML = "";
  fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset-utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((e) => e.json())
    /*  .then((e) => console.log(e)) */
    .then(showHeroes);
}

get();

function showHeroes(data) {
  data.forEach(showHero);
}

function showHero(hero) {
  console.log(hero);
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  const parent = document.querySelector(".box");

  copy.querySelector("article").dataset.id = hero._id;
  copy.querySelector("article > form > label:nth-child(1) > input[type=password]").textContent = hero.real_name;
  copy.querySelector("article > form > label:nth-child(2) > input[type=text]").textContent = hero.alias;
  copy.querySelector("article > form > label:nth-child(3) > input[type=date]").textContent = hero.date;

  const ul = copy.querySelector("ul");

  /* hero.powers.forEach((power) => {
    const li = document.createElement("li");
    li.textContent = power;
    ul.appendChild(li);
  }); */

  //submit btn

  copy.querySelector("button").addEventListener("click", () => deleteIt(hero._id));
  parent.appendChild(copy);

  // copy.querySelector("button.savebtn").addEventListener("click", () => showSuperHero(data));
  // parent.appendChild(copy);
}

//POST

function post(data) {
  //OPTIMISTIC INSERTS
  console.log(data);

  showHero(data);

  const postData = JSON.stringify(data);

  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => showHero(data));
}

function deleteIt(id) {
  document.querySelector(`article[data-id="${id}"]`).remove();
  fetch(`${endpoint}/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

//PUT

function put(id) {
  const data = {
    real_name: "Master Yoda",
    Alias: "JediMaster" + Math.random(),
    Date: "unknown",
    powers: ["infinite"],
  };
  let postData = JSON.stringify(data);

  fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((d) => d.json())
    .then((data) => {
      const copy = document.querySelector(`article[data-id="${id}"]`);
      copy.querySelector("article > form > label:nth-child(1) > input[type=password]").textContent = data.real_name;
      copy.querySelector("article > form > label:nth-child(2) > input[type=text]").textContent = data.alias;
      const ul = copy.querySelector("ul");
      data.powers.forEach((power) => {
        const li = document.createElement("li");
        li.textContent = power;
        ul.appendChild(li);
      });
    });
}

//submit btn

function postSuperhero(payload) {
  const postData = JSON.stringify(payload);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset-utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => showSuperHero);
}

function getSuperheroes() {
  fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset-utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => data.forEach(showSuperHero));
}

const template = document.querySelector("template").content;

function showSuperHero(hero) {
  const clone = template.cloneNode(true);
  clone.querySelector("h2").textContent = hero.alias;
  clone.querySelector("h3 span").textContent = hero.real_name;
  const ul = clone.querySelector("ul");
  hero.powers.forEach((pow) => {
    const li = document.createElement("li");
    li.textContent = pow;
    ul.appendChild(li);
  });
  heroContainer.appendChild(clone);
}

/* postSuperhero({
  real_name: FormData.elements.real_name.value,
  alias: FormData.elements.alias.value,
  date: FormData.elements.date.value,
  enemies: FormData.elements.enemies.value,
  powers: [],
}); */
