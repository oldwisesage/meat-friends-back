const fs = require('fs');
const faker = require('faker');

let data = [];

for (let index = 0; index < 100; index++) {
  let user = {
    name: `${faker.name.firstName()}`,
    lastName: `${faker.name.lastName()}`,
    email: `${faker.internet.email()}`,
    password: `${faker.internet.password()}`,
    createdAt: `${faker.date.past(3)}`,
  };

  let userData = JSON.stringify(user, null, 2);

  data.push(userData);
}

fs.writeFile('seed.ts', data, (err) => {
  if (err) throw err;
  console.log('Data written to file');
});

console.log('This is after the write call');
q