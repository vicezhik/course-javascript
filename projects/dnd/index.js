/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

export function createDiv() {
  const div = document.createElement('div');
  div.style.backgroundColor =
    'rgb(' +
    Math.floor(Math.random() * 255) +
    ', ' +
    Math.floor(Math.random() * 255) +
    ', ' +
    Math.floor(Math.random() * 255) +
    ')';
  const height = Math.floor(Math.random() * 500);
  const width = Math.floor(Math.random() * 500);
  div.style.height = height + 'px';
  div.style.width = width + 'px';
  div.style.top =
    Math.floor(Math.random() * (document.documentElement.clientHeight - height)) + 'px';
  div.style.left =
    Math.floor(Math.random() * (document.documentElement.clientWidth - width)) + 'px';
  div.draggable = true;
  div.classList.add('draggable-div');

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
