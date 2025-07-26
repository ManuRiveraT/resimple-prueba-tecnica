// Funcion para obtener las opciones seleccionadas de los selects
function getSelectedOptions(selectedElement) {
    return [...selectedElement.selectedOptions].map(option => option.value);
}
