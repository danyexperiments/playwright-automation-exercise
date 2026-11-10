import { faker } from '@faker-js/faker';

export interface TestUser {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  mobileNumber: string;
}

export function createTestUser(): TestUser {
  const uniqueId = faker.string.uuid();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    name: `${firstName} ${lastName}`,
    email: `test-${uniqueId}@example.com`,
    password: faker.internet.password(),
    firstName,
    lastName,
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    mobileNumber: faker.string.numeric(10),
  };
}
