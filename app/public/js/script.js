const body = document.querySelector("body")

const taskList = document.querySelector('[data-tasks]')

const addBtn = document.querySelector('[data-add]')

const containerText = document.querySelector('[data-text-container]')
var title = document.querySelector('[data-title]')
const task = document.querySelector('[data-new-task]')
const modal = document.querySelector('[data-modal]')
const confirmBtn = document.querySelector('[data-confirm]')
const confirmChangeBtn = document.querySelector('[data-confirm-change]')
const cancelBtn = document.querySelector('[data-cancel]')

var id = 1

const template = document.querySelector('[data-task]')

function showContainerModal() {
  containerText.classList.add("show")
  modal.classList.add("show")
  task.focus()
}

function showAddTask() {
  title.innerHTML = "Adicione a tarefa"
  task.value = ""
  confirmBtn.classList.add("show")
  confirmChangeBtn.classList.remove("show")
}

function showChangeTask(id) {
  title.innerHTML = "Mude a tarefa"
  confirmBtn.classList.remove("show")
  confirmChangeBtn.classList.add("show")
  confirmChangeBtn.id = id
  let taskValue = task.value
  task.setSelectionRange(0, taskValue.length)
}

function hideContainerModal() {
  containerText.classList.remove("show")
  modal.classList.remove("show")
  task.value = ""
}

function addTask() {
  let taskValue = task.value
  let elements = createElements()
  elements.pElement.textContent = taskValue

  giveId(elements.pElement, "p")
  giveId(elements.editBtn, "edit")
  giveId(elements.deleteBtn, "delete")

  let clone = template.content.cloneNode(true)

  let clones = []
  clones.push(clone)

  let spanElement = createTask()

  let listaClone = clones.map(clone => {

    giveId(spanElement, "span")
    id++

    spanElement.appendChild(clone)
    return spanElement
  })
  taskList.prepend(...listaClone)
}

function createElements() {
  let pElement = template.content.querySelector("p")
  let editBtn = template.content.querySelector(".editar")
  let deleteBtn = template.content.querySelector(".apagar")

  return {
    pElement,
    editBtn,
    deleteBtn
  }
}

function createTask() {
  let spanElement = document.createElement('span')
  spanElement.setAttribute("data-span", "")
  spanElement.addEventListener('click', (e) => {
    if (e.target.id.match("span")) {
      completeTask(spanElement)
    }

    if (e.target.id.match("delete")) {
      deleteTask(e)
    }

    if (e.target.id.match("edit")) {
      editTask(e)
    }
  })

  return spanElement
}

function completeTask(spanElement) {
  spanElement.classList.toggle("completed")
}

function deleteTask(e) {
  e.currentTarget.remove()
}

function editTask(e) {
  let spanIdNum = e.currentTarget.id.replace(/\D/g, "")
  let idPElement = document.getElementById("p" + spanIdNum)
  let previousTask = idPElement.textContent
  task.value = previousTask
  showChangeTask(spanIdNum)
  showContainerModal()
}

function giveId(element, name) {
  element.id = name + id
}

function verifyTaskValue() {
  if (task.value == "") {
    confirmBtn.classList.remove("ok")
    confirmChangeBtn.classList.remove("ok")
  } else {
    confirmBtn.classList.add("ok")
    confirmChangeBtn.classList.add("ok")
  }
}

function changeTask(element) {
  let taskValue = task.value
  element.textContent = taskValue
}

// Call functions

addBtn.addEventListener('click', () => {
  showContainerModal()
  showAddTask()
  verifyTaskValue()
})

cancelBtn.addEventListener('click', function () { hideContainerModal() })
containerText.addEventListener('click', function () { hideContainerModal() })

confirmBtn.addEventListener('click', () => {
  addTask()
  hideContainerModal()
})

task.addEventListener('change', function () { verifyTaskValue() })

task.addEventListener('keypress', function (e) {
  if (e.key == "Enter" && title.innerHTML == "Adicione a tarefa" && task.value !== "") {
    e.preventDefault()
    confirmBtn.click()
  } else if (e.key == "Enter" && title.innerHTML == "Mude a tarefa" & task.value !== "") {
    confirmChangeBtn.click()
  }
})

confirmChangeBtn.addEventListener('click', (e) => {
  let selectedTask = document.getElementById("p" + e.target.id)
  changeTask(selectedTask)
  hideContainerModal()
})

// Keyboard shortcuts

var keys = {}

body.addEventListener('keydown', (e) => {
  keys[e.key] = true

  if (keys['Control'] && e.key == 'a') {
    e.preventDefault()
    addBtn.click()
  }
})

body.addEventListener('keyup', (e) => {
  delete keys[e.key]
})