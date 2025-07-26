function calculateKpis(data) {
    // Se selecciona el contenedor de KPIs y se limpia su contenido
    const kpiContent = document.getElementById("kpiContent");
    kpiContent.innerHTML = '';

    // KPI 1: Gastos por empresas
    const salaryByCompany = addSum(data, 'company', 'salary');
    addKpiCard(salaryByCompany, 'Gasto mensual por Empresa', '💰');

    // KPI 2: Trabajadores por empresa
    const employeesCompany = groupCount(data, 'company');
    addKpiCard(employeesCompany, 'Trabajadores por empresa', '👥');

    // KPI 3: Gastos por áreas
    const salaryByArea = addSum(data, 'area', 'salary');
    addKpiCard(salaryByArea, 'Gasto mensual por Área', '💰');

    // KPI 4: Trabajadores por áreas
    const employeesArea = groupCount(data, 'area');
    addKpiCard(employeesArea, 'Trabajadores por Área', '👥');
}

// Funcion para sumar valores por grupo
function addSum(data, groupBy, sumfield) {
    // Se utiliza reduce para acumular los valores por grupo (acc = acumulador, item = elemento actual)
    return data.reduce((acc, item) => {
        if (!acc[item[groupBy]]) acc[item[groupBy]] = 0;
        acc[item[groupBy]] += item[sumfield];
        return acc;
    }, {})
}

// Funcion para contar elementos por grupo
function groupCount(data, groupBy) {
    return data.reduce((acc, item) => {
        if (!acc[item[groupBy]]) acc[item[groupBy]] = 0;
        acc[item[groupBy]] += 1;
        return acc;
    }, {})
}

// Funcion para agregar una tarjeta de KPI
function addKpiCard(value, title, icon) {
    // Se seleccional el contenedor de KPIs
    const kpiContent = document.getElementById("kpiContent");

    // Se crea un container para la tarjeta
    const container = document.createElement("div");
    container.classList.add("col-6", "mb-3")

    const card = `
        <div class="card shadow-sm">
            <div class="card-body">
                <h5 class="card-title">${icon} ${title}</h5>
                <ul class="list-group list-group-flush mt-2">
                ${Object.entries(value).map(([key, val]) => `
                    <li class="list-group-item justify-content-between">
                    <span>${key}: </span>
                    <span>${typeof val === "number" ? (val > 1000000 ? '$' + val.toLocaleString("es-CL") : val) : val}</span>
                    </li>
                `).join("")}
                </ul>
            </div>
        </div>
    `

    container.innerHTML = card;
    kpiContent.appendChild(container);
}

// Variables para los graficos
let chartSalaryCompany = null;
let chartEmployeesArea = null;

// Graficos de KPIs
function renderCharts(data){
    const salaryByCompany = addSum(data, 'company', 'salary');
    const employeesByArea = groupCount(data, 'area');

    // Destruir los graficos si existen
    if(chartSalaryCompany) chartSalaryCompany.destroy();
    if(chartEmployeesArea) chartEmployeesArea.destroy();

    const ctxSalaryCompany = document.getElementById('graphSalaryCompany').getContext('2d');
    chartSalaryCompany = new Chart(ctxSalaryCompany, {
        type: 'bar',
        data: {
            labels: Object.keys(salaryByCompany),
            datasets: [{
                label: 'Gasto Mensual por Empresa',
                data: Object.values(salaryByCompany),
                backgroundColor: '#4e73df',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Gasto Mensual por Empresa',
                }
            }
        }
    });

    const ctxEmployeesArea = document.getElementById('graphEmployeesArea').getContext('2d');
    chartEmployeesArea = new Chart(ctxEmployeesArea, {
        type: 'doughnut',
        data: {
            labels: Object.keys(employeesByArea),
            datasets: [{
                label: 'Trabajadores',
                data: Object.values(employeesByArea),
                backgroundColor: ["#f6c23e", "#1cc88a", "#36b9cc", "#e74a3b", "#858796", "#5a5c69", "#4e73df", "#f8f9fc"],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribución de trabajadores por área',
                }
            },
            
        }
    });
}