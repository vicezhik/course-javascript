/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function getTableData() {
  listTable.innerHTML = '';
  const input = filterNameInput.value;
  const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
  let output = '';
  for (const key in cookies) {
    if (key.indexOf(input) !== -1 || cookies[key].indexOf(input) !== -1 || input === '')
      output += `<tr><td class="name_cookie">${key}</td><td>${cookies[key]}</td><td><button class="delete">Удалить</button></td></tr>`;
  }
  listTable.innerHTML = output;
}
getTableData();

filterNameInput.addEventListener('input', function () {
  getTableData();
});

addButton.addEventListener('click', () => {
  const expires = new Date(Date.now() + 86400 * 1000).toUTCString();
  document.cookie = `${addNameInput.value}=${addValueInput.value};expires=${expires};path=/`;
  // addNameInput.value = '';
  //addValueInput.value = '';
  getTableData();
});

listTable.addEventListener('click', (e) => {
  if (e.target.nodeName === 'BUTTON' && e.target.className === 'delete') {
    const nameCookie = e.target.parentElement.parentElement.querySelector('.name_cookie')
      .innerText;
    document.cookie = `${nameCookie}=deleted;max-age=0;path=/`;
    getTableData();
  }
});
