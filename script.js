document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById('imageContainer');

    // Ruta de la carpeta de imágenes (todas las imágenes en la misma carpeta)
    const imagesFolder = 'imagenes/';

    // Rutas manuales de las imágenes (solo nombres secuenciales)
    const imageNames = [
        'imagen01.jpg',
        'imagen02.jpg',
        'imagen03.jpg',
        'imagen04.jpg',
        'imagen05.jpg',
        'imagen06.jpg'
    ];

    // Nombres personalizados para los proyectos
    const projectNames = [
        "Parásitos",
        "Beethoven",
        "Illume Ego",
        "Línea de Té",
        "Trayecto-ria",
        "Aplicación Red"
    ];

    // Rutas de las páginas de los proyectos
    const projectLinks = [
        "proyecto1.html",
        "proyecto2.html",
        "proyecto3.html",
        "proyecto4.html",
        "proyecto5.html",
        "proyecto6.html"
    ];

    // Función para mostrar imágenes en la galería
    function displayImages() {
        imageNames.forEach((imageName, index) => {
            const projectName = projectNames[index] || `Proyecto ${index + 1}`; // Usa el nombre del array o un nombre genérico si no hay más nombres
            const projectLink = projectLinks[index] || "#"; // Usa el enlace o un enlace vacío si no está definido
            const box = document.createElement('div');
            box.className = 'box';
            box.innerHTML = `
                <a href="${projectLink}">
                    <img src="${imagesFolder}${imageName}" alt="${projectName}">
                    <div class="overlay">
                        <h2>${projectName}</h2>
                    </div>
                </a>
            `;
            imageContainer.appendChild(box);
        });

        // Reorganizar las imágenes
        reorganizeImages();
    }

    // Función para reorganizar las imágenes
    function reorganizeImages() {
        const gallery = document.querySelector('.container');
        const boxes = Array.from(gallery.querySelectorAll('.box'));

        // Verificar el número de columnas basado en el CSS
        const computedStyle = getComputedStyle(gallery);
        let numColumns = parseInt(computedStyle.getPropertyValue('column-count'));

        // Si no se puede determinar el número de columnas, usar 3 por defecto
        if (isNaN(numColumns) || numColumns <= 0) {
            numColumns = 3;
        }

        // Array para las imágenes reordenadas
        let reorderedBoxes = [];

        // Reorganizar las cajas de imágenes por filas
        for (let i = 0; i < numColumns; i++) {
            for (let j = i; j < boxes.length; j += numColumns) {
                reorderedBoxes.push(boxes[j]);
            }
        }

        // Vaciamos la galería y volvemos a agregar las cajas de imágenes en el nuevo orden
        gallery.innerHTML = '';
        reorderedBoxes.forEach(box => {
            gallery.appendChild(box);
        });
    }

    // Llamar a la función para mostrar imágenes
    displayImages();
});
