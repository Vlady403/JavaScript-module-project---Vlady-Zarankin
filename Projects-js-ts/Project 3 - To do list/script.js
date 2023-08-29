// Track the number of the task
let num = 1;

let flag = false;

let flagEdit = false;

let flagDelete = false;

let flagSaved = false;

// Creating an array to which the tasks will be added in the local storage
let tasksArray = [];

const confText = "Are you sure you want to delete this task?";

const min10Char = "At least 10 characters required";

const max25Char = "Maximum 25 characters";

// Getting the users input from the DOM
const textBox = document.querySelector("#txt");

const deleteAllbtn = document.querySelector("#delAll");

setFocusOnInput();

function setFocusOnInput() {
  const taskInput = document.querySelector("#txt");
  taskInput.addEventListener("blur", setFocusOnInput);
  taskInput.focus();
}

// The snackbar function
function handleUserMessage(messText) {
  const message = document.querySelector("#userMessage");

  // Setting the text of the message to the parameter in function to be set accordingly with each initiation of the function
  message.innerHTML = messText;

  message.className = "pop";

  // remove the message after 3 seconds
  setTimeout(function () {
    message.className = message.className.replace("pop", "");
  }, 3000);
}

function handleTasks(eventData) {
  const container = document.querySelector("#container");

  const divTask = document.createElement("div");

  divTask.classList.add("task");

  const divTaskText = document.createElement("div");

  divTaskText.classList.add("taskText");

  const divTaskButton = document.createElement("div");

  divTaskButton.classList.add("taskButton");

  const p = document.createElement("p");

  const allComp = document.querySelector("#btnAllComp");

  if (!flag) {
    // If the user presse Enter, execute the code
    if (eventData.keyCode == "13") {
      // Creating the buttons that handle each task
      const deleteTask = document.createElement("button");

      deleteTask.innerHTML = "Delete";

      deleteTask.classList.add("btnDel");

      const edit = document.createElement("button");

      edit.innerHTML = "Edit";

      edit.classList.add("btnEd");

      const save = document.createElement("button");

      save.innerHTML = "save";

      save.classList.add("btnSave");

      save.style.display = "none";

      const complete = document.createElement("button");

      complete.classList.add("btnComp");

      complete.innerHTML = "Completed";

      const mark = document.createElement("span");

      mark.innerHTML = "&#x2713";

      // Makin sure the task is the right length
      if (textBox.value.trim().length < 10) {
        handleUserMessage(min10Char);
        return false;
      } else if (textBox.value.trim().length > 25) {
        handleUserMessage(max25Char);

        return false;
      } else {
        // Assigning the user's input to the task content
        const taskText = textBox.value.trim();

        // Setting the task content
        p.textContent = num + ") " + taskText;

        // Appending all the divs and elements containing the task

        divTaskText.appendChild(p);

        container.appendChild(divTask);

        divTask.appendChild(divTaskText);

        divTask.appendChild(divTaskButton);

        divTaskButton.appendChild(complete);

        divTaskButton.appendChild(mark);

        divTaskButton.appendChild(deleteTask);

        divTaskButton.appendChild(edit);

        divTaskButton.appendChild(save);

        deleteAllbtn.style.display = "flex";
        num++;
        // Adding each task(it's text) to the array to be stored in the local storage
        tasksArray.push(taskText);

        localStorage.setItem(`Task`, JSON.stringify(tasksArray));

        textBox.value = "";

        renumberTasks();
      }

      // Reordering the numbers of the tasks when deleting/editing a task
      function renumberTasks() {
        const taskElements = document.querySelectorAll(".taskText");

        taskElements.forEach((task, index) => {
          const taskText = task.querySelector("p");

          // Setting the the task content again to the reordered numbers and the text
          taskText.textContent =
            index + 1 + ") " + taskText.textContent.substring(3);
        });
      }

      // Handling deletion of tasks
      deleteTask.addEventListener("click", () => {
        if (!flagDelete) {
          const userDec = confirm(confText);
          // If the user chooses 'OK'(true), execute the code below
          if (userDec) {
            // Creating an array out of each div with the "taskText" class name, then getting the index of the task text itself to be used as a tracker
            const taskIndex = Array.from(
              document.querySelectorAll(".taskText")
            ).indexOf(divTaskText);

            // Removing the task(it's text) based on the index we set above, from the array of tasks in the local storage
            tasksArray.splice(taskIndex, 1);

            // Setting the array in the local storage again now without the removed task
            localStorage.setItem("Task", JSON.stringify(tasksArray));

            // Delete the task from the screen
            divTask.remove();

            // Reorder the numbers of the tasks
            renumberTasks();
          }
        }
      });

      edit.addEventListener("click", () => {
        // Prevent the enter key and the edit and delete buttons to function while editing
        flag = true;

        flagEdit = true;

        flagDelete = true;

        const taskTextSpan = divTaskText.querySelector("p");

        const taskInitText = taskTextSpan.textContent;

        const index1 = 0;

        const taskNum = taskInitText.at(index1);

        let taskText = taskTextSpan.textContent.substring(3);

        textBox.classList.add("editing");

        textBox.value = taskText.trim();

        save.style.display = "block";

        save.addEventListener("click", () => {
          // Restoring the enter key and the edit and delete buttons function after saving the updated task
          flagEdit = false;

          flagDelete = false;

          // Getting the new, changed text
          const newText = textBox.value.trim();

          // Creating an array out of each div with the "taskText" class name, then getting the index of the task text itself to be used as a tracker
          const taskIndex = Array.from(
            document.querySelectorAll(".taskText")
          ).indexOf(divTaskText);

          // If the input field is not empty
          if (newText !== "") {
            debugger;
            flag = true;

            // Handle the input's length the same way as when creating a task
            if (newText.length > 25) {
              debugger;

              handleUserMessage(max25Char);

              return;
            } else if (newText.length < 10) {
              handleUserMessage(min10Char);

              return;
            } else {
              flag = false;

              flagSaved = true;
              // Getting the exact task wer'e editing and setting it's value to the text in the input
              tasksArray[taskIndex] = newText;

              // Setting the new text with the same number of task on the screen
              taskTextSpan.textContent = `${taskNum}) ${newText}`;

              // Updating the tasks array in the local storage
              localStorage.setItem("Task", JSON.stringify(tasksArray));

              // Clearing the input field
              textBox.value = "";

              textBox.classList.remove("editing");

              save.style.display = "none";
            }
          } else {
            if (!flagSaved) {
              handleUserMessage(min10Char);
            }
          }
          renumberTasks();
        });
      });

      // When a task is completed, handle the appropriate elements
      complete.addEventListener("click", () => {
        debugger;
        // Prevent the user from clicking on teh "completed" while editing
        if (!flagEdit) {
          edit.style.setProperty("display", "none");

          divTaskText.style.setProperty("text-decoration", "line-through");

          complete.style.setProperty("display", "none");

          save.style.setProperty("display", "none");

          mark.style.setProperty("display", "block");
        }
      });
      allComp.addEventListener("click", () => {
        const getAll = document.querySelectorAll("div.task");

        // Gett all the tasks and remove them, reset the numbers count
        for (let i = 0; i < getAll.length; i++) {
          getAll[i].remove();
          num--;
        }

        // Remove all the tasks from the local storage as well
        localStorage.removeItem(
          "task",
          tasksArray.splice(0, tasksArray.length)
        );

        localStorage.clear();

        deleteAllbtn.style.display = "none";
      });

      // When a task is completed, clicking on the V symbol brings back the task and it's elements to their initial form
      mark.addEventListener("click", () => {
        mark.style.setProperty("display", "none");

        complete.style.setProperty("display", "flex");

        edit.style.setProperty("display", "flex");

        divTaskText.style.setProperty("text-decoration", "none");
      });
      textBox.value = "";
    }
  }
}
