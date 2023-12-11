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
function displayCart(){
  let listItems = localStorage.getItem('productsInList');
  listItems = JSON.parse(listItems)
  let productContainer = document.querySelector(".favorites-list");
  console.log(listItems);
  if(listItems && productContainer){
    productContainer.innerHTML = '';
    Object.values(listItems).map(item => {
      productContainer.innerHTML += `
      <div class="films">
        <img src="./Пикчи афиша/${item.tag}.jpg">
        <span>${item.name}</span>
      </div>
      `
    });

  }
}
displayCart()