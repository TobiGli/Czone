(() => {
  const state = {
    products: [],
    favorites: JSON.parse(localStorage.getItem("czone-favorites") || "[]"),
    cart: JSON.parse(localStorage.getItem("czone-cart") || "[]"),
    drawer: "cart",
    sortAscending: true
  };

  const money = (value) => `$${Number(value).toLocaleString("es-AR")}`;
  const imageUrl = (product) => `/img/${product.imagen1 || "buzo1.png"}`;
  const save = () => {
    localStorage.setItem("czone-favorites", JSON.stringify(state.favorites));
    localStorage.setItem("czone-cart", JSON.stringify(state.cart));
  };
  const isFavorite = (id) => state.favorites.includes(String(id));
  const cartQuantity = () => state.cart.reduce((total, item) => total + item.quantity, 0);

  function productCard(product) {
    const id = String(product.id);
    return `<article class="product-card" data-product-id="${id}">
      <div class="product-image-wrap">
        <img class="product-image" src="${imageUrl(product)}" alt="${product.name}">
        <button class="product-favorite ${isFavorite(id) ? "is-favorite" : ""}" type="button" data-action="favorite" aria-label="${isFavorite(id) ? "Quitar de favoritos" : "Agregar a favoritos"}"><i class="${isFavorite(id) ? "fas" : "far"} fa-heart"></i></button>
      </div>
      <div class="product-card-info"><p class="product-type">${product.type || "urbano"}</p><h2>${product.name}</h2><p class="product-description">${product.description || "Prenda urbana C Zone."}</p><div class="product-buy-row"><strong>${money(product.price)}</strong><button class="add-to-cart" type="button" data-action="cart"><i class="fas fa-plus"></i> Agregar</button></div></div>
    </article>`;
  }

  function renderCatalog() {
    const grid = document.querySelector(".catalog-grid");
    if (!grid) return;
    const query = new URLSearchParams(window.location.search).get("q")?.toLowerCase() || "";
    let products = state.products.filter((product) => `${product.name} ${product.type} ${product.description}`.toLowerCase().includes(query));
    if (document.body.classList.contains("offers-page")) products = products.filter((product) => Number(product.price) <= 25000);
    if (document.querySelector(".catalog-sort")) products.sort((a, b) => state.sortAscending ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price));
    grid.innerHTML = products.length ? products.map(productCard).join("") : `<div class="empty-state"><i class="fas fa-search"></i><h2>No encontramos prendas</h2><p>Probá con otro término de búsqueda.</p></div>`;
    const count = document.querySelector(".catalog-result-count");
    if (count) count.textContent = `${products.length} ${products.length === 1 ? "producto" : "productos"}`;
  }

  function homeProductCard(product, mode = "feature") {
    const id = String(product.id);
    const hoodie = mode === "hoodie";
    return `<article class="${hoodie ? "hoodie-card" : "home-product-card"}" data-product-id="${id}">
      <div class="home-product-image"><img src="${imageUrl(product)}" alt="${product.name}"><div class="home-product-overlay"><p>${product.name}</p><span>${product.type || "urbano"} / ${product.category_id ? "C Zone" : "edición"}</span></div><button class="product-favorite" type="button" data-action="favorite" aria-label="Agregar a favoritos"><i class="${isFavorite(id) ? "fas" : "far"} fa-heart"></i></button><button class="icon-buy" type="button" data-action="cart" aria-label="Agregar al carrito"><i class="fas fa-plus"></i></button></div>
      ${hoodie ? "" : `<div class="home-product-meta"><span>${product.type || "urbano"}</span><strong>${money(product.price)}</strong></div>`}
    </article>`;
  }

  function renderHomeSections() {
    const featured = document.querySelector("#featured-products");
    if (featured) featured.innerHTML = state.products.slice(0, 4).map((product) => homeProductCard(product)).join("");
    const hoodies = document.querySelector("#hoodie-grid");
    if (hoodies) {
      const hoodieProducts = state.products.filter((product) => product.type === "abrigo" || product.name.toLowerCase().includes("buzo"));
      hoodies.innerHTML = (hoodieProducts.length ? hoodieProducts : state.products.slice(0, 3)).slice(0, 3).map((product) => homeProductCard(product, "hoodie")).join("");
    }
    const popular = document.querySelector("#popular-products");
    if (popular) {
      const popularProducts = [...state.products].sort((a, b) => Number(b.sales_count || 0) - Number(a.sales_count || 0)).slice(0, 3);
      popular.innerHTML = popularProducts.map((product, index) => `<article class="popular-item"><span class="popular-rank">0${index + 1}</span><img src="${imageUrl(product)}" alt="${product.name}"><div><p>${product.type || "urbano"}</p><h3>${product.name}</h3><strong>${money(product.price)}</strong></div><button class="icon-buy" type="button" data-product-id="${product.id}" data-action="cart" aria-label="Agregar al carrito"><i class="fas fa-plus"></i></button></article>`).join("");
    }
  }

  function updateCounters() {
    document.querySelectorAll(".cart-count").forEach((node) => { node.textContent = cartQuantity(); });
  }

  function drawerMarkup() {
    return `<div class="storefront-overlay" data-action="close-drawer"></div><aside class="storefront-drawer" aria-label="Panel de compras"><button class="drawer-close" type="button" data-action="close-drawer" aria-label="Cerrar panel"><i class="fas fa-arrow-left"></i></button><div class="drawer-content"></div></aside>`;
  }

  function renderDrawer() {
    const content = document.querySelector(".drawer-content");
    if (!content) return;
    if (state.drawer === "favorites") {
      const favorites = state.products.filter((product) => isFavorite(product.id));
      content.innerHTML = `<p class="eyebrow">Tu selección</p><h2>Favoritos</h2>${favorites.length ? `<div class="drawer-list">${favorites.map((product) => `<div class="drawer-item"><img src="${imageUrl(product)}" alt=""><div><strong>${product.name}</strong><span>${money(product.price)}</span></div><button type="button" data-action="cart" data-id="${product.id}" aria-label="Agregar al carrito"><i class="fas fa-plus"></i></button></div>`).join("")}</div>` : `<div class="drawer-empty"><i class="far fa-heart"></i><p>Guardá prendas con el corazón para verlas acá.</p></div>`}`;
      return;
    }
    const total = state.cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    content.innerHTML = `<p class="eyebrow">Tu selección</p><h2>Carrito</h2>${state.cart.length ? `<div class="drawer-list">${state.cart.map((item) => `<div class="drawer-item"><img src="${imageUrl(item)}" alt=""><div><strong>${item.name}</strong><span>${money(item.price)} x ${item.quantity}</span></div><button type="button" data-action="remove-cart" data-id="${item.id}" aria-label="Quitar del carrito"><i class="fas fa-minus"></i></button></div>`).join("")}</div><div class="drawer-total"><span>Total</span><strong>${money(total)}</strong></div><button class="checkout-button" type="button" data-action="checkout">Continuar compra</button>` : `<div class="drawer-empty"><i class="fas fa-shopping-bag"></i><p>Tu carrito todavía está vacío.</p><a href="/coleccion">Explorar colección</a></div>`}`;
  }

  function openDrawer(type) {
    state.drawer = type;
    let drawer = document.querySelector(".storefront-drawer");
    if (!drawer) { document.body.insertAdjacentHTML("beforeend", drawerMarkup()); drawer = document.querySelector(".storefront-drawer"); }
    renderDrawer();
    document.querySelector(".storefront-overlay").classList.add("is-visible");
    drawer.classList.add("is-open");
    document.body.classList.add("drawer-open");
  }

  function closeDrawer() {
    document.querySelector(".storefront-drawer")?.classList.remove("is-open");
    document.querySelector(".storefront-overlay")?.classList.remove("is-visible");
    document.body.classList.remove("drawer-open");
  }

  function addToCart(product) {
    const item = state.cart.find((cartItem) => String(cartItem.id) === String(product.id));
    if (item) item.quantity += 1; else state.cart.push({ ...product, quantity: 1 });
    save(); updateCounters(); openDrawer("cart");
  }

  function toggleFavorite(product) {
    const id = String(product.id);
    state.favorites = isFavorite(id) ? state.favorites.filter((favorite) => favorite !== id) : [...state.favorites, id];
    save(); renderCatalog(); updateCounters();
    if (state.drawer === "favorites" && document.querySelector(".storefront-drawer.is-open")) renderDrawer();
  }

  function openSearch() {
    let panel = document.querySelector(".search-panel");
    if (!panel) {
      document.body.insertAdjacentHTML("beforeend", `<div class="search-panel"><div class="search-panel-inner"><button class="search-close" type="button" data-action="close-search" aria-label="Cerrar búsqueda"><i class="fas fa-times"></i></button><p class="eyebrow">Buscar en C Zone</p><form class="search-form"><input name="q" type="search" placeholder="¿Qué estás buscando?" autocomplete="off"><button type="submit" aria-label="Buscar"><i class="fas fa-arrow-right"></i></button></form><div class="search-results"></div></div></div>`);
      panel = document.querySelector(".search-panel");
      panel.querySelector(".search-form").addEventListener("submit", (event) => { event.preventDefault(); const query = new FormData(event.currentTarget).get("q"); window.location.href = `/coleccion?q=${encodeURIComponent(query)}`; });
    }
    panel.classList.add("is-open");
    panel.querySelector("input").focus();
    const results = panel.querySelector(".search-results");
    results.innerHTML = state.products.slice(0, 4).map(productCard).join("");
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action], .search-trigger, .favorites-trigger, .cart-trigger");
    if (!target) return;
    if (target.classList.contains("search-trigger")) return openSearch();
    if (target.classList.contains("favorites-trigger")) return openDrawer("favorites");
    if (target.classList.contains("cart-trigger")) return openDrawer("cart");
    const product = state.products.find((item) => String(item.id) === String(target.closest("[data-product-id], [data-id]")?.dataset.productId || target.dataset.id));
    if (target.dataset.action === "close-drawer") return closeDrawer();
    if (target.dataset.action === "close-search") return document.querySelector(".search-panel")?.classList.remove("is-open");
    if (target.dataset.action === "favorite" && product) { toggleFavorite(product); renderHomeSections(); return; }
    if (target.dataset.action === "cart" && product) return addToCart(product);
    if (target.dataset.action === "remove-cart") { state.cart = state.cart.filter((item) => String(item.id) !== String(target.dataset.id)); save(); updateCounters(); renderDrawer(); }
    if (target.dataset.action === "checkout") window.alert("Tu carrito está listo. Próximamente conectaremos el pago.");
  });

  document.addEventListener("DOMContentLoaded", async () => {
    document.querySelector(".catalog-sort")?.addEventListener("click", (event) => {
      state.sortAscending = !state.sortAscending;
      event.currentTarget.querySelector("i").className = state.sortAscending ? "fas fa-arrow-down" : "fas fa-arrow-up";
      renderCatalog();
    });
    document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => { event.preventDefault(); event.currentTarget.reset(); event.currentTarget.querySelector(".newsletter-status").textContent = "Listo. Revisá tu bandeja para confirmar la suscripción."; });
    try { const response = await fetch("/products"); state.products = await response.json(); renderCatalog(); renderHomeSections(); updateCounters(); } catch { document.querySelectorAll(".catalog-grid, .home-product-grid, .hoodie-grid, .popular-grid").forEach((grid) => { grid.innerHTML = `<div class="empty-state"><i class="fas fa-cloud-slash"></i><h2>Catálogo no disponible</h2><p>Intentá nuevamente en unos segundos.</p></div>`; }); }
  });
})();
