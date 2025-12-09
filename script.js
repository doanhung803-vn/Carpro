
// Mock Data
const products = [
    {
        id: 1,
        name: "Pin Lithium-ion VinFast VF8",
        model: "VF8-2023",
        img: "https://images.unsplash.com/photo-1620888200673-98ba46700888?auto=format&fit=crop&w=400&q=80",
        category: "ev",
        retailPrice: "150,000,000đ",
        wholesalePrice: "135,000,000đ",
        new: true
    },
    {
        id: 2,
        name: "Bộ Sạc Wallbox Pulsar Plus",
        model: "Universal EV (Type 2)",
        img: "https://images.unsplash.com/photo-1663486021626-d62f4b46aa0d?auto=format&fit=crop&w=400&q=80",
        category: "ev",
        retailPrice: "18,500,000đ",
        wholesalePrice: "16,200,000đ",
        new: true
    },
    {
        id: 3,
        name: "Lọc Gió Động Cơ K&N",
        model: "Toyota Fortuner 2022",
        img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=400&q=80",
        category: "ice",
        retailPrice: "1,200,000đ",
        wholesalePrice: "850,000đ",
        new: false
    },
    {
        id: 4,
        name: "Phuộc Nhún Thể Thao Tein",
        model: "Mazda 3",
        img: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=400&q=80",
        category: "ice",
        retailPrice: "22,000,000đ",
        wholesalePrice: "19,500,000đ",
        new: false
    },
    {
        id: 5,
        name: "Màn Hình Android Zestech",
        model: "Universal 9 inch",
        img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80",
        category: "ice",
        retailPrice: "9,800,000đ",
        wholesalePrice: "7,500,000đ",
        new: true
    },
    {
        id: 6,
        name: "Cảm Biến Áp Suất Lốp TPMS",
        model: "Steelmate",
        img: "https://images.unsplash.com/photo-1599558718919-482f3478d591?auto=format&fit=crop&w=400&q=80",
        category: "ice",
        retailPrice: "2,500,000đ",
        wholesalePrice: "1,800,000đ",
        new: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Component Initialization
    renderProducts(products);
    
    // 2. Search Tabs Logic
    const searchTabs = document.querySelectorAll('.tab-btn');
    const searchForms = document.querySelectorAll('.search-form');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            searchTabs.forEach(t => t.classList.remove('active'));
            searchForms.forEach(f => f.classList.remove('active'));
            
            // Add active to current
            tab.classList.add('active');
            const targetId = tab.dataset.tab;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 3. Category Filtering
    const catBtns = document.querySelectorAll('.cat-btn');
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.cat;
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });

    // 4. B2B Login Simulation
    const loginBtn = document.getElementById('b2b-login-btn');
    let isWholesale = false;
    
    loginBtn.addEventListener('click', () => {
        isWholesale = !isWholesale;
        if(isWholesale) {
            loginBtn.textContent = 'Đại Lý: AutoGara 123';
            loginBtn.style.background = 'var(--primary-color)';
            loginBtn.style.color = '#fff';
            document.body.classList.add('b2b-mode');
            alert('Đăng nhập thành công! Đang hiển thị giá sỉ.');
        } else {
            loginBtn.textContent = 'Khách Sỉ Đăng Nhập';
            loginBtn.style.background = 'transparent';
            loginBtn.style.color = 'var(--primary-color)';
            document.body.classList.remove('b2b-mode');
        }
        // Re-render to update prices visibility (or toggle via CSS)
        updatePriceVisibility(isWholesale);
    });

    // 5. Booking Form
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Cảm ơn bạn! Hệ thống đã ghi nhận lịch hẹn. Chuyên viên sẽ gọi xác nhận trong 5 phút.');
        bookingForm.reset();
    });

    // Mobile Menu (Simple Toggle)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        // In real app, toggle a class for animation
    });
});

function renderProducts(items) {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    
    items.forEach(product => {
        const isWholesaleMode = document.body.classList.contains('b2b-mode');
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;
        
        card.innerHTML = `
            <div class="product-img">
                ${product.new ? '<span class="badge new">Mới</span>' : ''}
                <img src="${product.img}" alt="${product.name}">
                <div class="overlay-actions">
                    <button><i class="fa-solid fa-cart-plus"></i></button>
                    <button><i class="fa-regular fa-eye"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p class="model">Model: ${product.model}</p>
                <div class="price-box">
                    <div class="price-retail">
                        <span>Giá lẻ:</span> <strong>${product.retailPrice}</strong>
                    </div>
                    <div class="price-wholesale ${isWholesaleMode ? '' : 'hidden'}">
                        <span>Giá sỉ:</span> <strong class="highlight">${product.wholesalePrice}</strong>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function updatePriceVisibility(isWholesale) {
    const wholesalePrices = document.querySelectorAll('.price-wholesale');
    wholesalePrices.forEach(el => {
        if(isWholesale) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}
