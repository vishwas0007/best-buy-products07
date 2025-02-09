document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadProducts();
    displayProducts();
});

// Admin Login
document.getElementById("admin-login-button").addEventListener("click", () => {
    document.getElementById("admin-login-popup").classList.remove("hidden");
});

document.getElementById("admin-submit").addEventListener("click", () => {
    let password = document.getElementById("admin-password").value;
    if (password === "Vishwas07") {
        document.getElementById("admin-login-popup").classList.add("hidden");
        document.getElementById("admin-section").classList.remove("hidden");
        document.getElementById("front-page").classList.add("hidden");
    } else {
        document.getElementById("admin-error").classList.remove("hidden");
    }
});

// Go Back Button
document.getElementById("go-back-btn").addEventListener("click", () => {
    document.getElementById("admin-section").classList.add("hidden");
    document.getElementById("front-page").classList.remove("hidden");
});

// Categories
let categories = JSON.parse(localStorage.getItem("categories")) || [];

document.getElementById("add-category-btn").addEventListener("click", () => {
    let newCategory = document.getElementById("new-category").value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        localStorage.setItem("categories", JSON.stringify(categories));
        loadCategories();
    }
});

function loadCategories() {
    let categorySelect = document.getElementById("product-category");
    categorySelect.innerHTML = "<option value=''>Select Category</option>";

    categories.forEach((cat) => {
        categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}

// Products
let products = JSON.parse(localStorage.getItem("products")) || [];

document.getElementById("add-product-btn").addEventListener("click", () => {
    let name = document.getElementById("product-name").value.trim();
    let price = document.getElementById("product-price").value;
    let image = document.getElementById("product-image").value.trim();
    let category = document.getElementById("product-category").value;
    let buyLink = document.getElementById("product-buy-link").value.trim();

    if (name && price && image && category && buyLink) {
        products.push({ name, price, image, category, buyLink });
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
        displayProducts();
        clearProductForm();
    }
});

function loadProducts() {
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((p, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${p.name} - ₹${p.price} (${p.category})
            <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(li);
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
    displayProducts();
}

// Edit & Update Product
function editProduct(index) {
    let product = products[index];
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-image").value = product.image;
    document.getElementById("product-buy-link").value = product.buyLink;
    document.getElementById("product-category").value = product.category;
    document.getElementById("edit-product-index").value = index;

    document.getElementById("add-product-btn").classList.add("hidden");
    document.getElementById("update-product-btn").classList.remove("hidden");
}

document.getElementById("update-product-btn").addEventListener("click", () => {
    let index = document.getElementById("edit-product-index").value;
    
    products[index] = {
        name: document.getElementById("product-name").value.trim(),
        price: document.getElementById("product-price").value,
        image: document.getElementById("product-image").value.trim(),
        buyLink: document.getElementById("product-buy-link").value.trim(),
        category: document.getElementById("product-category").value
    };

    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
    displayProducts();
    clearProductForm();

    document.getElementById("add-product-btn").classList.remove("hidden");
    document.getElementById("update-product-btn").classList.add("hidden");
});

// Display products on front page
function displayProducts() {
    let productDisplay = document.getElementById("product-display");
    productDisplay.innerHTML = "";

    products.forEach((p) => {
        let div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
            <p><strong>${p.category}</strong></p>
            <a href="${p.buyLink}" target="_blank"><button class="buy-btn">Buy Now</button></a>
        `;
        productDisplay.appendChild(div);
    });
}

// Clear form after adding or updating product
function clearProductForm() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-image").value = "";
    document.getElementById("product-buy-link").value = "";
    document.getElementById("product-category").value = "";
    document.getElementById("edit-product-index").value = "";
}