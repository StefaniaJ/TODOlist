"use strict";

const link = "https://singers-373b.restdb.io/rest/todo";
const corskey = "5d8a48a2fd86cb75861e26eb";
const form = document.querySelector("#addForm");
const editForm = document.querySelector("#editForm");
const modal = document.querySelector(".modal-bg");
const close = document.querySelector(".close");

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
  // clone.querySelector(".hour").textContent = task.hour;
  // clone.querySelector(".day").textContent = task.day;
  // clone.querySelector(".status").textContent = task.status;

  // Button to remove a task
  clone.querySelector(".btnRemoveTask").addEventListener("click", () => {
    console.log(task._id);
    deleteIt(task._id);
  });

  // Button to edit a task
  clone.querySelector(".btnEditTask").addEventListener("click", e => {
    fetchAndPopulate(task._id);
    modal.classList.remove("hide");
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
      // editForm.elements.day.value = tasks.day;
      // editForm.elements.hour.value = tasks.hour;
      // editForm.elements.status.value = tasks.status;
      editForm.elements.id.value = tasks._id;
    });
}

function post() {
  const data = {
    // task: "sleeeeeeeeepppppp",
    // date: "2019-09-27T23:50:31.030Z",
    // important: true
    task: form.elements.task.value
    // day: form.elements.day.value,
    // hour: form.elements.hour.value
    // status: form.elements.status.value
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
    .then(data => {
      addTasksToTheDOM(data);
    });
  form.elements.task.value = "";
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
    task: editForm.elements.task.value
    // day: editForm.elements.day.value,
    // hour: editForm.elements.hour.value
    // status: editForm.elements.status.value
  };

  let postData = JSON.stringify(data);
  const tasksID = editForm.elements.id.value;
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
        `.toDoListContainer[data-taskid="${updateTask._id}"]`
      );
      //update the dom
      parentElement.querySelector(".taskName").textContent = updateTask.task;
      // parentElement.querySelector(".day").textContent = updateTask.day;
      // parentElement.querySelector(".hour").textContent = updateSinger.hour;
      // parentElement.querySelector(".status").textContent = updateTask.status;
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

document
  .querySelector("#done")
  .addEventListener("click", () => modal.classList.add("hide"));

close.addEventListener("click", () => modal.classList.add("hide"));
