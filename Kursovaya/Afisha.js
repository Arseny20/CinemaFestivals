let hamb = document.querySelector(".hamb");
let navMenu = document.querySelector(".nav_menu");

hamb.addEventListener("click", mobileMenu);
function mobileMenu(){
  hamb.classList.toggle("active")
  navMenu.classList.toggle("active")
}

const navLink = document.querySelectorAll(".nav_link");

navLink.forEach(n => n.addEventListener("click",closeMenu));
function closeMenu(){
  hamb.classList.remove("active");
  navMenu.classList.remove("active");
}
/*-----------------------TRUNKATE------------------*/
function truncate(str, maxlength) {
  if (str.length > maxlength) {
    return str.slice(0, maxlength - 1) + "…";
  } else {
    return str;
  }
}

let originalTextElements = document.querySelectorAll('.overlay p');
originalTextElements.forEach(element => {
  let originalText = element.textContent;
  let truncatedText = truncate(originalText, 250);
  element.textContent = truncatedText;
});
/*-----------------------FAVORIETS LIST */

let films = [
  {
    name: '20 000 видов пчёл',
    tag: '20000видовпчёл',
    inlist: false
  },
  {
    name: 'Художественное училище 1994',
    tag: 'Artcollege1984',
    inlist: false
  },
  {
    name: 'Бай Та Чжи Гуан',
    tag: 'БайТаЧжиГуан',
    inlist: false
  },
  {
    name: 'До конца ночи',
    tag: 'Доконцаночи',
    inlist: false
  },
  {
    name: 'BlackBerry',
    tag: 'Ежевика',
    inlist: false
  },
  {
    name: 'Диско-мальчик',
    tag: 'Diskoboy',
    inlist: false
  },
  {
    name: 'БАСТАРДЕН',
    tag: 'bastarden-the-promised-land',
    inlist: false
  },
  {
    name: 'Собачник',
    tag: 'dogman',
    inlist: false
  },
  {
    name: 'Зверь',
    tag: 'la-bete-the-beast',
    inlist: false
  },
  {
    name: 'Закуски',
    tag: 'hors-saisons',
    inlist: false
  },
  {
    name: 'Энеа',
    tag: 'enea',
    inlist: false
  },
  {
    name: 'Маэстро',
    tag: 'maestro',
    inlist: false
  },
  {
    name: 'Айлин',
    tag: 'Айлен',
    inlist: false
  },
  {
    name: 'Бетонная утопия',
    tag: 'OIP',
    inlist: false
  },
  {
    name: '2001: Космическая одиссея',
    tag: '2001',
    inlist: false
  },
  {
    name: 'Ночи в стиле буги',
    tag: 'boogiepremiumarthaus',
    inlist: false
  },
  {
    name: 'Чудовище',
    tag: 'OIP (1)',
    inlist: false
  },
  {
    name: 'Проклятие',
    tag: 'TheCurse-poster',
    inlist: false
  },
  {
    name: 'Анатомия падения',
    tag: 'anatomie_d_une_chute-216337535-msmall',
    inlist: false
  },
  {
    name: 'Треугольник печали',
    tag: 'triangle_of_sadness-259032337-msmall',
    inlist: false
  },
  {
    name: 'Титан',
    tag: 'titane-395877726-msmall',
    inlist: false
  },
  {
    name: 'Паразиты',
    tag: 'gisaengchung-432616131-msmall',
    inlist: false
  },
  {
    name: 'Магазинные воришки',
    tag: '23shoplifterspix1-videoSixteenByNineJumbo1600-v2',
    inlist: false
  },
  {
    name: 'Квадрат',
    tag: 'maxresdefault',
    inlist: false
  }
  
];
const buttons = document.querySelectorAll('.add_star');

buttons.forEach(button => {
    const starIcon = button.querySelector('i');
    const key = `starColor_${button.dataset.id}`; // Уникальный ключ для каждой кнопки, можно использовать data-атрибут

    // Установка цвета из local storage при загрузке страницы
    if (localStorage.getItem(key) === 'yellow') {
        starIcon.classList.add('yellow');
    }

    button.addEventListener('click', function() {
        starIcon.classList.toggle('yellow');

        // Сохранение цвета в local storage при изменении
        if (starIcon.classList.contains('yellow')) {
            localStorage.setItem(key, 'yellow');
        } else {
            localStorage.removeItem(key);
        }
    });
});
let carts = document.querySelectorAll('.add_star');

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    favorietsNumbers(i);
  })
}

function favorietsNumbers(index) {
  let filmNumbers = localStorage.getItem('favorietsNumbers');
  filmNumbers = parseInt(filmNumbers);
  
  if (!filmNumbers) {
    filmNumbers = 0;
  }

  if (filmNumbers === index + 1) {
    localStorage.removeItem('favorietsNumbers');
  } else {
    localStorage.setItem('favorietsNumbers', index + 1);
  }
  
  setItems(films[index]);
}

function setItems(film) {
  let listItems = localStorage.getItem('productsInList');
  listItems = JSON.parse(listItems) || {};

  if (!listItems[film.tag] || listItems[film.tag].inlist === false) {
    film.inlist = true;
    listItems[film.tag] = film;
  } else {
    film.inlist = false;
    delete listItems[film.tag];
  }

  localStorage.setItem("productsInList", JSON.stringify(listItems));
  displayCart(); // После изменения списка вызываем функцию отображения списка
}

function displayCart() {
  let listItems = JSON.parse(localStorage.getItem('productsInList')) || {};
  let productContainer = document.querySelector(".film_div");

  if (listItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(listItems).map(item => {
      if (item.inlist) {
        productContainer.innerHTML += `
          <div class="films">
            <span><h3>${item.name}</h3></span>
            <img src="./Пикчи афиша/${item.tag}.jpg">
            <button class="add_fav" onclick="removeFromFavorites('${item.tag}')">
              <i class="fa-solid fa-rectangle-xmark"></i>
            </button>
          </div>
          `;
      }
    });
  }
}

function removeFromFavorites(tag) {
  let listItems = JSON.parse(localStorage.getItem('productsInList')) || {};
  
  if (listItems[tag]) {
    listItems[tag].inlist = false;
    delete listItems[tag];
    localStorage.setItem('productsInList', JSON.stringify(listItems));
    displayCart(); // Обновляем список после удаления элемента
  }
}

displayCart(); // Показываем изначальный список