// Select all Add to Cart buttons
const addButtons = document.querySelectorAll('.add-btn');

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Mark already added items as "✓ Added" permanently
addButtons.forEach((btn) => {
  const product = btn.closest('.product');
  const id = product.dataset.id;
  const exists = cart.find((item) => item.id === id);

  if (exists) {
    btn.textContent = "✓ Added";
    btn.classList.add("added");
    btn.disabled = true; // disable button to prevent duplicate add
  }

  btn.addEventListener('click', (e) => {
    const productData = e.target.closest('.product');
    const item = {
      id: productData.dataset.id,
      name: productData.dataset.name,
      price: parseInt(productData.dataset.price),
      image: productData.dataset.image,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((p) => p.id === item.id);

    if (existingItem) {
      alert("Item already in cart!");
      return;
    }

    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Change button permanently
    btn.textContent = "✓ Added";
    btn.classList.add("added");
    btn.disabled = true; // keep button disabled once added
  });
});
