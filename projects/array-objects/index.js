/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}
//console.log(forEach([1, 2, 3], (el) => console.log(el*2)));

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
function map(array, fn) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(fn(array[i], i, array));
  }
  return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */

function reduce(array, fn, initial) {
  let result = initial ? initial : array[0];
  const firstIndex = initial ? 0 : 1;

  for (let i = firstIndex; i < array.length; i++) {
    result = fn(result, array[i], i, array);
  }
  return result;
}
//console.log(reduce([1, 2, 3], (all, current) => all + current,3));
//console.log(reduce2([1, 2, 3], (all, current) => all + current,3));
/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const arrayObj = [];
  for (const item in obj) {
    arrayObj.push(item.toUpperCase());
  }
  return arrayObj;
}
//console.log(upperProps({ name: 'Сергей', lastName: 'Петров' }));
/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {
  const newObj = new Proxy(obj, {
    set(target, prop, val) {
      if (typeof val == 'number' || !isNaN(Number(val))) {
        target[prop] = val * val;
      } else {
        target[prop] = val;
      }
      return true;
    },
  });
  return newObj;
}
//const obj = createProxy({});
//obj.foo = 'zz';
//console.log(obj.foo); // 4
export { forEach, map, reduce, upperProps, createProxy };
