const info = (...params) => {
  console.log("info:",...params);
};

const error = (...params) => {
  console.log("error:",...params);
};

module.exports = {
  info,
  error,
};
