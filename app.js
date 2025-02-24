// Lista de productos disponibles
const productos = [
    { id: 1, nombre: "Camisa", precio: 25, cantidad: 10 },
    { id: 2, nombre: "Pantalón", precio: 40, cantidad: 8 },
    { id: 3, nombre: "Zapatos", precio: 60, cantidad: 5 },
    { id: 4, nombre: "Sombrero", precio: 15, cantidad: 12 }
  ];
  
  let carrito = [];
  
  // Mostrar productos disponibles en la página
  function mostrarProductos() {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";
    productos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Disponible: ${producto.cantidad}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      `;
      listaProductos.appendChild(div);
    });
  }
  
  // Agregar producto al carrito
  function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto && producto.cantidad > 0) {
      const productoEnCarrito = carrito.find(p => p.id === id);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }
      producto.cantidad--;
      actualizarCarrito();
    } else {
      alert("Producto agotado");
    }
  }
  
  // Eliminar producto del carrito
  function eliminarDelCarrito(id) {
    const productoEnCarrito = carrito.find(p => p.id === id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad--;
      const producto = productos.find(p => p.id === id);
      producto.cantidad++;
      if (productoEnCarrito.cantidad === 0) {
        carrito = carrito.filter(p => p.id !== id);
      }
      actualizarCarrito();
    }
  }
  
  // Actualizar visualización del carrito
  function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((producto) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${producto.nombre} - ${producto.cantidad} x $${producto.precio} = $${producto.cantidad * producto.precio}</p>
        <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
      `;
      listaCarrito.appendChild(div);
      total += producto.cantidad * producto.precio;
    });
    document.getElementById("total").textContent = total;
  }
  
  // Generar factura
  function generarFactura() {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    const detalleFactura = document.getElementById("detalle-factura");
    detalleFactura.innerHTML = "";
    let total = 0;
    carrito.forEach((producto) => {
      const div = document.createElement("div");
      div.innerHTML = `<p>${producto.nombre} - ${producto.cantidad} x $${producto.precio} = $${producto.cantidad * producto.precio}</p>`;
      detalleFactura.appendChild(div);
      total += producto.cantidad * producto.precio;
    });
    detalleFactura.innerHTML += `<h3>Total: $${total}</h3>`;
    document.getElementById("factura").style.display = "block";
  }
  
  // Limpiar carrito y permitir seguir comprando
  function seguirComprando() {
    carrito = [];
    actualizarCarrito();
    document.getElementById("factura").style.display = "none";
    mostrarProductos();
  }
  
  // Eventos
  
  // Confirmar compra
  document.getElementById("confirmar-compra").addEventListener("click", generarFactura);
  // Seguir comprando
  document.getElementById("seguir-comprando").addEventListener("click", seguirComprando);
  
  // Mostrar productos al cargar la página
  mostrarProductos();
  