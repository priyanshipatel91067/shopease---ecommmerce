const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        id: 3,
        name: "Men's Casual Shirt",
        category: "fashion",
        price: 899,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
    },
    {
        id: 4,
        name: "Women's Handbag",
        category: "fashion",
        price: 1299,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
    },
    {
        id: 5,
        name: "Sunglasses",
        category: "accessories",
        price: 699,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },
    {
        id: 6,
        name: "Leather Wallet",
        category: "accessories",
        price: 599,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 1799,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    },
    {
        id: 8,
        name: "Running Shoes",
        category: "fashion",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    }
];


const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".categories button");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Show products
function displayProducts(list) {

    productList.innerHTML = "";

    if (list.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <h3>${product.name}</h3>

            <p>Category: ${product.category}</p>

            <div class="product-price">
                ₹${product.price}
            </div>

            <button class="add-cart" data-id="${product.id}">
                Add to Cart
            </button>
        `;

        productList.appendChild(card);
    });


    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            const existing = cart.find(item => item.id === id);

            if (existing) {
                existing.quantity++;
            } else {
                cart.push({
                    id: id,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            button.textContent = "Added ✓";

            setTimeout(() => {
                button.textContent = "Add to Cart";
            }, 1000);
        });

    });
}


// Cart count
function updateCartCount() {

    const total = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = total;
}


// Search
searchInput.addEventListener("input", () => {

    const text = searchInput.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(text)
    );

    displayProducts(filtered);
});


// Category filter
categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        if (category === "all") {
            displayProducts(products);
        } else {

            const filtered = products.filter(
                product => product.category === category
            );

            displayProducts(filtered);
        }
    });

});


// Start
displayProducts(products);
updateCartCount();