/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return new Promise((resolve, reject) => {
    const requestURL =
      'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    const request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('GET', requestURL, true);
    request.addEventListener('load', (xhr) => {
      if (xhr.target.status >= 200 && xhr.target.status < 400) {
        loadingBlock.hidden = true;
        filterBlock.hidden = false;
        resolve(
          xhr.target.response.sort(function (town1, town2) {
            if (town1.name < town2.name) return -1;
            if (town1.name > town2.name) return 1;
            return 0;
          })
        );
      } else {
        reject();
      }
    });
    request.addEventListener(
      'error',
      () => {
        reject();
      },
      false
    );
    request.send();
  });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

retryButton.addEventListener('click', () => {
  loadingBlock.hidden = false;
  loadingFailedBlock.hidden = true;
  filterBlock.hidden = true;
  listTowns = [];
  loadTowns().then(
    (towns) => {
      loadingBlock.hidden = true;
      filterBlock.hidden = false;
      listTowns = towns;
    },
    () => {
      loadingBlock.hidden = true;
      loadingFailedBlock.hidden = false;
    }
  );
});

filterInput.addEventListener('input', function (e) {
  filterResult.innerHTML = '';
  const value = e.target.value;
  const fragment = document.createDocumentFragment();
  if (listTowns.length > 0 && value !== '') {
    listTowns.forEach((item) => {
      if (isMatching(item.name, value)) {
        const div = document.createElement('div');
        div.textContent = item.name;
        fragment.appendChild(div);
      }
    });
  }
  filterResult.appendChild(fragment);
});

loadingFailedBlock.hidden = true;
filterBlock.hidden = true;
let listTowns = [];
loadTowns().then(
  (towns) => {
    loadingBlock.hidden = true;
    filterBlock.hidden = false;
    listTowns = towns;
  },
  () => {
    loadingBlock.hidden = true;
    loadingFailedBlock.hidden = false;
  }
);

export { loadTowns, isMatching };
