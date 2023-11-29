
// Zona new products (cambiar de imagen al pasar el cursor)

var isHovered = false;

function changeImageOnHover(carouselId, newImageUrl) {
  if (!isHovered) {
    isHovered = true;
    var carousel = new bootstrap.Carousel(document.getElementById(carouselId));
    carousel.to(1);
    document.querySelector(`#${carouselId} img`).src = newImageUrl;
  }
}

function resetImageOnHover(carouselId, originalImageUrl) {
  if (isHovered) {
    isHovered = false;
    var carousel = new bootstrap.Carousel(document.getElementById(carouselId));
    carousel.to(0);
    document.querySelector(`#${carouselId} img`).src = originalImageUrl;
  }
};





//Zona de iniciarSesion


const ventanaEmergente = document.getElementById('ventana-emergente');
const enlaceInicioSesion = document.getElementById('iniciar-sesion');
const formularioInicioSesion = document.getElementById('formulario-inicio-sesion');


let usuarioIniciado = false;

function mostrarVentanaEmergente() {
 
  if (!usuarioIniciado) {
    ventanaEmergente.style.display = 'block';
  }
}

function cerrarVentanaEmergente() {
  ventanaEmergente.style.display = 'none';
}

function validarInicioSesion() {
    const nombreUsuarioInput = document.getElementById('nombre-usuario');
    const contrasenaInput = document.getElementById('contrasena');
    const mensajeError = document.getElementById('mensaje-error');
  
   
    if (nombreUsuarioInput.value.trim() === '' || contrasenaInput.value.trim() === '') {
      mensajeError.textContent = 'Debes llenar ambos campos';
      return false;
    }
  
   
    const nombreUsuarioRegex = /^[a-zA-Z]+$/;
    if (!nombreUsuarioRegex.test(nombreUsuarioInput.value)) {
      mensajeError.textContent = 'El nombre de usuario solo debe contener letras';
      return false;
    }
  
   
    if (contrasenaInput.value.includes(' ')) {
      mensajeError.textContent = 'La contraseña no puede contener espacios';
      return false;
    }
  
    
    mensajeError.textContent = '';
  
    return true;
  }
  
  function iniciarSesion() {
    const formularioValido = validarInicioSesion();
  
    if (formularioValido) {
      const nombreUsuario = document.getElementById('nombre-usuario').value;
  
      mostrarNombreEnIcono(nombreUsuario);
      cerrarVentanaEmergente();
      usuarioIniciado = true;
      actualizarOpcionesInicioSesion();
    }
  }


function mostrarNombreEnIcono(nombreUsuario) {
    const nombreUsuarioSpan = document.getElementById('nombre-usuario-span');
    nombreUsuarioSpan.textContent = ` ${nombreUsuario}`;

  
    document.getElementById('sesion-iniciada').style.display = 'flex';
}


function actualizarOpcionesInicioSesion() {
    const iniciarSesionElement = document.getElementById('iniciar-sesion');
    const cerrarSesionElement = document.getElementById('cerrar-sesion');
    const sesionIniciadaElement = document.getElementById('sesion-iniciada');

    if (usuarioIniciado) {
        iniciarSesionElement.style.display = 'none';
        cerrarSesionElement.style.display = 'block';
        sesionIniciadaElement.style.display = 'flex';
    } else {
        iniciarSesionElement.style.display = 'block';
        cerrarSesionElement.style.display = 'none';
        sesionIniciadaElement.style.display = 'none';
    }
}


function cerrarSesion() {
    usuarioIniciado = false;

   
    document.getElementById('nombre-usuario').value = '';
    document.getElementById('contrasena').value = '';

    enlaceInicioSesion.innerHTML = '<i class="fas fa-user"></i> Iniciar Sesión';
    document.getElementById('sesion-iniciada').style.display = 'none';
    document.getElementById('cerrar-sesion').style.display = 'none';
    document.getElementById('iniciar-sesion').style.display = 'block';
}

  

  enlaceInicioSesion.addEventListener('click', mostrarVentanaEmergente);
  
  
  document.getElementById('cerrar-sesion').addEventListener('click', cerrarSesion);
  

  actualizarOpcionesInicioSesion();
  
 
  



// ZONA CARRITO DE COMPRAS

document.addEventListener("DOMContentLoaded", function () {
    const productos = [
        { id: 1, nombre: "Remera Hustlers Calavera", precio: 12999, imagen: "IMG/fuego-calavera.png"},
        { id: 2, nombre: "Remera Hustlers The City", precio: 10999, imagen: "IMG/remera-verde.png" },
        { id: 3, nombre: "Remera Hustlers Vesrion 2.0", precio: 9800, imagen: "IMG/calavera-simple1.png" }
    ];

    const carrito = [];
    const carritoLista = document.getElementById("carrito-lista");
    const totalElemento = document.getElementById("total");
    const carritoSection = document.getElementById("carrito");
    const cartCountElement = document.getElementById("cart-count");

    function actualizarCarrito() {
        carritoLista.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            const productoEnLista = productos.find((p) => p.id === producto.id);
            total += productoEnLista.precio * producto.cantidad;

            const productoElemento = document.createElement("div");
            productoElemento.classList.add("carrito-item", "d-flex");
            productoElemento.innerHTML = `
                <img src="${productoEnLista.imagen}" alt="${productoEnLista.nombre}" class="carrito-imagen" style="height: 100px;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title carrito-nombre">${productoEnLista.nombre}</h5>
                    <p class="card-text carrito-precio">$${productoEnLista.precio.toFixed(2)} x ${producto.cantidad}</p>
                    <button class="btn btn-danger remove-from-cart" data-index="${index}">Eliminar</button>
                </div>
            `;
            carritoLista.appendChild(productoElemento);
        });

        totalElemento.textContent = total.toFixed(2);

        
        cartCountElement.textContent = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    }

    function agregarAlCarrito(id) {
        const productoExistente = carrito.find((producto) => producto.id === id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id, cantidad: 1 });
        }

        actualizarCarrito();
        mostrarCarrito();
    }

    function eliminarUnidadDelCarrito(index) {
        const producto = carrito[index];
        if (producto.cantidad > 1) {
            producto.cantidad--;
        } else {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
        mostrarCarrito();
    }

    function mostrarCarrito() {
        carritoSection.classList.add("show-cart");
    }


        function cerrarCarrito() {
            carritoSection.classList.remove("show-cart");
        }
        
    

   
    document.getElementById("cart-icon").addEventListener("click", function () {
        carritoSection.classList.toggle("show-cart");
    });

   
    document.querySelectorAll(".add-to-cart").forEach((button, index) => {
        button.addEventListener("click", () => {
            agregarAlCarrito(productos[index].id);
        });
    });

   
    document.getElementById("btn-cerrar-carrito").addEventListener("click", cerrarCarrito);

   
    document.getElementById("vaciar-carrito").addEventListener("click", function () {
        carrito.length = 0;
        actualizarCarrito();
    });

   
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-from-cart")) {
            const index = event.target.dataset.index;
            eliminarUnidadDelCarrito(index);
        }
    });
});




