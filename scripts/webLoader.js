
/* CARGA DE HEADER Y FOOTER */
function cargarHeader() {
    fetch('/html/webElements.html')
        .then(response => response.text())
        .then(data => {
            // Crear un elemento temporal para contener la plantilla
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            // Obtener el contenido de la plantilla
            let plantilla = tempDiv.querySelector('#header_item').innerHTML;

            // Insertar la plantilla en el contenedor
            $('body').prepend(plantilla);

            plantilla = tempDiv.querySelector('#footer_item').innerHTML;

            // Insertar la plantilla en el contenedor
            $('body').append(plantilla);
        })
        .catch(error => console.error('Error al cargar la plantilla:', error));
}

cargarHeader();