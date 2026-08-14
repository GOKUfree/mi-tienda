// ============================================
// BASE DE DATOS DE PRODUCTOS
// ============================================
const productos = [
    // ===== ANTIVIRUS =====
    {
        id: 1,
        nombre: "Kaspersky Internet Security",
        categoria: "antivirus",
        precio: 59.90,
        precio_original:70.90,
        descripcion: "Protección en tiempo real para PC, Mac y móviles. 3 dispositivos.",
        icono: "fa-shield",
        imagen: "img/productos/kaspersky.png"
    },
    {
        id: 2,
        nombre: "ESET Security",
        categoria: "antivirus",
        precio: 49.90,
        precio_original: 60.90,
        descripcion: "Protección completa con firewall y antivirus avanzado.",
        icono: "fa-shield-virus",
        imagen: "img/productos/SET SECURITY.png"
    },

    // ===== OFFICE =====
    {
        id: 3,
        nombre: "Microsoft 365",
        categoria: "office",
        precio: 79.90,
        precio_original: 99.90,
        descripcion: "Word, Excel, PowerPoint, Outlook y 1TB en OneDrive. 1 año.",
        icono: "fa-file-word",
        imagen: "img/productos/MICROSOFT365.png"
    },
    {
        id: 4,
        nombre: "Office 365 Professional Plus",
        categoria: "office",
        precio: 99.90,
        precio_original: 149.90,
        descripcion: "Office 365 Professional Plus con todas las aplicaciones.",
        icono: "fa-users",
        imagen: "img/productos/OFFICE 365 PROFESSIONAL PLUS.png"
    },
    {
        id: 5,
        nombre: "Office 2021",
        categoria: "office",
        precio: 49.90,
        precio_original: 70.90,
        descripcion: "Licencia perpetua para PC. Incluye todas las apps. Sin suscripción.",
        icono: "fa-file-pen",
        imagen: "img/productos/OFFICE 2021.png"
    },

    // ===== AUTOCAD / DISEÑO =====
    {
        id: 6,
        nombre: "Autodesk AutoCAD",
        categoria: "autocad",
        precio: 90,
        precio_original: 149.90,
        descripcion: "Diseño 2D y 3D profesional. Licencia anual con soporte técnico.",
        icono: "fa-cube",
        imagen: "img/productos/AUTODESK.png"
    },
    {
        id: 7,
        nombre: "Adobe Creative Cloud",
        categoria: "diseno",
        precio: 230,
        precio_original: 289.90,
        descripcion: "Photoshop + Illustrator + 100GB en la nube. 12 meses.",
        icono: "fa-paintbrush",
        imagen: "img/productos/ADOVE.png"
    },
    {
        id: 8,
        nombre: "Canva Pro",
        categoria: "diseno",
        precio: 60,
        precio_original: null,
        descripcion: "Diseño gráfico profesional con Canva Pro. Acceso a todos los recursos.",
        icono: "fa-pen-fancy",
        imagen: "img/productos/CANVA PRO.png"
    },
    {
        id: 9,
        nombre: "Corel Draw 2024",
        categoria: "diseno",
        precio: 190,
        precio_original: 229.90,
        descripcion: "Diseño vectorial y edición de imágenes profesional.",
        icono: "fa-pen-fancy",
        imagen: "img/productos/COREL DRAW 2024.png"
    },
    {
        id: 10,
        nombre: "Corel Draw 2021",
        categoria: "diseno",
        precio: 90,
        precio_original: 170,
        descripcion: "Diseño vectorial profesional. Licencia perpetua.",
        icono: "fa-paintbrush",
        imagen: "img/productos/corel 2021.png"
    },
    {
        id: 11,
        nombre: "Filmora",
        categoria: "diseno",
        precio: 90,
        precio_original: 119.90,
        descripcion: "Edición de video profesional. Incluye efectos y transiciones avanzadas.",
        icono: "fa-film",
        imagen: "img/productos/FILMORA.png"
    },

    // ===== SISTEMAS OPERATIVOS =====
    {
        id: 12,
        nombre: "Windows 11",
        categoria: "sistemas",
        precio:49.90,
        precio_original: 150,
        descripcion: "Sistema operativo Windows 11. Licencia original.",
        icono: "fa-windows",
        imagen: "img/productos/WINDOWS 11.png"
    },
    {
        id: 13,
        nombre: "Windows Server",
        categoria: "sistemas",
        precio: 150,
        precio_original: 199.90,
        descripcion: "Windows Server para empresas. Licencia original.",
        icono: "fa-server",
        imagen: "img/productos/w server.png"
    }
];

// ============================================
// CARRITO DE COMPRAS
// ============================================
let carrito = [];
let filtroActual = 'todos';

// ============================================
// RENDERIZAR PRODUCTOS
// ============================================
function renderizarProductos(productosFiltrados = null) {
    const container = document.getElementById('productsContainer');
    const productosMostrar = productosFiltrados || productos;
    
    if (productosMostrar.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 60px; color: #ddd;"></i>
                <h3 style="color: #888; margin-top: 20px;">No se encontraron productos</h3>
                <p style="color: #aaa;">Prueba con otra búsqueda o categoría</p>
            </div>
        `;
        return;
    }

    container.innerHTML = productosMostrar.map(producto => `
        <div class="product-card">
            ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="product-img" loading="lazy">` : `<i class="fas ${producto.icono} product-icon"></i>`}
            <h3>${producto.nombre}</h3>
            <p class="product-category"><i class="fas fa-tag"></i> ${producto.categoria.toUpperCase()}</p>
            <div class="product-price">
                S/ ${producto.precio.toFixed(2)}
                ${producto.precio_original ? `<span class="original">S/ ${producto.precio_original.toFixed(2)}</span>` : ''}
            </div>
            <p class="product-desc">${producto.descripcion}</p>
            <button class="btn-add" onclick="agregarAlCarrito(${producto.id})">
                <i class="fas fa-cart-plus"></i> Agregar al Carrito
            </button>
        </div>
    `).join('');
}

// ============================================
// CONTAR PRODUCTOS POR CATEGORÍA (AUTOMÁTICO)
// ============================================
function actualizarContadoresCategorias() {
    const categorias = ['antivirus', 'office', 'autocad', 'diseno', 'sistemas'];
    categorias.forEach(cat => {
        const el = document.getElementById(`count-${cat}`);
        if (el) {
            el.textContent = productos.filter(p => p.categoria === cat).length;
        }
    });
}

// ============================================
// FILTRAR PRODUCTOS
// ============================================
function filtrar(categoria) {
    filtroActual = categoria;
    const input = document.getElementById('searchInput');
    input.value = '';
    
    if (categoria === 'todos') {
        renderizarProductos();
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        renderizarProductos(filtrados);
    }
    
    document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
}

function mostrarTodos() {
    filtrar('todos');
}

// ============================================
// BUSCAR PRODUCTOS
// ============================================
function buscarProducto() {
    const input = document.getElementById('searchInput');
    const termino = input.value.toLowerCase().trim();
    
    if (termino === '') {
        if (filtroActual === 'todos') {
            renderizarProductos();
        } else {
            const filtrados = productos.filter(p => p.categoria === filtroActual);
            renderizarProductos(filtrados);
        }
        return;
    }
    
    const resultados = productos.filter(p => 
        p.nombre.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino) ||
        p.categoria.includes(termino)
    );
    
    renderizarProductos(resultados);
}

// ============================================
// ORDENAR PRODUCTOS
// ============================================
function ordenarProductos() {
    const select = document.getElementById('sortSelect');
    const orden = select.value;
    
    let productosOrdenados = [...productos];
    
    switch(orden) {
        case 'price-asc':
            productosOrdenados.sort((a, b) => a.precio - b.precio);
            break;
        case 'price-desc':
            productosOrdenados.sort((a, b) => b.precio - a.precio);
            break;
        case 'name':
            productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        default:
            productosOrdenados = productos;
    }
    
    renderizarProductos(productosOrdenados);
}

// ============================================
// CARRITO - AGREGAR / ELIMINAR
// ============================================
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;
    
    const existente = carrito.find(item => item.id === productoId);
    
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            icono: producto.icono,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

function cambiarCantidad(productoId, cambio) {
    const item = carrito.find(i => i.id === productoId);
    if (!item) return;
    
    item.cantidad += cambio;
    
    if (item.cantidad <= 0) {
        eliminarDelCarrito(productoId);
        return;
    }
    
    actualizarCarrito();
}

// ============================================
// ACTUALIZAR CARRITO (UI)
// ============================================
function actualizarCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cartCount').textContent = totalItems;
    
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">🛒 Tu carrito está vacío</p>`;
        cartTotal.textContent = 'S/ 0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = carrito.map(item => `
        <div class="cart-item">
            <i class="fas ${item.icono}"></i>
            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                <p>S/ ${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="cambiarCantidad(${item.id}, -1)" aria-label="Disminuir cantidad">−</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)" aria-label="Aumentar cantidad">+</button>
            </div>
            <button class="cart-item-remove" onclick="eliminarDelCarrito(${item.id})" aria-label="Eliminar ${item.nombre} del carrito">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    cartTotal.textContent = `S/ ${total.toFixed(2)}`;
}

// ============================================
// VACIAR CARRITO
// ============================================
function vaciarCarrito() {
    if (carrito.length === 0) return;
    
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        carrito = [];
        actualizarCarrito();
        mostrarNotificacion('🗑️ Carrito vaciado');
    }
}

// ============================================
// TOGGLE CARRITO
// ============================================
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// ============================================
// CHECKOUT
// ============================================
function checkout() {
    if (carrito.length === 0) {
        mostrarNotificacion('⚠️ Tu carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    // ===== CONSTRUIR MENSAJE =====
    const mensaje = 
        `Hola, quiero comprar:\n` +
        carrito.map(i => `${i.nombre} x${i.cantidad} = S/ ${(i.precio * i.cantidad).toFixed(2)}`).join('\n') +
        `\n\nTotal: S/ ${total.toFixed(2)}\n\n` +
        `¿Están disponibles estos productos? ¿Tienen alguna oferta?`;
    
    // ===== SOLO PARA PERÚ (NÚMERO 920206320) =====
    const url = `https://wa.me/51920206320?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener');
}

// ============================================
// NOTIFICACIONES
// ============================================
function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #1a1a2e;
        color: #fff;
        padding: 16px 28px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 500;
        z-index: 9999;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        border-left: 4px solid #007bff;
    `;
    
    notif.innerHTML = mensaje;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ============================================
// ANIMACIONES CSS
// ============================================
const styleAnimations = document.createElement('style');
styleAnimations.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(styleAnimations);

// ============================================
// INICIALIZAR
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContadoresCategorias();
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('cartSidebar');
        if (sidebar.classList.contains('open')) {
            toggleCart();
        }
    }
    
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

console.log('🚀 Aesthetic Tech Perú cargado correctamente');
console.log(`📦 ${productos.length} productos disponibles`);