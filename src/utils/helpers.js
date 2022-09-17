export function editDate(date) {

    const newDate = new Date(date);
    const dia = newDate.toLocaleDateString()

    return dia;
}