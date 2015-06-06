var dns = require('dns');
console.log(process.argv[2]);
dns.resolve(process.argv[2], function(err, addresses) {
  if (!err) {
	  console.log(addresses);
  } else {
	  console.log(err);
  }
});
