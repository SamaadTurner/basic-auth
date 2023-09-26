const handle500Error = (req,res) => {
  res.status(500).send('500 - Server Error');
};

module.exports = handle500Error;