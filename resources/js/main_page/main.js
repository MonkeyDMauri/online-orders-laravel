
function _(element) {
    return document.querySelector(element);
}


// redirect to terms page
_('.terms-link').addEventListener('click', () => {
    fetch('main-page/terms')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok:', res.status);
        } else {
            return res.json();
        }
    })
    .then(data => {
        if (data.success) {
            console.log('terms success');
            window.location.href = '/terms';
        }
    })
})

// #LOGOUT

// triggering function to show or hide popup code
const logoutBtn = _('.logout-btn');
logoutBtn.addEventListener('click', toggleLogoutPopup);

function toggleLogoutPopup() {
    console.log('logout button clicked');
    const logoutPopup = _('.logout-popup-wrapper');
    logoutPopup.classList.toggle('active');
}

_('.logout-no').addEventListener('click', toggleLogoutPopup);

// if user clicks yes then a request will be sent to log use out.

_('.logout-yes').addEventListener('click', logout);

function logout() {
    fetch('/logout',  {
        method:'POST',
        headers: {
            "Content-Type":'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network connection was not ok:', res.status);
        } else {
            return res.json();
        }
    })
    .then(data => {
        if (data.success) {
            window.location.href = '/';
        }
    })
}

// CODE TO GET AND SHOW ALL PRODUCTS

let allProducts = [];

function getProducts() {
    fetch('/get-products')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response wasnt ok:', res.status)
        } else{ 
            return res.json();
        }
    })
    .then(data => {
        if (data.success) {
            allProducts = data.allProducts
            console.log(allProducts);
            displayProducts(allProducts);
        } else { 
            console.log('something went wrong and success is not true');
        }
    })
    .catch(err => {
        console.error(err)
    })
}

getProducts();

// function to display all products.
function displayProducts(allProducts) {

    // grabbing and clearing element container for product list.
    const productListContainer = _('.products-wrap');
    productListContainer.innerHTML = "";

    allProducts.forEach(product => {
        console.log('product name:', product.name);
        const productContainer = document.createElement('div');
        productContainer.classList = 'product-container';

        productContainer.innerHTML = `
            <h1 class="product-name" product-id="${product.id}" product-name="${product.name}">
                ${product.name}
            </h1>
            
            <p product-type="${product.type}" class="product-type">
                Type: ${product.type}
            </p>

            <p product-price="${product.price}" class="product-price">
                Price: $${product.price}
            </p>

            <div style="display:flex; justify-content:center; margin-top:.5rem;">
                <button class="add-btn">Add to order</button>
            </div>
        `;

        productListContainer.appendChild(productContainer);
    })

}


// CODE FOR ORDER DETAILS.

// this variable will store all the items added to the cart
let cart = [];

document.addEventListener('click', e => {
    if (e.target.closest('.add-btn')) {
        add_item(e);
    }
})

function add_item(e) {

    console.log('click');
    const itemContainer = e.target.closest('.product-container');
    const itemId = itemContainer.querySelector('.product-name').getAttribute('product-id');
    const itemName = itemContainer.querySelector('.product-name').getAttribute('product-name');
    const itemType = itemContainer.querySelector('.product-type').getAttribute('product-type');
    const itemPrice = itemContainer.querySelector('.product-price').getAttribute('product-price');

    console.log(itemId);

    let existingItem = cart.find(item => item.item_Id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({"item_Id" : itemId, "itemName" : itemName, "itemType": itemType, "itemPrice": itemPrice, "quantity": 1});
    }

    console.log(cart);
    displayCartItems(cart);
}

function displayCartItems(items) {
    const itemList = _('.order-list');

    if (items) {
        itemList.innerHTML = '';
    }
    
}
