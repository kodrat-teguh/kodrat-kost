// ========================================
// DATA KAMAR (Simulasi Database)
// ========================================
const roomsData = [
    {
        id: 1,
        name: "Kamar Premium Mandi Dalam",
        type: "mandi-dalam",
        price: 1800000,
        size: "3x3 meter",
        facilities: ["AC", "Kasur King", "Lemari", "Meja Belajar", "WiFi"],
        image: "images/kamar-mandi-dalam1.jpg",
        status: "available"
    },
    {
        id: 2,
        name: "Kamar Standar Mandi Dalam",
        type: "mandi-dalam",
        price: 1500000,
        size: "3x3 meter",
        facilities: ["Kipas Angin", "Kasur", "Lemari", "Meja Belajar", "WiFi"],
        image: "images/kamar-mandi-dalam2.jpg",
        status: "available"
    },
    {
        id: 3,
        name: "Kamar Ekonomis Mandi Dalam",
        type: "mandi-dalam",
        price: 1000000,
        size: "3x3 meter",
        facilities: ["Kipas Angin", "Kasur", "Lemari", "Meja Belajar", "WiFi"],
        image: "images/kamar-mandi-dalam3.jpg",
        status: "available"
    },
    {
        id: 4,
        name: "Kamar Standar Mandi Luar",
        type: "mandi-luar",
        price: 1200000,
        size: "3x3 meter",
        facilities: ["Kipas Angin", "Kasur", "Lemari", "Meja Belajar", "WiFi"],
        image: "images/kamar-mandi-luar1.jpg",
        status: "occupied"
    },
    {
        id: 5,
        name: "Kamar Deluxe Mandi Dalam",
        type: "mandi-dalam",
        price: 2000000,
        size: "3.5x3.5 meter",
        facilities: ["AC", "Kasur King", "Lemari Besar", "Meja Belajar", "WiFi", "TV"],
        image: "images/kamar-mandi-dalam3.jpg",
        status: "available"
    }
];

// ========================================
// RENDER KAMAR KE HTML
// ========================================
function renderRooms(filter = 'all') {
    const container = document.getElementById('rooms-container');
    container.innerHTML = '';

    const filteredRooms = filter === 'all' 
        ? roomsData 
        : roomsData.filter(room => room.type === filter);

    filteredRooms.forEach(room => {
        const statusClass = room.status === 'available' ? 'status-available' : 'status-occupied';
        const statusText = room.status === 'available' ? 'Tersedia' : 'Terisi';
        
        const roomCard = `
            <div class="room-card" data-type="${room.type}">
                <img src="${room.image}" alt="${room.name}" class="room-image" onerror="this.src='images/kamar-mandi-dalam1.jpg'">
                <div class="room-info">
                    <span class="room-status ${statusClass}">${statusText}</span>
                    <h3>${room.name}</h3>
                    <p class="price">Rp ${room.price.toLocaleString('id-ID')}/<span>bulan</span></p>
                    <div class="facilities">
                        <span><i class="fas fa-ruler-combined"></i> ${room.size}</span>
                        <span><i class="fas fa-bed"></i> ${room.type === 'mandi-dalam' ? 'Mandi Dalam' : 'Mandi Luar'}</span>
                    </div>
                    <div class="facilities">
                        ${room.facilities.map(f => `<span><i class="fas fa-check"></i> ${f}</span>`).join('')}
                    </div>
                    <div class="room-actions">
                        <a href="https://wa.me/6281223569467?text=Halo, saya tertarik dengan ${room.name}" class="btn-whatsapp" target="_blank">
                            <i class="fab fa-whatsapp"></i> Tanya WA
                        </a>
                        <a href="https://maps.app.goo.gl/q9PKCHBphvzNP1ig9" class="btn-map" target="_blank">
                            <i class="fas fa-map-marker-alt"></i> Lihat Lokasi
                        </a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += roomCard;
    });
}

// ========================================
// FILTER KAMAR
// ========================================
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            renderRooms(filter);
        });
    });
}

// ========================================
// KIRIM PESAN KE WHATSAPP
// ========================================
function sendToWhatsApp(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    const adminPhone = '6281223569467';
    
    const whatsappMessage = `
Halo Admin Kost Kodrat, saya ingin bertanya tentang kost:

👤 Nama: ${name}
📧 Email: ${email}
📱 WhatsApp: ${phone}
💬 Pesan: ${message}

Mohon infonya lebih lanjut. Terima kasih!
    `.trim();
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    
    document.getElementById('contact-form').reset();
    alert('✅ Pesan berhasil dikirim ke WhatsApp Admin!');
}

// ========================================
// SETUP FORM KONTAK
// ========================================
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', sendToWhatsApp);
    }
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                const nav = document.querySelector('nav');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = document.querySelector('.menu-toggle i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// ========================================
// ANIMATION ON SCROLL
// ========================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.room-card, .facility-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    renderRooms();
    setupFilters();
    setupContactForm();
    setupMobileMenu();
    setupSmoothScroll();
    setupScrollAnimations();
});

// ========================================
// API INTEGRATION (Nanti untuk Fullstack)
// ========================================
async function fetchRoomsFromAPI() {
    try {
        const response = await fetch('http://localhost:5000/api/rooms');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return roomsData;
    }
}

// Export functions untuk testing
window.renderRooms = renderRooms;
window.setupFilters = setupFilters;
window.setupContactForm = setupContactForm;
window.fetchRoomsFromAPI = fetchRoomsFromAPI;