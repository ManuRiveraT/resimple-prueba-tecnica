let originalData = [];
let rawJsonData = [];
// Seccion de carga de datos
async function loadData() {
    try {
        // Cargar Excel
        const excelData = await readExcelFile('assets/origen-datos-junior.xlsx');

        // Cargar JSON
        const jsonData = await fetch('assets/dicionario-de-datos.json').then(data => data.json());
        rawJsonData = jsonData;
        // Combinar datos
        const combinedData = combineData(excelData, jsonData);

        // Copia de los datos combinados para poder acceder de forma global a los datos.
        // También sirve para poder manipularlos y filtrarlos
        originalData = combineData(excelData, jsonData);

        return combinedData
    } catch (error) {
        console.error("❌ Error al cargar datos: ", error);
    }
}

// Funcion de lectura del archivo Excel 
async function readExcelFile(filePath) {

    // Se carga el archivo Excel usando fetch
    const response = await fetch(filePath);

    // Se utiliza el arrayBuffer() para convertir la respuesta en un ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    // Se lee el ArrayBuffer con XLSX 
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Se obtiene el nombre de la primera hoja y accede a ella
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Se convierte la hoja en un array de objetos
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Se retorna el array de objetos
    return data;
}

// Funcion para combinar los datos (Excel y JSON)
function combineData(excelData, jsonData) {
    return excelData.map(item => {
        // Se busca la empresa en el JSON usando ID_EMPRESA
        const company = jsonData.EMPRESAS.find(c => c.ID_EMPRESA === item.ID_EMPRESA);
        // Se busca el area en el JSON usando la empresa encontrada y el ID_AREA
        const area = company?.AREAS.find(a => a.ID_AREA === item.ID_AREA);

        // Se retorna un objeto con los datos combinados (En caso de no encontrar empresa o area, se asigna 'Desconocido')
        // Solo se asignan los campos necesarios, las empresas y areas que no se encuentren en el Excel no se incluyen
        return {
            company: company ? company.NOMBRE_EMPRESA : 'Desconocido',
            area: area ? area.NOMBRE_AREA : 'Desconocido',
            salary: area ? area.SUELDO : 'Desconocido',
            ...item
        }
    })
}