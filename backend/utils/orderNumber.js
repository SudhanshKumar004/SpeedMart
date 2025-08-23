const orderGenerator = () => {
  let number = Math.floor(Math.random() * 900000) + 1000;
  return number;
};

module.exports = orderGenerator;
