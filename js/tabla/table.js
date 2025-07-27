// Variables globales para la paginación de la tabla
let currentPage = 1;
let rowsPerPage = 10;
let paginatedData = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadData();

    // Renderizar tabla
    renderTable(combinedData);

    // Cargar filtros con datos del JSON (Para no exlcuir las empresas y areas que no se encuentren en el Excel).
    filterData(rawJsonData);
})

function renderTable(data) {
    paginatedData = data;

    // Se menciona la cantidad de datos encontrados al renderizar la tabla
    document.getElementById("resultCount").textContent =
    `${data.length} resultados encontrados`;

    // Se selecciona la tabla y se limpia su contenido
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    // Variables para el calculo de la cantidad de datos por pagina
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = paginatedData.slice(start, end);

    // En caso de no encontrar datos se muestra un mensaje y se termina la función
    if (pageData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="text-center">No existen datos disponibles</td></tr>';
        return;
    }

    // Estructura en la que se renderizan los datos
    pageData.forEach(employer => {
        const row = `
            <tr>
                <td>${employer.company}</td>
                <td>${employer.area}</td>
                <td>${employer.RUT_TRABAJADOR}</td>
                <td>${employer.NOMBRE_TRABAJADOR}</td>
                <td>${employer.EDAD}</td>
                <td>${employer.PROFESION ? employer.PROFESION : 'Sin especificar'}</td>
                <td>${employer.CARGO}</td>
                <td>${employer.salary.toLocaleString('es-CL')}</td>

            </tr>
        `;
        tableBody.innerHTML += row;
    });
    
    renderPagination(data.length);
}

function renderPagination(totalRows){
    // Se calcula el total de paginas 
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Se obtiene el elemento de la paginación 
    const container = document.getElementById('pagination');
    container.innerHTML = '';

    // Si el total de paginas es menor a 1 se sale de la función
    if(totalPages < 1 ) return;
    
    // Renderizacion de los botones para cambiar de pagina
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `btn btn-sm ${i === currentPage ? "btn-primary" : "btn-outline-primary"} me-1`;
        btn.addEventListener("click", () => {
            currentPage = i;
            renderTable(paginatedData);
        })
        container.appendChild(btn);
    }
}