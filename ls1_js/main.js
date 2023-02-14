// localStorage.setItem("goods", JSON.stringify([]));
// let arr = JSON.parse(localStorage.getItem("goods"));
// console.log(arr)

// localStorage.removeItem("goods");

// localStorage.clear();

// console.log(window.localStorage);

// console.log(this.localStorage);
// console.log(localStorage);

// console.log(typeof localStorage);

// localStorage.setItem("breakfast", "eggs");
// localStorage.setItem("lunch", "soup");

// console.log(localStorage.getItem("breakfast"));
// console.log(localStorage.getItem("dinner")); // получим null
// localStorage.clear();

// ! =========Todo list ===========================
// ? достаем элементы из html
let btn = document.querySelector(".btn");

let inp = document.querySelector(".task-input");
let list = document.querySelector(".task-list");

// ? событие на кнопку при клике
btn.addEventListener("click", () => {
  // ? проверка на заполненность инпута
  if (!inp.value.trim()) {
    alert("заполните поле ");
    return;
  }
  // ? помещаем значение из инпута в объект под ключщм task
  let obj = { task: inp.value };
  //? вызов функции доболения в LOcalStorage
  setItemToStorage(obj);
  inp.value = ""; //? очищаем инпут
});

function setItemToStorage(task) {
  // ? проверка на то , что есть ли в localStarage что нибудь под ключщм task-data
  if (!localStorage.getItem("task-data")) {
    //? если нет, то добавляем по данным ключом пустой массив
    localStorage.setItem("task-data", "[]");
  }
  //? стягиваем из localStorage данные и приводим их к js формату
  let data = JSON.parse(localStorage.getItem("task-data"));

  data.push(task); //? добавляем новый объект в массив

  // ? обновленный массив преобразовываем в JSON формат и отправляем в localStorage
  localStorage.setItem("task-data", JSON.stringify(data));
  createElement();
}

createElement();
// ? отображение данных
function createElement() {
  if (!localStorage.getItem("task-data")) {
    //? если нет, то добавляем по данным ключом пустой массив
    localStorage.setItem("task-data", "[]");
  }
  // ? стягиваем данные из LOcalStorage и преобразовывем в js формат
  let newData = JSON.parse(localStorage.getItem("task-data"));

  list.innerHTML = ""; //? очищаем содержимое списка для того ,чтобы не было дублирование
  newData.forEach((item, index) => {
    // ? перебираеи массив данных и для каждого эл-тф этого массива , создаем тег li c двумя кнопками
    let li = document.createElement("li");
    let btnDelate = document.createElement("button");
    let btnEdit = document.createElement("button");
    li.innerText = item.task;
    btnDelate.innerText = "Delete";
    btnEdit.innerText = "Edit";

    li.append(btnDelate);
    li.append(btnEdit);

    // ? добавили слушатели событий на кнопки delate , edit
    btnDelate.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
    list.append(li); //? добавляем тег ul, новый созданный тег li
  });
}
// ? функция для удаление task
function deleteElement(index) {
  // ? получаем данные из хранилища (массив данных)
  let data = JSON.parse(localStorage.getItem("task-data"));

  data.splice(index, 1); //? удаляем 1 элемент по индексу
  localStorage.setItem("task-data", JSON.stringify(data)); //? отправляем обновленный массив в хранилища
  createElement(); //? отображаем измененный массив из хранилища
}

// ? edit
// ? получаем элементы модального окна
let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

// ? функция редоктирования
function editElement(index) {
  // ? отображаем модальное окно
  console.log(mainModal);
  mainModal.style.display = "block";
  //   ? получаем данные из хранилища
  let data = JSON.parse(localStorage.getItem("task-data"));

  //   ? заполняем input
  inpEdit.value = data[index].task;

  //   ? создаем аттрибут id , для последуюшего сохранения
  inpEdit.setAttribute("id", index);
}

// ? слушатели событий для закрытия модального окна
btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});

// ? слушатель для сохранения отредактируемого элемента, который отридактирован
btnSave.addEventListener("click", () => {
  // ? получаем данные из хранилища
  let data = JSON.parse(localStorage.getItem("task-data"));
  //   ? получаем индекс того элемента , который редактируем
  let index = inpEdit.id;

  //   ? проверка на заполненость inputa
  if (!inpEdit.value.trim()) {
    alert("заполните поля");
    return;
  }

  //   ? формируем новый , уже отредактированный объект

  let editedTask = {
    task: inpEdit.value,
  };

  //   ? заменяем старый объект на новый(который отредактированали)
  console.log(editedTask);

  data.splice(index, 1, editedTask);
  //   ? отправляем обновленный массив в хранилища
  localStorage.setItem("task-data", JSON.stringify(data));

  //   ? закрываем модальное окно
  mainModal.style.display = "none";

  //   ? отображаем обновленные данные
  createElement();
});
