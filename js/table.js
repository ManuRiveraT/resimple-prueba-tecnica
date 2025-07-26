// Variables para la paginación de la tabla
let currentPage = 1;
let rowsPerPage = 10;
let paginatedData = [];

function renderTable(data) {
    paginatedData = data;

    // Se selecciona la tabla y se limpia su contenido
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = paginatedData.slice(start, end);

    if (pageData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="text-center">No existen datos disponibles</td></tr>';
        return;
    }

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
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const container = document.getElementById('pagination');
    container.innerHTML = '';

    if(totalPages < 1 ) return;

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