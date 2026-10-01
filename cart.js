let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// ADD TO CART
// =========================

export function addToCart(productId) {

    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }


    saveCart();

    updateCartCount();
}


// =========================
// REMOVE FROM CART
// =========================

export function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    updateCartCount();
}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// =========================
// CART COUNT
// =========================

export function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");


    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    cartCount.textContent = totalItems;
}


// Initial count
updateCartCount();