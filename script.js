// Dummy products data with seller details (using online image URLs)
const products = [
    { name: "Used Calculus Book", price: 500, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=250", category: "books", sellerName: "Alice Johnson", sellerEmail: "alice@example.com", sellerPhone: "+91-9876543210" },
    { name: "Gaming Laptop", price: 25000, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=250", category: "electronics", sellerName: "Bob Smith", sellerEmail: "bob@example.com", sellerPhone: "+91-9876543211" },
    { name: "Study Chair", price: 1500, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=250", category: "furniture", sellerName: "Charlie Brown", sellerEmail: "charlie@example.com", sellerPhone: "+91-9876543212" },
    { name: "Physics Textbook", price: 300, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250", category: "books", sellerName: "Diana Prince", sellerEmail: "diana@example.com", sellerPhone: "+91-9876543213" },
    { name: "Wireless Mouse", price: 800, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=250", category: "electronics", sellerName: "Eve Adams", sellerEmail: "eve@example.com", sellerPhone: "+91-9876543214" },
    { name: "Dorm Desk", price: 2000, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=250", category: "furniture", sellerName: "Frank Miller", sellerEmail: "frank@example.com", sellerPhone: "+91-9876543215" },
    { name: "Scientific Calculator", price: 500, image: "https://images-cdn.ubuy.co.in/6687886fa55aea100b201f56-casio-fx-82cw-scientific-calculator-with.jpg", category: "books", sellerName: "George Lucas", sellerEmail: "george@example.com", sellerPhone: "+91-9876543216" },
    { name: "Bluetooth Headphones", price: 1200, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=250", category: "electronics", sellerName: "Helen Troy", sellerEmail: "helen@example.com", sellerPhone: "+91-9876543217" }
];

// DOM elements
const productGrid = document.getElementById('product-grid');
const searchBar = document.getElementById('search-bar');
const categoryFilter = document.getElementById('category-filter');
const sellBtn = document.getElementById('sell-btn');
const modal = document.getElementById('sell-modal');
const closeModal = document.querySelector('.close');
const sellForm = document.getElementById('sell-form');

// Function to render products
function renderProducts(filteredProducts) {
    productGrid.innerHTML = '';
    filteredProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <a href="product-detail.html?id=${index}" target="_blank">
                <img src="${product.image}" alt="${product.name}">
            </a>
            <span class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="buy-btn">Buy Now</button>
        `;
        productGrid.appendChild(card);
    });
}

// Initial render
renderProducts(products);

// Search and filter functionality
function filterProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    renderProducts(filtered);
}

searchBar.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

// Modal functionality
sellBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form submission (demo only)
sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const image = document.getElementById('item-image').value;
    alert(`Item "${name}" listed for ₹${price} with image: ${image}`);
    modal.style.display = 'none';
    sellForm.reset();
});

// Scroll animations (fade-in on scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});