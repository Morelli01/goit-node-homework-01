const contacts = require('./contacts/index');
const { program } = require('commander');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list': {
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      return;
    }
    case 'get':
      const contact = await contacts.getContactById(id);
      contact === undefined ? console.log(null) : console.log(contact);
      break;
    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;
    case 'remove':
      const removedContact = await contacts.removeContact(id);
      if (removedContact === undefined) {
        console.log(null);
      }
      console.log(removedContact);
      break;

    case 'update':
      const updatedContact = await contacts.updateContact(id, name, email, phone);
      console.log(updatedContact);
      break;
    default:
      console.warn('unknown action ' + action);
  }
}

program
  .option('-a, --action <type>', 'choose action to invoke')
  .option('-i, --id <type>', 'contact id')
  .option('-n, --name <type>', 'contact name')
  .option('-e, --email <type>', 'contact email')
  .option('-p, --phone <type>', 'contact phone');

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);