var domain = require('domain'),
d = domain.create();

console.log(d);

d.on('error', function(err) {
  console.error(err);
});
