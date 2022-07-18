const body = document.querySelector("body")

const taskList = document.querySelector('[data-tasks]')

const addBtn = document.querySelector('[data-add]')

const containerText = document.querySelector('[data-text-container]')
var title = document.querySelector('[data-title]')
let task = document.querySelector('[data-new-task]')
const modal = document.querySelector('[data-modal]')
const confirmBtn = document.querySelector('[data-confirm]')
const confirmChangeBtn = document.querySelector('[data-confirm-change]')
const cancelBtn = document.querySelector('[data-cancel]')

var template = document.querySelector('[data-task]')

function showContainerModal() {
  containerText.classList.add("show")
  modal.classList.add("show")
  task.focus()
}

function showAddTask() {
  title.innerHTML = "Adicione a tarefa"
  document.querySelector('[data-new-task]').value = ""
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
  document.querySelector('[data-new-task]').value = ""
}

function addTask() {
  let task = document.querySelector('[data-new-task]').value
  let p = template.content.querySelector("p")
  p.textContent = task
  let clone = template.content.cloneNode(true)

  let clones = []
  clones.push(clone)

  let spanElement = createTask()

  let listaClone = clones.map(clone => {

    spanElement.appendChild(clone)
    return spanElement
  })
  taskList.prepend(...listaClone)

  giveId('[data-span]', "span")
  giveId('[data-edit]', "edit")
  giveId('[data-delete]', "delete")
  giveId('[data-remaining-task]', "p")
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
  document.querySelector('[data-new-task]').value = previousTask
  showChangeTask(spanIdNum)
  showContainerModal()
}

function giveId(dataAttribute, name) {
  let elements = document.querySelectorAll(dataAttribute)
  let idElementNum = 1
  let idElementName = name

  elements.forEach((element) => {
    let idElement = idElementName + idElementNum
    element.id = idElement
    idElementNum++
  })
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
  let taskValue = document.querySelector('[data-new-task]').value
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