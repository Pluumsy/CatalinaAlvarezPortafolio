document.addEventListener("DOMContentLoaded", function() { 
    const imageContainer = document.getElementById('imageContainer');

    // Ruta de la carpeta de imágenes
    const imagesFolder = 'imagenes/';

    // Arreglo con los nombres específicos de cada proyecto
    const projectNames = [
        "Parásitos", // Nombre del Proyecto 1
        "Beethoven",                   // Nombre del Proyecto 2
        "IllumEgo",     // Nombre del Proyecto 3
        "Linea de té",         // Nombre del Proyecto 4
        "Ilustración", // Nombre del Proyecto 5
    
        // Agrega más nombres de proyectos si es necesario
    ];

    // Función para cargar imágenes secuencialmente hasta encontrar una que no exista
    async function findTotalImages() {
        let totalImages = 0;
        for (let i = 1; ; i++) {
            const paddedNumber = String(i).padStart(2, '0');
            const imageName = `imagen${paddedNumber}.jpg`;
            const image = new Image();
            image.src = imagesFolder + imageName;
            try {
                await image.decode();
                totalImages++;
            } catch (error) {
                break;
            }
        }
        return totalImages;
    }

    // Función para generar nombres de archivo
    function generateImageNames(total) {
        const names = [];
        for (let i = 1; i <= total; i++) {
            const paddedNumber = String(i).padStart(2, '0');
            names.push(`imagen${paddedNumber}.jpg`);
        }
        return names;
    }

    // Función para mostrar imágenes en la galería
    async function displayImages() {
        const totalImages = await findTotalImages();
        const imageNames = generateImageNames(totalImages);

        imageNames.forEach((imageName, index) => {
            const box = document.createElement('div');
            box.className = 'box';

            // Usa el nombre del proyecto si existe en el arreglo, de lo contrario usa "Proyecto X"
            const projectName = projectNames[index] || `Proyecto ${index + 1}`;

            box.innerHTML = `
                <img src="${imagesFolder}${imageName}" alt="${projectName}">
                <div class="overlay">
                    <h2>${projectName}</h2>
                </div>
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
