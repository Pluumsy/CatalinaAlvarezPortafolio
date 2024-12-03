document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.getElementById('imageContainer');

    // Ruta de la carpeta de imágenes
    const imagesFolder = 'imagenes/';

    // Nombres específicos para los proyectos
    const projectNames = [
        "Parásitos",
        "Beethoven",
        "IllumEgo",
        "Línea de té",
        "Ilustración"
        // Agrega más nombres si hay más proyectos
    ];

    // Encuentra todas las imágenes disponibles
    async function findTotalImages() {
        let totalImages = 0;
        for (let i = 1; ; i++) {
            const paddedNumber = String(i).padStart(2, '0');
            const imageName = `imagen${paddedNumber}.jpg`;
            const image = new Image();
            image.src = imagesFolder + imageName;

            try {
                await image.decode(); // Verifica si la imagen existe
                totalImages++;
            } catch {
                break; // Detén el bucle si no encuentra más imágenes
            }
        }
        return totalImages;
    }

    // Genera nombres de imágenes
    function generateImageNames(total) {
        return Array.from({ length: total }, (_, i) =>
            `imagen${String(i + 1).padStart(2, '0')}.jpg`
        );
    }

    // Muestra las imágenes en la galería
    async function displayImages() {
        const totalImages = await findTotalImages();
        const imageNames = generateImageNames(totalImages);

        imageNames.forEach((imageName, index) => {
            const box = document.createElement('div');
            box.className = 'box';

            const projectName = projectNames[index] || `Proyecto ${index + 1}`;

            box.innerHTML = `
                <img src="${imagesFolder}${imageName}" alt="${projectName}">
                <div class="overlay">
                    <h2>${projectName}</h2>
                </div>
            `;

            imageContainer.appendChild(box);
        });
    }

    // Inicializa la carga de imágenes
    displayImages();
});
