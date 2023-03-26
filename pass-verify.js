const bcrypt = require('bcrypt');

async function verifyPassword () {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$.a8Jaa7jgzgSU/GwzeNxn.IjfpMD/hbewR0nfTuPE.Q/InIVpG.YK';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
