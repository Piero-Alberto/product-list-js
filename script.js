document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("dessert-container");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");

  const cart = {};

  function renderCart() {
    cartItems.innerHTML = "";
    let totalCount = 0;
    let totalPrice = 0;

    for(const key in cart) {
      const item = cart[key];
      const li = document.createElement("li");
      const total = (item.price * item.quantity).toFixed(2);

      li.innerHTML = `
      🍰 ${item.name} (x${item.quantity}) - $${total}
      <button class="remove" data-name="${item.name}"> 🗑️ Eliminar</button>
    `;
    cartItems.appendChild(li);
    totalCount += item.quantity;
    totalPrice += item.price * item.quantity;
  }
  if(totalPrice > 0){
    const totalLi = document.createElement("li");
    totalLi.style.fontWeight = "bold";
    totalLi.textContent = `Order Total: $${totalPrice.toFixed(2)}`;
    cartItems.appendChild(totalLi);
  }

  cartCount.textContent = totalCount;

  document.querySelectorAll(".remove").forEach(button =>{
    button.addEventListener("click", ()=>{
      const name = button.dataset.name;
      delete cart[name];
      renderCart();
    })
  })

  }

  fetch("data.json")
    .then(response => response.json())
    .then(desserts => {
      desserts.forEach(dessert => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${dessert.image.desktop}" alt="${dessert.category}">
          <h3>${dessert.category}</h3>
          <p>${dessert.name}</p>
          <p class="price">$${dessert.price.toFixed(2)}</p>
          <button class="add-to-cart">Add to Cart</button>
        `;
        container.appendChild(card);

        card.querySelector(".add-to-cart").addEventListener("click", () => {
          if (cart[dessert.name]) {
            cart[dessert.name].quantity += 1;
          } else {
            cart[dessert.name] = {
              name: dessert.name,
              quantity: 1,
              price: dessert.price
            };
          }
          renderCart();
        });
      });
    })
    .catch(err => {
      container.innerHTML = `<p>Error cargando postres 😢</p>`;
      console.error(err);
    });
});
