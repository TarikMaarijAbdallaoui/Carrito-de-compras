// Varibles

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
        // Cuando agregas un curso
        listaCursos.addEventListener('click', agregarCurso);

        // Eliminar un curso
        carrito.addEventListener('click', eliminarCurso);

        // Vaciar carrito
        vaciarCarritoBtn.addEventListener('click', () => {
                articulosCarrito = [];
                limpiarHTML();
        });
};

// Funciones
function agregarCurso(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        }
};

// Elimar cursos del carrito
function eliminarCurso(e){
        if(e.target.classList.contains('borrar-curso')){
                const cursoId = e.target.getAttribute('data-id');

                // Eliminar del arreglo de articulosCarrito por el data-id
                articulosCarrito = articulosCarrito.filter( (curso) => curso.id !== cursoId);

                carritoHTML();
        }
};

// Leer el contenido del HTML al que le dimos click y extraer la información del curso
function leerDatosCurso(curso){

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }    

    // Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( (curso) => curso.id === infoCurso.id);
    if (existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( (curso) => {
                if (curso.id === infoCurso.id){
                        curso.cantidad++;
                        return curso;
                } else {
                        return curso;
                }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    carritoHTML();
};

// Muestra el carrito en el HTML
function carritoHTML(){

        // Limpiar el HTML para que se muestre el ultimo resumen del carrito
             limpiarHTML();
        // Recorre el carrito y genera el HTML
        articulosCarrito.forEach( (curso) => {
                const { imagen, titulo, precio, cantidad, id} = curso;
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>
                   <img src = "${imagen}" width ="100">
                </td>
                <td> ${titulo} </td>
                <td> ${precio} </td>
                <td> ${cantidad} </td>
                <td>
                   <a href = "#" class = "borrar-curso" data-id="${id}"> x </a>
                </td>
                `;

        // Agregar el HTML del carrito en el tbody   
        contenedorCarrito.appendChild(row);  
        })
};

// Eliminar cursos del tbody
function limpiarHTML(){
        contenedorCarrito.innerHTML = '';  //la forma lenta de limpiar html, mejor usar el while
        /*while(contenedorCarrito.firstChild){
                contenedorCarrito.remove(contenedorCarrito.firstChild)
        }*/
}