const body = document.querySelector("body")

const taskList = document.querySelector('[data-tasks]')

const addBtn = document.querySelector('[data-add]')

const containerText = document.querySelector('[data-textContainer]')
var title = document.querySelector('[data-title]')
let task = document.querySelector('[data-newTask]')
const modal = document.querySelector('[data-modal]')
const confirmBtn = document.querySelector('[data-confirm]')
const confirmChangeBtn = document.querySelector('[data-confirmChange]')
const cancelBtn = document.querySelector('[data-cancel]')

var template = document.querySelector('[data-task]')

function showContainerModal() {
  containerText.classList.add("show")
  modal.classList.add("show")
  task.focus()
}

function showAddTask() {
  title.innerHTML = "Adicione a tarefa"
  document.querySelector('[data-newTask]').value = ""
  confirmBtn.classList.add("show")
  confirmChangeBtn.classList.remove("show")
}

function showChangeTask() {
  title.innerHTML = "Mude a tarefa"
  confirmBtn.classList.remove("show")
  confirmChangeBtn.classList.add("show")
  let taskValue = task.value
  task.setSelectionRange(0, taskValue.length)
}

function hideContainerModal() {
  containerText.classList.remove("show")
  modal.classList.remove("show")
  document.querySelector('[data-newTask]').value = ""
}

function addTask() {
  let task = document.querySelector('[data-newTask]').value
  let p = template.content.querySelector("p")
  p.textContent = task
  let clone = template.content.cloneNode(true)

  let clones = []
  clones.push(clone)
  
  let listaClone = clones.map(clone => {
    let spanEle = document.createElement('span')
    spanEle.setAttribute("data-span", "")
    spanEle.addEventListener('click', (e) => {
      spanEle.classList.toggle("completed")
      e.stopImmediatePropagation()
    })
    spanEle.appendChild(clone)
    return spanEle
  })
  taskList.prepend(...listaClone)
  
  giveIdSpan()
  giveIdEdit()
  giveIdDelete()
  giveIdP()
}

function giveIdSpan() {
  let idSpanNum = 1
  let idSpanNam = "span"
  let spans = document.querySelectorAll('[data-span]')
    spans.forEach((span) => {
      let idSpan = idSpanNam + idSpanNum
      span.id = idSpan
      idSpanNum++
    })
}

function giveIdEdit() {
  let edits = document.querySelectorAll('[data-edit]')
  let idEditNum = 0
  let idEditNam = "edit"
  edits.forEach((edit) => {
    idEditNum = idEditNum + 1
    let idEdit = idEditNam + idEditNum
    getIndexEdit(edit, idEdit)
  })
}

function giveIdDelete() {
  let deletes = document.querySelectorAll('[data-delete]')
  let idDeleteNum = 0
  let idDeleteNam = "delete"
  deletes.forEach((deleted) => {
    idDeleteNum = idDeleteNum + 1
    let idDelete = idDeleteNam + idDeleteNum
    getIndexDelete(deleted, idDelete)
  })
}

function giveIdP() {
  let pss = document.querySelectorAll('[data-remainingTask]')
  let idPNum = 0
  let idPNam = "p"
  pss.forEach((ps) => {
    idPNum = idPNum + 1
    let idP = idPNam + idPNum
    getIndexP(ps, idP)
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

var idP

function getIndexEdit(edit, id) {
  edit.id = id
  edit.addEventListener('click', (e) => {
    let idE = e.target.id
    let idEN = idE.replace(/\D/g, "")
    idP = document.getElementById("p" + idEN)
    let previousTask = idP.textContent
    document.querySelector('[data-newTask]').value = previousTask
    showChangeTask()
    showContainerModal()
    e.stopImmediatePropagation()
  })
}

function getIndexDelete(deleted, id) {
  deleted.id = id
  deleted.addEventListener('click', (e) => {
    let idD = e.target.id
    let idDN = idD.replace(/\D/g, "")
    let idCN = idDN
    let idC = document.getElementById("span" + idCN)
    idC.remove()
    e.stopImmediatePropagation()
  })
}

function getIndexP(p, id) {
  p.id = id
}

function changeTask(id) {
  let taskValue = document.querySelector('[data-newTask]').value
  id.textContent = taskValue
}

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

confirmChangeBtn.addEventListener('click', () => {
  changeTask(idP)
  hideContainerModal()
})

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