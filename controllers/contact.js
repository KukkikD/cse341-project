const { getDb } = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await getDb().collection('contacts').find().toArray();
  res.status(200).json(result);
};

const getSingle = async (req, res) => {
  const id = new ObjectId(String(req.params.id)); //Used to convert a MongoDB string that is an _id into an object that can be used with queries.
  const result = await getDb().collection('contacts').findOne({ _id: id });
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const newContact = req.body;
  const result = await getDb().collection('contacts').insertOne(newContact);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const id = new ObjectId(String(req.params.id));
  const updatedContact = req.body;
  const result = await getDb().collection('contacts').updateOne({ _id: id }, { $set: updatedContact });
  res.status(204).send();
};

const deleteContact = async (req, res) => {
  const id = new ObjectId(String(req.params.id));
  const result = await getDb().collection('contacts').deleteOne({ _id: id });
  res.status(204).send();
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };