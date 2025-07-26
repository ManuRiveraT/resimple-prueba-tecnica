// Seccion de filtros

// Escuchar cambios en los filtros (Selects e Inputs)
document.getElementById("filterCompany").addEventListener("change", applyFilters);
document.getElementById("filterArea").addEventListener("change", applyFilters);
document.getElementById("filterNameOrRut").addEventListener("input", applyFilters);
document.getElementById("minSalary").addEventListener("input", applyFilters);
document.getElementById("maxSalary").addEventListener("input", applyFilters);

function applyFilters() {
    // Se obtiene el texto del input y las opciones seleccionada de los selects
    const text = document.getElementById("filterNameOrRut").value.toLowerCase().trim();
    const selectedCompanies = getSelectedOptions(document.getElementById("filterCompany"));
    const selectedAreas = getSelectedOptions(document.getElementById("filterArea"));

    // Se obtienen el min y max de sueldo
    const minSalary = parseFloat(document.getElementById("minSalary").value);
    const maxSalary = parseFloat(document.getElementById("maxSalary").value);

    let filteredData = originalData;

    // Filtro por texto (nombre o rut)
    if (text !== "") {
        filteredData = filteredData.filter(data =>
            data.NOMBRE_TRABAJADOR.toLowerCase().includes(text) ||
            data.RUT_TRABAJADOR.toLowerCase().includes(text)
        )
    }

    // Filtro por Empresa (multiple)
    if (selectedCompanies.length > 0) {
        filteredData = filteredData.filter(data =>
            selectedCompanies.includes(data.company)
        );
    }

    // Filtro por Área (multiple)
    if (selectedAreas.length > 0) {
        filteredData = filteredData.filter(data =>
            selectedAreas.includes(data.area)
        )
    }

    // Filtro por sueldo (rango)}
    filteredData = filteredData.filter(data => {
        const salary = parseFloat(data.salary);

        if (!isNaN(minSalary) && salary < minSalary) return false;
        if (!isNaN(maxSalary) && salary > maxSalary) return false;

        return true;
    })

    renderTable(filteredData);
}

function filterData(data) {
    // Se rescatan los elementos del DOM para los filtros
    const selectCompany = document.getElementById('filterCompany');
    const selectArea = document.getElementById('filterArea');

    // Se guardan los valores sin repetir de las empresas y areas
    const uniqueCompanies = [...new Set(data.EMPRESAS.map(item => item.NOMBRE_EMPRESA))].sort();
    const uniqueAreas = [...new Set(data.EMPRESAS.flatMap(item => item.AREAS.map(area => area.NOMBRE_AREA)))].sort();

    // Se rellenan las empresas en su select
    uniqueCompanies.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        selectCompany.appendChild(option);
    })

    // Se rellenan las areas en su select
    uniqueAreas.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        selectArea.appendChild(option);
    })
}
