document.getElementById('exportButton').addEventListener('click', () => {
    const exportData = paginatedData.slice((currentPage - 1 )* rowsPerPage, currentPage * rowsPerPage);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    XLSX.writeFile(workbook, 'resimple-datos.xlsx');
})