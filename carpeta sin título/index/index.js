

// Array de objetos de productos
const productos = [
    { nombre: 'Castillo numero 1', precio: 2500 },
    { nombre: 'Castillo numero 2', precio: 2800 },
    { nombre: 'Granja', precio: 2700 },
    { nombre: 'Casita', precio: 2000 },
];

let carrito = [];

const listaProductos = document.getElementById('listaProductos');
const carritoLista = document.getElementById('carritoLista');
const totalPagarElement = document.getElementById('totalPagar');
const finalizarCompraBtn = document.getElementById('finalizarCompra');
const Nohayproductos = document.getElementById('Nohayproductos');


function actualizarCarrito() {
  carritoLista.innerHTML = '';

  let totalPagar = 0;

  carrito.forEach(function(producto, index) {
      totalPagar += producto.precio;

      const carritoItem = document.createElement('li');
      carritoItem.className = 'list-group-item';
      carritoItem.innerText = `${producto.nombre} - Precio: $${producto.precio.toFixed(2)}`;

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger float-right ml-2';
      deleteButton.innerText = 'Eliminar';

      deleteButton.addEventListener('click', function() {
          carrito.splice(index, 1);
          actualizarCarrito();
      });

      carritoItem.appendChild(deleteButton);

      carritoLista.appendChild(carritoItem);
  });

  totalPagarElement.innerText = totalPagar.toFixed(2);

  localStorage.setItem('carrito', JSON.stringify(carrito));

  if (carrito.length > 0) {
      Nohayproductos.style.display = 'block';
  } else {
      Nohayproductos.style.display = 'none';
  }
}

productos.forEach(function(producto) {
  const listItem = document.createElement('li');
  listItem.className = 'producto';
  listItem.classList.add(producto.nombre.replace(/ /g, '-'));

  const addButton = document.createElement('button');
  addButton.className = 'btn btn-success float-right';
  addButton.innerText = 'Comprame';

  addButton.addEventListener('click', function() {
      carrito.push(producto);
      actualizarCarrito();
  });

  listItem.innerText = `${producto.nombre} - Precio: $${producto.precio.toFixed(2)}`;
  listItem.appendChild(addButton);

  listaProductos.appendChild(listItem);
});

finalizarCompraBtn.addEventListener('click', function() {
  carrito = [];
  actualizarCarrito();
});

const carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
  carrito = JSON.parse(carritoGuardado);
  actualizarCarrito();
}