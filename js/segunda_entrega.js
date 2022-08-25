const productos = []
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const campos = document.querySelectorAll("input")
// const btnBuscar = document.querySelector(".btn .btn-dark")
const cuerpo = document.getElementById("cuerpo")
const carritoSection = document.getElementById("carrito")


class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        // this.imagen=imagen
    }
}

function generadorAutomatico() {
    productos.push(new Producto(1, "Bucket Grey", 60000))
    productos.push(new Producto(2, "Bucket Green", 60000))
    productos.push(new Producto(3, "Bucket Purple", 60000))
    productos.push(new Producto(4, "Vest Grey", 100000))
    productos.push(new Producto(5, "Vest Purple", 100000))
    productos.push(new Producto(6, "Poncho Yellow", 150000))
    productos.push(new Producto(7, "Poncho Pink", 150000))
    productos.push(new Producto(8, "Sunglass Yellow & Green", 90000))
    productos.push(new Producto(9, "Sunglass Purple & Pink", 90000))
    productos.push(new Producto(10, "Chain Silver", 250000))
}
generadorAutomatico()

function crearCards() {
    productos.forEach(prod => {
        cuerpo.innerHTML += `<div class="col">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="card-title">${prod.nombre}</h5>
                                        <p class="card-text">Precio: $${prod.precio}</p>
                                        <button id="btn-agregar${prod.id}" class="btn btn-dark">Añadir al Carrito</button>
                                    </div>
                                </div>
                            </div>`
    })
    agregarFuncionalidad()
}

function agregarFuncionalidad() {
    productos.forEach(prod => {
        document.querySelector(`#btn-agregar${prod.id}`).addEventListener("click", () => {
            console.table(prod)
            agregarAlCarrito(prod)
        })
    })
}

function agregarAlCarrito(prod) {
    let existe = carrito.some((productoSome) => productoSome.id === prod.id)
    if (existe === false) {
        prod.cantidad = 1;
        carrito.push(prod)
    } else {
        let prodFind = carrito.find(productoFinal => productoFinal.id === prod.id)
        prodFind.cantidad++;
    }
    console.log(carrito)
    renderizarCarrito()
}

function restarCantidad(prod) {

    let prodFind = carrito.find(productoFinal => productoFinal.id === prod.id)
    if (prodFind.cantidad==1){
        borrarProducto()
    } else if (prodFind>1){
        prodFind.cantidad--;
    }
    renderizarCarrito()
}

function renderizarCarrito() {
    carritoSection.innerHTML = ""
    carrito.forEach(prod => {
        carritoSection.innerHTML += `
        <div class="col">
            <div class="card text-bg-dark h-100">
                <div class="card-body">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text">Cantidad: ${prod.cantidad}</p>
                    <p class="card-text">Precio: $${prod.precio * prod.cantidad}</p>
                    <button id="btn-borrar${prod.id}" class="btn btn-light">Quitar del Carrito</button>
                    <br></br>
                    <button id="btn-restar${prod.id}" class="btn btn-light">Disminuir Cantidad</button>
                </div>
            </div>
        </div>`
    })
    localStorage.setItem("carrito", JSON.stringify(carrito));
    borrarProducto()
}

function borrarProducto() {
    carrito.forEach((prod) => {
        document.querySelector(`#btn-borrar${prod.id}`).addEventListener("click", () => {
            carrito = carrito.filter((productoFilter) => productoFilter.id !== prod.id)
            renderizarCarrito()
        })
    })
}

crearCards()
renderizarCarrito()











