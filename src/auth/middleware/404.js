'use strict';

const handle404Error = (req, res) => {
  res.status(404).send('404 - Not Found');

};

module.exports = handle404Error; 