document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById('imageContainer');

    // Ruta de la carpeta de imágenes
    const imagesFolder = 'imagenes/';

    // Nombres personalizados para los proyectos
    const projectNames = [
         "Parásitos",
        "Beethoven",
        "Illume Ego",
        "Línea de Té",
        "Ilustración",
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
});

