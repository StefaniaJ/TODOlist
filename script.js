"use strict";

const link = "https://singers-373b.restdb.io/rest/todo";
const corskey = "5d8a48a2fd86cb75861e26eb";

function get() {
  fetch("https://singers-373b.restdb.io/rest/todo", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d8a48a2fd86cb75861e26eb",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(tasks => {
      tasks.forEach(addTasksToTheDOM);
      console.log(tasks);
    });
}
get();

function addTasksToTheDOM(taskE) {
  // Set the variables
  const template = document.querySelector("#template").content;
  const clone = template.cloneNode(true);
  const parent = document.querySelector(".toDoList");

  // Add content to the template
  clone.querySelector(".taskName").textContent = taskE.task;
  clone.querySelector(".time").textContent = taskE.time;
  clone.querySelector(".day").textContent = taskE.day;
  clone.querySelector(".date").textContent = taskE.date;
  clone.querySelector(".important").textContent = taskE.important;

  // Append the clone to the parent
  parent.appendChild(clone);
}

function post() {
  const data = {
    task: "drink more water",
    date: "2019-09-27T23:50:31.030Z",
    important: true
  };

  const postData = JSON.stringify(data);
  fetch(link, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": corskey,
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => console.log(data));
  addTasksToTheDOM(data);
}
