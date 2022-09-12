const apiResource = "/tasks"

const addButton = document.getElementById("add_button")
const taskInput = document.getElementById("task_input")
const tasksContainer = document.getElementById("tasks_container")
const errorContainer = document.getElementById("error_container")
const errorMessage = document.getElementById("error_message")

addButton.addEventListener("click", handleAddTask)

const todoTemplate = (id, text, done) => `
  <div class="w-full flex gap-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-4 items-center">
  <input id="done_checkbox_${id}" type="checkbox" onclick="toogleTask('${id}')" class="w-6 h-6 rounded-lg accent-blue-500" ${done ? "checked" : ""}>
  <p class="w-full">${text}</p>
  <button id="edit_button_${id}" onclick="editTask('${id}')" class="text-blue-700">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  </button>
  <button id="delete_button_${id}" onclick="deleteTask('${id}')" class="text-red-600">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  </button>
  </div>
`

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function getInitialTasks() {
  fetch(apiResource)
    .then(raw => raw.json())
    .then(res => {
      let template = ""

      res.map(task => template += todoTemplate(task.id, task.text, task.done))

      tasksContainer.innerHTML = ""

      tasksContainer.insertAdjacentHTML("afterbegin", template)
    })
    .catch(err => console.log(err))
}

function handleErrorMessage(message) {
  errorContainer.classList.remove("hidden")
  errorContainer.classList.add("flex")
  errorMessage.innerText = message
}

function removeErrorMessage() {
  errorContainer.classList.add("hidden")
  errorContainer.classList.remove("flex")
  errorMessage.innerText = ""
}

async function handleAddTask() {
  removeErrorMessage()

  try {
    const raw = await fetch(apiResource, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ text: taskInput.value })
    })

    const response = await raw.json()

    if (raw.status === 422) {
      handleErrorMessage(response.message)
      return
    }

    taskInput.value = ""

    tasksContainer.insertAdjacentHTML("afterbegin", todoTemplate(response.id, response.text, response.done))
  } catch (error) {
    console.log(error)
  }
}

async function toogleTask(id) {
  try {
    await fetch(`${apiResource}/${id}/toogle`, {
      method: 'PUT'
    })
  } catch (error) {
    console.log(error)
  }
}

async function editTask(id) {
  try {
    await fetch(apiResource, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ text: taskInput.value })
    })

    getInitialTasks()
  } catch (error) {
    console.log(error)
  }
}

async function deleteTask(id) {
  try {
    await fetch(`${apiResource}/${id}`, {
      method: 'DELETE'
    })

    getInitialTasks()
  } catch (error) {
    console.log(error)
  }
}

getInitialTasks()