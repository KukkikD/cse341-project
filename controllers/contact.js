const { getDb } = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await getDb().collection('contact_w01').find().toArray();
  res.status(200).json(result);
};

const getSingle = async (req, res) => {
  const id = new ObjectId(String(req.params.id)); //Used to convert a MongoDB string that is an _id into an object that can be used with queries.
  const result = await getDb().collection('contact_w01').findOne({ _id: id });
  res.status(200).json(result);
};

const createContact = async (req, res, next) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const result = await getDb().collection('contact_w01').insertOne(contact);

    res.status(201).json({ message: 'Contact created!', contactId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact.' });
  }
};

const updateContact = async (req, res) => {
  try {
    const id = new ObjectId(String(req.params.id));

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await getDb().collection('contact_w01').updateOne({ _id: id },{ $set: contact });

    if (result.modifiedCount > 0) {
      res.status(200).json({message: 'Contact updated.'}); 
    } else {
      res.status(404).json({ message: 'Contact not found or no change made.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact.' });
  }
};

const deleteContact = async (req, res) => {
  const id = new ObjectId(String(req.params.id));
  const result = await getDb().collection('contact_w01').deleteOne({ _id: id });
  
  if (result.deletedCount > 0) {
    res.status(200).json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };