
function _(element) {
    return document.querySelector(element);
}

// reload page or redirect user to main page.
_('.home-btn').addEventListener('click', () => {
    window.location.href = '/main-page';
})


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

// redirect to settings page.

_('.settings-btn').addEventListener('click', () => {
    window.location.href = '/settings';
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

            <p product-price=${product.price} class="product-price">
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
// this variable contains the total price of all the items put together.
let cartTotalPrice;

document.addEventListener('click', e => {
    if (e.target.closest('.add-btn')) {
        add_item(e);
    }
})

 // function to add an item to the cart/order.
function add_item(e) {

    console.log('click');
    const itemContainer = e.target.closest('.product-container');
    const itemId = itemContainer.querySelector('.product-name').getAttribute('product-id');
    const itemName = itemContainer.querySelector('.product-name').getAttribute('product-name');
    const itemType = itemContainer.querySelector('.product-type').getAttribute('product-type');
    const itemPrice = itemContainer.querySelector('.product-price').getAttribute('product-price');

    console.log(itemId);

    // checking if the id of the item clicked can already be found in the cart array belonging to one of the objects itemId value.
    let existingItem = cart.find(item => item.id === itemId);

    // if it does exists then we will just increase the quantity  and the total price for the object with the same id as the product clicked.
    if (existingItem) {
        existingItem.quantity += 1;
        //updating total price of an item depending on its actual price.
        existingItem.itemTotalPrice = Number(existingItem.itemTotalPrice) + Number(itemPrice);
    } else {
        // otherwise we will crete this new object in the cart array.
        cart.push({"id" : itemId, "itemName" : itemName, "itemType": itemType, "itemPrice": itemPrice, "quantity": 1, 'itemTotalPrice': itemPrice});
    }


    console.log(cart);
    // at the end we just update the items in the order.
    displayCartItems(cart);
}

function getItemsTotal(cart) {

    cart.forEach
}

function displayCartItems(items) {
    console.log('displaying cart items');
    const itemList = _('.order-list');

    
    // checking if the cart has any items.
    if (Array.isArray(items) && items.length > 0) {
        itemList.innerHTML = '';

        items.forEach(item => {
            const itemInList = document.createElement('li');
            itemInList.classList = 'item-in-list';

            itemInList.innerHTML = `
                <p>${item.itemName}</p>
                <p>X${item.quantity}</p>
            `;

            itemList.appendChild(itemInList);
            //updating total price or the order, the toFixed(n) method makes the value to only show 2 decimals to avoid numbers like 1.3000000.
            cartTotalPrice = cart.reduce((accumulator, item) => {
                return accumulator + (item.itemPrice * item.quantity)
            }, 0).toFixed(2);

            _('.order-total').textContent = `Total: $${cartTotalPrice}`;
            
        })
        // if it doesnt have any items a message will be displayed and the total price will be $0.00
    } else {
        // displaying messaging saying cart is empty.
        itemList.innerHTML = `
            <span style="display: flex; justify-content:center; flex-direction:column; align-items:center; height:100%;">
                <p>Order empty</p>
            </span>
        `;
        // displaying total price which in this case would be zero.
        _('.order-total').textContent = "Total: $0.00";
    }
    
}

displayCartItems(cart);


// submit order code.

let userOrders;

_('.submit-order-btn').addEventListener('click', () => {
    submitOrder(cart);
});

function submitOrder(cart) {
    
    const orderData = {
        'items' : cart,
        'orderTotal' : cartTotalPrice
    };

    fetch('/submit-order', {
        method: "POST",
        headers : {
            'Content-Type':'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(orderData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok:', res.status);
        } else {
            return res.json();
        }
    })
    .then(data => {
        console.log('response:', data);
        if (data.success) {
            
            console.log('order was submitted successfully');
            console.log('response object:', data.response);
            getMyOrders();
            // data.response.forEach(r => {
            //     console.log(r);
            // })
        } else {
            console.log('order was not submitted');
        }
    })
    .catch(error => {
        console.error(error);
    })

}

// clear order code

document.querySelector('.clear-order-btn').addEventListener('click', clearOrder);

function clearOrder() {
    cart = [];

    displayCartItems(cart);
}


// CODE TO GET ORDERS BELONGING TO LOGGED IN USER.



function getMyOrders() {
    fetch('/get-my-orders')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok:', res.status);
        } else {
            return res.json();
        }
    })
    .then(data => {
        if (data.success) {
            console.log('My orders:', data.myOrders);
            userOrders = data.myOrders;
            displayMyOrders(userOrders);
        }
    })
}

getMyOrders();

// function to display the items of an order, for orders that have been submitted already. 
function displayMyOrders(orders) {
    // grabbing element that will contain all info about an submitted order and also clearing it before displaying data.
    const myOrderList = _('.my-orders-list');
    myOrderList.innerHTML = '';

    // for each order we wanna create a new element with the class 'my-orders-item-container'.
    orders.forEach(order => {
        console.log("My order data:", order.products);
        const itemContainer = document.createElement('li');
        itemContainer.classList = 'my-orders-item-container';

        // header of every order.
        itemContainer.innerHTML = `
        <h1><a href="/view-order/${order.id}">View</a></h1>
        <div style="display:flex; justify-content: space-between;">
            <h1 class="order-id" style="margin-bottom:1rem;" order-id=${order.id}>Order ID: ${order.id}</h1>
            <h1>Status: ${order.status}</h1>
        </div>
        `;

        // order.products is an array of objects, so for each object will display its data in a new created element that goes inside 'my-order-list'.
        order.products.forEach(row => {
            const item = document.createElement('p');
            item.classList = 'item';

            item.innerHTML = `
                <h1>- ${row.itemName}</h1>
            `;

            itemContainer.appendChild(item);
        });

        // adding the 'order' confirmation button.
        const orderBtnWrap = document.createElement('span');
        orderBtnWrap.classList = 'order-btn-wrap';

        orderBtnWrap.innerHTML = `

            ${order.status === "pending" ? "<button class='order-btn change-status-btn'>Order Now</button>" : "<button class='cancel-order-btn change-status-btn'>Cancel</button>"}
            <button class="delete-order-btn">Delete</button>
        `;

        itemContainer.appendChild(orderBtnWrap);
        

        myOrderList.appendChild(itemContainer);

        
        
    })
}

// CODE TO CHANGE ORDER STATUS.

_('.my-orders-list').addEventListener('click', e => {
    if (e.target.matches('.change-status-btn')) {
        console.log("order now!");
        changeOrderStatus(e);
    }
});

// function to change status.
function changeOrderStatus(e) {
    const orderElement = e.target.closest('.my-orders-item-container');
    const ordeId = orderElement.querySelector('.order-id').getAttribute('order-id');

    console.log(ordeId);

    const dataObj = {
        'orderId' : ordeId
    };
    console.log('object:', dataObj);

    fetch('/change-order-status', {
        method: "POST",
        headers : {
            "Content-Type":"application/json",
            "X-CSRF-TOKEN" : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body : JSON.stringify(dataObj)
    })
    .then(res=> {
        if (!res.ok) {
            throw new Error("Network connection was not ok:", res.status);
        } else {
            return res.json();
        }
    })
    .then(data => {
        if (data.success) {
            console.log('Order response ID:', data.id);
            getMyOrders();
        }
    })
}

// CODE TO DELETE ORDER.

_('.my-orders-list').addEventListener('click', e => {
    if (e.target.matches('.delete-order-btn')) {
        deleteOrder(e);
    }
})

function deleteOrder(e) {
    const orderElement = e.target.closest('.my-orders-item-container');
    const orderId = orderElement.querySelector('.order-id').getAttribute('order-id');
    
    console.log('order to delete:', orderId);

    const dataObj = {
        'orderId' : orderId
    }
    console.log(dataObj);

    fetch('/delete-order', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(dataObj)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok:', res.status);
        } else {
            return res.json();
        }
    })
    .then(data => {
        if (data.success) {
            console.log('response:', data.id);
            getMyOrders();
        }
    })
}
