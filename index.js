var itensDB = [];

const addInput = document.querySelector("input.add--input");
const ul = document.querySelector("ul.items--container");

// start of add todos function
const addForm = document.getElementById("add--form");
addForm.addEventListener("submit", addToDo);

function addToDo(event) {
    if (addInput.value != "") {
        addToDB();
    }

    event.preventDefault();
};

function addToDB() {
    if (itensDB.length >= 20) {
      alert("Limite máximo de 20 itens atingido!");
      return;
    }
  
    itensDB.push({ item: addInput.value, status: "" });
    updateDB();
  }
  
// end of add todos function

// start of update db
function updateDB() {
  localStorage.setItem("todolist", JSON.stringify(itensDB));
  console.log('db itens -> ', itensDB)
  loadItems();
}
// end of update db

// start of loaditems
function loadItems() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem("todolist")) ?? [];
  itensDB.forEach((item, i) => {
    displayItems(item.item, item.status, i);
  });
}
// start of loaditems

// start of display items
function displayItems(text, status, i) {
  const li = document.createElement("li");
    li.innerHTML = `
        <div class="todo--item">
            <div class="custom--checkbox">
                <input id="checkbox${i}" class="todo--checkbox" type="checkbox"" ${status} data-i=${i} onchange="completeItem(this, ${i});" ></input>
                <label for="checkbox${i}"></label>
            </div>
            <span data-si=${i}>${text}</span>
        </div>
    `;
  ul.appendChild(li);

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add("item--complete");
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove("item--complete");
  }

  addInput.value = "";
}
// end of displayItemss

// start of complete item
function completeItem(chk, i) {
  if (chk.checked) {
    itensDB[i].status = "checked";
  } else {
    itensDB[i].status = "";
  }

  updateDB();
}
// end of complete item

// start of remove item
// --> to implement
function removeItem(i) {
  itensDB.splice(i, 1);
  updateDB();
}
// end of remove item

// load items to display it on screen
loadItems();
