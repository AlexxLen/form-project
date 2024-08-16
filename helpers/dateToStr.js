function dateToStr(d) {
  return (
    d.getFullYear() +
    '-' +
    padDatePart(1 + d.getMonth()) +
    '-' +
    padDatePart(d.getDate()) +
    'T' +
    padDatePart(d.getHours()) +
    ':' +
    padDatePart(d.getMinutes()) +
    ':' +
    padDatePart(d.getSeconds()) +
    '+03:00'
  );
}
function padDatePart(part) {
  return part >= 10 ? part.toString() : '0' + part.toString();
}

export { dateToStr };
