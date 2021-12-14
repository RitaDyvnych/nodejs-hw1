const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const readContent = async () => {
  const contactsPath = await fs.readFile(path.join(__dirname, 'db', 'contacts.json'), 'utf8')
  const result = JSON.parse(contactsPath)
  return result
}

const listContacts = async() => {
  return readContent()
}

const getContactById = async(contactId) => {
  const contacts = await readContent()
  const res = contacts.find(contact => contact.id === contactId)
  return res
}

const removeContact = async(contactId) => {
  const contacts = await readContent()
  const deleteContact = contacts.findIndex(contact => contact.id === contactId)
  contacts.splice(deleteContact, 1)
  await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(contacts, null, 2))
  return deleteContact
}

const addContact = async(name, email, phone) => {
  const contacts = await readContent()
  const newContact = { name, email, phone, id: crypto.randomUUID() }
  contacts.push(newContact)
  await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = {listContacts, getContactById, removeContact, addContact}