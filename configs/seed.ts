import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { db } from "./pgConn";

const adminId = "08ffc49c-33d7-4585-ac10-0a3fb79960bb";
const emailList = new Set();
function generateUniqueEmail() {
  let email;
  do {
    email = faker.internet.email();
  } while (emailList.has(email));
  emailList.add(email);
  return email;
}

const phoneSet = new Set();
function generateUniquePHPhoneNumber() {
  let phone;
  do {
    const prefixes = [
      "917",
      "918",
      "919",
      "922",
      "923",
      "924",
      "925",
      "926",
      "927",
      "928",
      "929",
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = Math.floor(1000000 + Math.random() * 9000000).toString();
    phone = `0${prefix}${suffix}`;
  } while (phoneSet.has(phone));

  phoneSet.add(phone);
  return phone;
}

async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

//placeholder generator
function makePlaceholder(rowIndex: number, columnCount: number) {
  const start = rowIndex * columnCount + 1;
  return `(${Array.from(
    { length: columnCount },
    (_, i) => `$${start + i}`
  ).join(",")})`;
}

//seed
async function seedUsers() {
  const rowCounts = 100;
  const userColumnCounts = 8;
  const userValues = [];
  const userPlaceholder = [];

  const accountColumnCount = 5;
  const accountValues = [];
  const accountPlaceholder = [];

  const roleColumnCount = 3;
  const roleValues = [];
  const rolePlaceholder = [];

  const addressColumnCounts = 5;
  const addressValues = [];
  const addressPlaceholder = [];

  const emergencyContactColumnCount = 5;
  const emergencyContactValues = [];
  const emergencyContactPlaceholder = [];

  //users
  for (let i = 0; i < rowCounts; i++) {
    const firstName = faker.person.firstName().toLowerCase();
    const middleName = faker.person.middleName().toLowerCase();
    const lastName = faker.person.lastName().toLowerCase();
    const suffix = faker.person.suffix().toLowerCase();
    const dob = faker.date.birthdate();
    const sex = faker.person.sex().toLowerCase();
    const contactNo = generateUniquePHPhoneNumber();
    const createdBy = adminId;

    userValues.push(
      firstName,
      middleName,
      lastName,
      suffix,
      dob,
      sex,
      contactNo,
      createdBy
    );
    userPlaceholder.push(makePlaceholder(i, userColumnCounts));
  }

  try {
    await db.query("BEGIN"); // Start transaction

    const userQuery = `
        INSERT INTO auth.users (first_name, middle_name, last_name, suffix, dob, sex, contact_no, created_by)
        VALUES ${userPlaceholder.join(",")} RETURNING id
    `;
    const { rows } = await db.query(userQuery, userValues); //newly created user id

    const passwordPromises = [];
    for (let i = 0; i < rowCounts; i++) {
      passwordPromises.push(hashPassword("Tester123!"));
    }
    const hashedPasswords = await Promise.all(passwordPromises);

    //accounts
    for (let i = 0; i < rowCounts; i++) {
      const { id: userId } = rows[i];
      const email = generateUniqueEmail().toLowerCase();
      const password = hashedPasswords[i];
      const status = "active";
      const createdBy = adminId;

      accountValues.push(userId, email, password, status, createdBy);
      accountPlaceholder.push(makePlaceholder(i, accountColumnCount));
    }

    const accountQuery = `
        INSERT INTO auth.accounts (user_id, email, password_hash, status, created_by)
        VALUES ${accountPlaceholder.join(",")}
    `;

    await db.query(accountQuery, accountValues);

    //role
    for (let i = 0; i < rowCounts; i++) {
      const { id: userId } = rows[i];
      const roleId = 2;
      const createdBy = adminId;

      roleValues.push(userId, roleId, createdBy);
      rolePlaceholder.push(makePlaceholder(i, roleColumnCount));
    }

    const roleQuery = `
        INSERT INTO auth.user_roles (user_id, role_id, created_by)
        VALUES ${rolePlaceholder.join(",")}
    `;

    await db.query(roleQuery, roleValues);

    //address
    for (let i = 0; i < rowCounts; i++) {
      const { id: userId } = rows[i];
      const street = faker.location.street().toLowerCase();
      const brgy = faker.location.direction().toLowerCase();
      const city = faker.location.city().toLowerCase();
      const region = faker.location.state().toLowerCase();

      addressValues.push(userId, street, brgy, city, region);
      addressPlaceholder.push(makePlaceholder(i, addressColumnCounts));
    }

    const addressQuery = `
        INSERT INTO auth.addresses (user_id, street, brgy, city, region)
        VALUES ${addressPlaceholder.join(",")}
    `;

    await db.query(addressQuery, addressValues);

    //emergency contact
    for (let i = 0; i < rowCounts; i++) {
      const { id: userId } = rows[i];
      const firstName = faker.person.firstName().toLowerCase();
      const lastName = faker.person.lastName().toLowerCase();
      const contactNo = generateUniquePHPhoneNumber();
      const relationship = faker.helpers.arrayElement([
        "parent",
        "sibling",
        "spouse",
        "relative",
        "child",
        "other",
      ]);

      emergencyContactValues.push(
        userId,
        firstName,
        lastName,
        contactNo,
        relationship
      );
      emergencyContactPlaceholder.push(
        makePlaceholder(i, emergencyContactColumnCount)
      );
    }

    const emergencyContactQuery = `
        INSERT INTO auth.emergency_contacts (user_id, first_name, last_name, contact_no, relationship) 
        VALUES ${emergencyContactPlaceholder.join(",")}
    `;

    await db.query(emergencyContactQuery, emergencyContactValues);

    await db.query("COMMIT"); //save
  } catch (err) {
    await db.query("ROLLBACK"); //cancel
    console.error("Error seeding users, transaction rolled back.");
    console.error(err);
    throw new Error(`${err}`);
  }

  console.log(`Seeding complete - ${rowCounts} users and accounts inserted`);
}

seedUsers()
  .catch((err) => console.error("Seeding script failed:", err))
  .finally(() => {
    console.log("Closing database connection.");
    db.end();
  });
