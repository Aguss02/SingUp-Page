const btn = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");
let carrito = [];

btn.forEach((button) => {
  button.addEventListener("click", addItemToCarrito);
});

function addItemToCarrito(e) {
  const button = e.target;
  const item = button.closest(".card");
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  const newItem = {
    title: itemTitle,
    price: itemPrice,
    img: itemImg,
    amount: 1,
  };

  addItem(newItem);
}

function addItem(newItem) {
  const alert = document.querySelector(".alert");
  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");

  const inputElement = tbody.getElementsByClassName("input_element");
  // Se repiten
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].amount++;
      const inputValue = inputElement[i];
      inputValue.value++;
      carritoTotal();
      return null;
    }
  }

  carrito.push(newItem);
  renderCarrito();
}

function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("item-carrito");
    const Content = `
    <th scope="row">1</th>
    <td class="table_products">
      <img src=${item.img}  alt="">
      <h6 class="title">${item.title}</h6>
    </td>
    <td class="table_price"><p>${item.price}</p></td>
    <td class="table_amount">
      <input type="number" min="1" value=${item.amount} class="input_element">
      <button class="delete btn btn-danger">x</button>
    </td>`;
    tr.innerHTML = Content;
    tbody.append(tr);
    tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
    tr.querySelector(".input_element").addEventListener("change", addAmount);
  });
  carritoTotal();
}

function addAmount(e) {
  const addInput = e.target;
  const tr = addInput.closest(".item-carrito");
  const title = tr.querySelector(".title").textContent;
  carrito.forEach((item) => {
    if (title === item.title.trim()) {
      addInput.value < 1 ? (addInput.value = 1) : addInput.value;
      item.amount = addInput.value;
      carritoTotal();
    }
  });
}

function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".item-carrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (title.trim() === carrito[i].title.trim()) {
      carrito.splice(i, 1);
    }
  }
  const alert = document.querySelector(".remove");
  setTimeout(function () {
    alert.classList.add("remove");
  }, 2000);
  alert.classList.remove("remove");
  tr.remove();
  carritoTotal();
}

function carritoTotal() {
  let total = 0;
  const itemCardTotal = document.querySelector(".itemCardTotal");
  carrito.forEach((item) => {
    const price = Number(item.price.replace("$", ""));
    total = total + price * item.amount;
  });
  itemCardTotal.innerText = `Total: $${total}`;
  addLocalStorage();
}

function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
};
