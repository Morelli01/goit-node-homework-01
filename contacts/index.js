const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const contactsPath = path.join(__dirname, '../db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContacts = contacts.filter((contact) => contact.id !== contactId);
  await writeContacts(removedContacts);
  return contacts.find((contact) => contact.id === contactId);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

async function updateContact(contactId, name, email, phone) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const updatedContacts = [...contacts.slice(0, index), { name, email, phone, id: contactId }, contacts.slice(index + 1)];
  await writeContacts(updatedContacts);
  return { name, email, phone, id: contactId };
}
module.exports = { listContacts, getContactById, addContact, removeContact, updateContact };