
document.addEventListener('DOMContentLoaded', async () => {
    const combinedData = await loadData();
    // Calcular KPIs
    calculateKpis(combinedData);

    // Renderizar graficos
    renderCharts(combinedData);
})

function calculateKpis(data) {
    // Se selecciona el contenedor de KPIs y se limpia su contenido
    const kpiContent = document.getElementById("kpiContent");
    kpiContent.innerHTML = '';

    // KPI 1: Gastos por empresas
    const allCompanys = rawJsonData.EMPRESAS.map(c => c.NOMBRE_EMPRESA);
    const salaryByCompany = addSum(allCompanys , data);
    addKpiCard(salaryByCompany, "Gasto mensual por Empresa", "💰");

    // KPI 2: Trabajadores por empresa
    const employeesCompany = groupCount(allCompanys, data);
    addKpiCard(employeesCompany, "Trabajadores por empresa", "👥");

    // KPI 3: Gastos por áreas    
    const allAreas = rawJsonData.EMPRESAS.flatMap(c => c.AREAS.map(a => a.NOMBRE_AREA));
    const salaryByArea = addSum(allAreas , data);
    addKpiCard(salaryByArea, "Gasto mensual por Área", "💰");

    // KPI 4: Trabajadores por áreas
    const employeesArea = groupCount(allAreas, data);
    addKpiCard(employeesArea, "Trabajadores por Área", "👥");
}

// Funcion para sumar valores por grupo (De todas las empresas)
function addSum(allData, data) {
    // Se utiliza reduce para acumular los valores por grupo (acc = acumulador, item = elemento actual)
    return allData.reduce((acc, name) => {
        acc[name] = data
        .filter(d => d.company === name || d.area === name)
        .reduce((sum, d) => sum + d.salary, 0)
        return acc;
    }, {})
}

// Funcion para contar elementos por grupo
function groupCount(allData , data) {
    return allData.reduce((acc, name) => {
        acc[name] = data
        .filter(d => d.company === name || d.area === name)
        .length;
        return acc;
    }, {})
}

// Funcion para agregar una tarjeta de KPI
function addKpiCard(value, title, icon) {
    // Se seleccional el contenedor de KPIs
    const kpiContent = document.getElementById("kpiContent");

    // Se crea un container para la tarjeta
    const container = document.createElement("div");
    container.classList.add("col-md-3", "mb-3")

    // Creacion de las cartas con los KPIs
    const card = `
        <div class="card shadow-sm">
            <div class="card-body">
                <h5 class="card-title">${icon} ${title}</h5>
                <ul class="list-group list-group-flush mt-2">
                ${Object.entries(value).map(([key, val]) => `
                    <li class="list-group-item justify-content-between">
                    <span>${key}: </span>
                    <span>${val > 1000000 ? '$' + val.toLocaleString("es-CL") : (val === 0 ? 'Sin datos' : val)}</span>
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
    // Datos de las Empresas para graficar
    const allCompanys = rawJsonData.EMPRESAS.map(c => c.NOMBRE_EMPRESA);
    const salaryByCompany = addSum(allCompanys, data);    
    const companyLabels = Object.keys(salaryByCompany).filter(key => salaryByCompany[key] > 0);

    // Datos de las Areas para graficar
    const allAreas = rawJsonData.EMPRESAS.flatMap(c => c.AREAS.map(a => a.NOMBRE_AREA));
    const employeesByArea = groupCount(allAreas , data);
    const areaLabels = Object.keys(employeesByArea).filter(key => employeesByArea[key] > 0);

    // Destruir los graficos si existen
    if(chartSalaryCompany) chartSalaryCompany.destroy();
    if(chartEmployeesArea) chartEmployeesArea.destroy();

    // Obtener canva para posteriormente renderizar el grafico
    const ctxSalaryCompany = document.getElementById("graphSalaryCompany").getContext("2d");
    // Se renderiza el grafico con los respectivos atributos
    chartSalaryCompany = new Chart(ctxSalaryCompany, {
        type: "bar",
        data: {
            labels: companyLabels,
            datasets: [{
                label: "Gasto Mensual por Empresa",
                data: companyLabels.map(label => salaryByCompany[label]),
                backgroundColor: "#4e73df",
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Gasto Mensual por Empresa",
                }
            }
        }
    });

    const ctxEmployeesArea = document.getElementById("graphEmployeesArea").getContext("2d");
    chartEmployeesArea = new Chart(ctxEmployeesArea, {
        type: "doughnut",
        data: {
            labels: areaLabels,
            datasets: [{
                label: "Trabajadores",
                data: areaLabels.map(label => employeesByArea[label]),
                backgroundColor: ["#f6c23e", "#1cc88a", "#36b9cc", "#e74a3b", "#858796", "#5a5c69", "#4e73df", "#f8f9fc"],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Distribución de trabajadores por área",
                }
            },
            
        }
    });
}