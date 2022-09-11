const addButton = document.getElementById("add_button")
const taskInput = document.getElementById("task_input")

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

addButton.addEventListener("click", handleAddTask)

async function handleAddTask() {
  try {
    const raw = await fetch("/task", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ text: taskInput.value })
    })

    const response = await raw.json()

    console.log(response)
  } catch (error) {
    console.log(error)
  }
}