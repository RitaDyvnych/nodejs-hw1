const chalk = require('chalk')
const { Command } = require('commander')
const {listContacts, addContact, getContactById, removeContact} = require ('./contacts')

const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.table(contacts)
      break;

    case 'get':
      const getContact = await getContactById(id)
      if (getContact) { 
        console.log(chalk.green('Contact found'))
        console.log(getContact)
      }
      else {
        console.log(chalk.yellow
          ('Contact not found'))
      }
      break;

    case 'add':
      if (name && email && phone) {
        const newContact = await addContact(name, email, phone)
        console.log(chalk.green('Add new contact'))
        console.log(newContact)
      }
      else {
        console.log(chalk.red
          ('Incorrect data'))
      }
      break;

    case 'remove':
      const delContact = await removeContact(id)
      if (delContact !== -1) {
        console.log(chalk.green('Contact deleted'))
      }
      else {
        console.log(chalk.yellow('Contact not found'))
      }
      break;

    default:
      console.warn(chalk.red('Unknown action type!'))
  }
}

invokeAction(argv)