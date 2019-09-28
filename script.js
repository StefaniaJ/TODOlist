"use strict";

const link = "https://singers-373b.restdb.io/rest/todo";
const corskey = "5d8a48a2fd86cb75861e26eb";
const form = document.querySelector("#addForm");
const editForm = document.querySelector("#editForm");

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

function addTasksToTheDOM(task) {
  // Set the variables
  const template = document.querySelector("#template").content;
  const clone = template.cloneNode(true);
  const parent = document.querySelector(".toDoList");

  // Add content to the template
  clone.querySelector(".toDoListContainer").dataset.taskid = task._id;
  clone.querySelector(".taskName").textContent = task.task;
  clone.querySelector(".time").textContent = task.time;
  clone.querySelector(".day").textContent = task.day;
  clone.querySelector(".important").textContent = task.important;

  // Button to remove a task
  clone.querySelector(".btnRemoveTask").addEventListener("click", () => {
    console.log(task._id);
    deleteIt(task._id);
  });

  // Button to edit a task
  clone.querySelector(".btnEditTask").addEventListener("click", e => {
    fetchAndPopulate(task._id);
  });

  // Append the clone to the parent
  parent.prepend(clone);
}
get();

function fetchAndPopulate(id) {
  fetch(`https://singers-373b.restdb.io/rest/todo/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d8a48a2fd86cb75861e26eb",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(tasks => {
      console.log(tasks);
      editForm.elements.task.value = tasks.task;
      editForm.elements.day.value = tasks.day;
      editForm.elements.time.value = tasks.time;
      // editForm.elements.importantStatus.value = tasks.important;
      editForm.elements.id.value = task._id;
    });
}

function post() {
  const data = {
    // task: "sleeeeeeeeepppppp",
    // date: "2019-09-27T23:50:31.030Z",
    // important: true
    task: form.elements.task.value,
    day: form.elements.date.value,
    time: form.elements.time.value
    // important: form.elements.importantStatus.value
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

function deleteIt(id) {
  fetch("https://singers-373b.restdb.io/rest/todo/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": corskey,
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      // TODO: Delete from DOM
      document
        .querySelector(`.toDoListContainer[data-taskid="${id}"]`)
        .remove();
    });
}

function put() {
  let data = {
    task: editForm.elements.task.value,
    day: editForm.elements.date.value,
    time: editForm.elements.time.value
    // important: editForm.elements.importantStatus.value
  };

  let postData = JSON.stringify(data);
  const tasksID = formEdit.elements.id.value;
  fetch("https://singers-373b.restdb.io/rest/todo/" + tasksID, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d8a48a2fd86cb75861e26eb",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(updateTask => {
      //find the parent
      const parentElement = document.querySelector(
        `.tasks[data-taskid="${updateTask._id}"]`
      );
      //update the dom
      parentElement.querySelector(".task").textContent = updateTask.task;
      parentElement.querySelector(".day").textContent = updateTask.day;
      parentElement.querySelector(".time").textContent = updateSinger.time;
      parentElement.querySelector(".importantStatus").textContent =
        updateTask.important;
    });
}

// GLOBAL EVENTS

// Button to  create a new task
document.querySelector(".btnAddTask").addEventListener("click", e => {
  post();
});

form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();
});
editForm.addEventListener("submit", evt => {
  evt.preventDefault();
  put();
});
