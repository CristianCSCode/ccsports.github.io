document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById('menu');
    const hamburger = document.getElementById('hamburger'); // Asegúrate de tener el elemento de hamburguesa identificado correctamente

    hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    //-----Nuevo: Manejar todos los enlaces que apuntan a ultimas-noticias.html
    document.querySelectorAll('a[href^="NBA-ultimas-noticias.html#"], a[href^="champions-league-noticias.html#"], a[href^="Bundesliga-noticias.html#"], a[href^="LaLiga-noticias.html#"], a[href^="SerieA-noticias.html#"], a[href^="PremierLeague-noticias.html#"]').forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent default scrolling behavior
            event.preventDefault();
            // Obtener el identificador del artículo desde el hash del enlace
            const articleId = this.getAttribute('href').split('#')[1];
            // Guardar el identificador en localStorage
            localStorage.setItem('selectedArticleId', articleId);
            // Navegar a la nueva página
            window.location.href = this.getAttribute('href').split('#')[0];
        });
    });

    //-----Nuevo: Manejar la lógica de clonación y desplazamiento
    const selectedArticleId = localStorage.getItem('selectedArticleId');
    
    if (selectedArticleId) {
        const mainSection = document.querySelector('.titulares');
        const selectedArticle = document.getElementById(selectedArticleId);
        
        if (selectedArticle) {
            // Clonar el artículo seleccionado
            const clonedArticle = selectedArticle.cloneNode(true);
            
            // Eliminar el artículo seleccionado de su posición original
            selectedArticle.remove();
            
            // Insertar el artículo clonado al principio de la sección de titulares
            mainSection.insertBefore(clonedArticle, mainSection.firstChild);

            // Remove the stored article ID after processing
            localStorage.removeItem('selectedArticleId');

            // Desplazarse al tope de la página
            window.scrollTo(0, 0);
        }
    }

    // // ---- INICIO: Código para actualizar la tabla de posiciones de fútbol ----

    const izquierdaTable = document.getElementById('tabla-posiciones-izquierda');
    const derechaTable = document.getElementById('tabla-posiciones-derecha');
    
    if (izquierdaTable && derechaTable) {
        const tbodyIzquierda = izquierdaTable.querySelector('tbody');
        const tbodyDerecha = derechaTable.querySelector('tbody');
        
        // Combinar las filas de ambas tablas
        let rows = Array.from(tbodyIzquierda.querySelectorAll('tr'))
                        .concat(Array.from(tbodyDerecha.querySelectorAll('tr')));

        // Actualizar puntos y ordenar
        rows.forEach(row => {
            const PG = parseInt(row.cells[3].textContent); // Partidos ganados
            const PE = parseInt(row.cells[4].textContent); // Partidos empatados
            const PTS = (PG * 3) + (PE * 1); // 3 puntos por victoria, 1 por empate
            row.cells[6].textContent = PTS; // Actualizar la celda de PTS
        });

        // Ordenar las filas por puntos y luego por diferencia de gol
        rows.sort((rowA, rowB) => {
            const ptsA = parseInt(rowA.cells[6].textContent); // Puntos del equipo A
            const ptsB = parseInt(rowB.cells[6].textContent); // Puntos del equipo B
            const dgA = parseInt(rowA.cells[7].textContent); // Diferencia de gol del equipo A
            const dgB = parseInt(rowB.cells[7].textContent); // Diferencia de gol del equipo B
            
            // Comparar por puntos primero, luego por diferencia de gol en caso de empate
            if (ptsB === ptsA) {
                return dgB - dgA; // Ordenar por diferencia de gol si los puntos son iguales
            }

            return ptsB - ptsA; // Ordenar de mayor a menor
        });

        // Determinar el punto de corte para dividir las filas
        const totalRows = rows.length;
        const mitad = Math.ceil(totalRows / 2); // Redondea hacia arriba para incluir el equipo adicional en la tabla izquierda si es impar

        // Distribuir las filas entre las dos tablas
        tbodyIzquierda.innerHTML = ''; // Limpiar la tabla izquierda
        tbodyDerecha.innerHTML = ''; // Limpiar la tabla derecha

        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1; // Actualizar la posición

            if (index < mitad) {
                tbodyIzquierda.appendChild(row); // Agregar a la tabla izquierda
            } else {
                tbodyDerecha.appendChild(row); // Agregar a la tabla derecha
            }
        });
    }    
    // ---- FIN: Código para actualizar la tabla de posiciones de fútbol ----

    // ---- INICIO: Código para actualizar la tabla de posiciones de la NBA ----
    const nbaEsteTable = document.getElementById('tabla-posiciones-nba-este');
    if (nbaEsteTable) {
        const tbody = nbaEsteTable.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.forEach(row => {
            const PG = parseInt(row.cells[3].textContent); // Partidos ganados
            const PP = parseInt(row.cells[4].textContent); // Partidos perdidos
            const PTS = (PG * 2) + (PP * 1); // 2 puntos por victoria, 1 por derrota
            row.cells[5].textContent = PTS; // Actualizar la celda de PTS
        });

        rows.sort((rowA, rowB) => {
            const ptsA = parseInt(rowA.cells[5].textContent); // Puntos del equipo A
            const ptsB = parseInt(rowB.cells[5].textContent); // Puntos del equipo B
            return ptsB - ptsA; // Ordenar de mayor a menor
        });

        tbody.innerHTML = '';
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1; // Actualizar la posición
            tbody.appendChild(row); // Volver a agregar la fila ordenada
        });
    }
    // ---- FIN: Código para actualizar la tabla de posiciones de la Conferencia Este ----

    // ---- INICIO: Código para actualizar la tabla de posiciones de la Conferencia Oeste ----
    const nbaOesteTable = document.getElementById('tabla-posiciones-nba-oeste');
    if (nbaOesteTable) {
        const tbody = nbaOesteTable.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.forEach(row => {
            const PG = parseInt(row.cells[3].textContent); // Partidos ganados
            const PP = parseInt(row.cells[4].textContent); // Partidos perdidos
            const PTS = (PG * 2) + (PP * 1); // 2 puntos por victoria, 1 por derrota
            row.cells[5].textContent = PTS; // Actualizar la celda de PTS
        });

        rows.sort((rowA, rowB) => {
            const ptsA = parseInt(rowA.cells[5].textContent); // Puntos del equipo A
            const ptsB = parseInt(rowB.cells[5].textContent); // Puntos del equipo B
            return ptsB - ptsA; // Ordenar de mayor a menor
        });

        tbody.innerHTML = '';
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1; // Actualizar la posición
            tbody.appendChild(row); // Volver a agregar la fila ordenada
        });
    }
    // ---- FIN: Código para actualizar la tabla de posiciones de la NBA ----
});
