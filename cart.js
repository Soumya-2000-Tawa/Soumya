const cartContainer = document.getElementById('cartContainer');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
  cartContainer.innerHTML = '';

  if (!cart || cart.length === 0) {
    cartContainer.innerHTML = '<p class="empty">Your cart is empty.</p>';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    // ✅ Ensure data safety
    const name = item.name || 'Unnamed Item';
    const price = parseFloat(item.price) || 0; // fixes null/NaN price
    const quantity = parseInt(item.quantity) || 1;

    total += price * quantity;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <div class="cart-details">
        <h3>${name}</h3>
        <p>Price: ₹${price.toFixed(2)}</p>
        <p>Qty: ${quantity}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;

    cartContainer.appendChild(div);
  });

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('total');
  totalDiv.textContent = `Total: ₹${total.toFixed(2)}`;
  cartContainer.appendChild(totalDiv);
}

function removeItem(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
  }
}

displayCart();
