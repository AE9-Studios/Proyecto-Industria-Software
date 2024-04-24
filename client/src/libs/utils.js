export const calculateColumnWidths = (data) => {
  let objectMaxLength = [];
  data.forEach((item) => {
    const values = Object.values(item);
    values.forEach((value, index) => {
      let length;
      if (typeof value === "number") {
        const formattedValue = value.toFixed(2);
        length = formattedValue.length;
      } else {
        length = value.toString().length;
      }
      objectMaxLength[index] = Math.max(objectMaxLength[index] || 0, length);
    });
  });
  return objectMaxLength.map((maxLength) => ({ width: maxLength }));
};
