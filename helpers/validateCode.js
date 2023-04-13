//obtener la diferencia horaria de dos fechas
const getDiffHours = (date1, date2) => {
  const diff = Math.abs(date1 - date2);
  const diffHours = Math.ceil(diff / (1000 * 60 * 60));
  return diffHours;
}

module.exports = {
  getDiffHours,
};
