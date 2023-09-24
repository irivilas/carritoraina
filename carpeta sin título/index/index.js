

// Array de objetos de productos
const productos = [
    { nombre: 'Castillo numero 1', precio: 2500 },
    { nombre: 'Castillo numero 2', precio: 2800 },
    { nombre: 'Granja', precio: 2700 },
    { nombre: 'Casa', precio: 2000 },
];

let carrito = [1,2,3,4];

const listaProductos = document.getElementById('listaProductos');

const carritoLista = document.getElementById('carritoLista');

const totalPagarElement = document.getElementById('totalPagar');

const finalizarCompraBtn = document.getElementById('finalizarCompra');

const Nohayproductos = document.getElementById('Nohayproductos');


function actualizarCarrito() {

    carritoLista.innerHTML = 'Lista DE productos';

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
    if (carrito.length > 0) {
      Nohayproductos.style.display = 'block';
  } else {
    Nohayproductos.style.display = 'none';
  }
}

productos.forEach(function(producto) {

    const listItem = document.createElement('li');
    listItem.className = 'Castillo numero 1';
    listItem.className = 'Castillo numero 2';
    listItem.className = 'Granja';
    listItem.className = 'Casitas';

  
    const addButton = document.createElement('button');


    addButton.addEventListener('comprame', (e) =>{
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Producto Agregado',
            text: 'El producto se agrego',
          })
    });

    addButton.className = 'btn btn-success float-right';
    addButton.innerText = 'Comprame';

    listItem.innerText = `${producto.nombre} - Precio: $${producto.precio.toFixed(2)}`;

    
    listItem.appendChild(addButton);

    addButton.addEventListener('comprame', function() {
        carrito.push(producto);
        actualizarCarrito();
    })
    listaProductos.appendChild(listItem);
    listItem.className = 'Castillo numero 1';
    listItem.className = 'Castillo numero 2';
    listItem.className = 'Granja';
    listItem.className = 'Casitas';
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