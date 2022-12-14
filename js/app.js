const cart = document.querySelector('#carrito');
const product = document.querySelector('#list-cart tbody');
const vaciar = document.querySelector('#vaciar')
const listProduct = document.querySelector('#list-product');
let proCart = [];


loadevents();
function loadevents(){
    listProduct.addEventListener('click', addProduct);

}

function addProduct(e) {
   e.preventDefault();

   if(e.target.classList.contains('add-cart')) {
    const selected = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    read(selected);
    }else{
        console.log('ño uwu')
    }
}

function read(producto){
    const info = {
        imagen: producto.querySelector('img').src,
        title: producto.querySelector('h5').textContent,
        price: producto.querySelector('.price').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    /** Evita duplicados */
    const exist = proCart.some(producto => producto.id === info.id)
    if(exist){
        const elementscart = proCart.map(producto => {
            if (producto.id === info.id) {
                producto.cantidad++;
                return producto; //retorna producto actualizado
            } else {
                return producto; //retorna producto no duplicado
            }
        })
        proCart =[...elementscart];
    }else{
        proCart = [...proCart, info];
        
    }
    write();
}

function write() {
    clearHtml();
    proCart.forEach( producto =>{
        const row = document.createElement('tr');
        row.innerHTML= `
            <td>
            <img src="${producto.imagen}" style="width: 60px;"/>
            </td>
            <td>
            ${producto.title}
            </td>
            <td>
            <input type="number" placeholder="${producto.cantidad}" min="1" class="incan">
            </td>
            <td>
            ${producto.price}
            </td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </td>
        `;
        product.appendChild(row);
    });
}

function clearHtml() {
    while(product.firstChild){
        product.removeChild(product.firstChild);
    }
}