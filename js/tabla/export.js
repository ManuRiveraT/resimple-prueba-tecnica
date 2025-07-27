document.getElementById("exportButton").addEventListener("click", () => {
    // Se obtienen los datos de todas las paginas creadas
    const exportData = paginatedData.slice((currentPage - 1 )* rowsPerPage, currentPage * rowsPerPage);
    // Se crea una hoja de calculo con XLSX a través del JSON
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    // Se crea el workbook para posteriormente insertarle la hoja de calculo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    // Se crea el archivo y se descarga
    XLSX.writeFile(workbook, "resimple-datos.xlsx");
})