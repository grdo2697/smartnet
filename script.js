let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalElement = document.getElementById('total');
    let total = 0;
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            ${item.name} - 
            الكمية: ${item.quantity} - 
            السعر: ${item.price * item.quantity} ريال
            <button onclick="removeItem('${item.name}')">إزالة</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    totalElement.textContent = total;
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة!');
        return;
    }
    
    if (confirm(`هل تريد إتمام الشراء بمبلغ ${document.getElementById('total').textContent} ريال؟`)) {
        alert('شكراً لشرائك! سيتم توصيل الطلب قريباً.');
        cart = [];
        updateCartDisplay();
    }
}
