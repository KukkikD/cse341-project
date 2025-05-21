//const { getDb } = require("../db/connection"); //mangoDB native 
const Contact = require("../models/contact"); // use mongoose instead of mangoDB native
//const ObjectId = require("mongodb").ObjectId;

// Get all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch {
    res.status(500).json({ error:  "Failed to fetch contacts." });
  }
};


// Get a single contact by ID
const getSingle = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch {
    res.status(400).json({ error: "Invalid contact ID format." });
  }
};


// Create New contact
const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact created!", contactId: contact._id });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err.message }); // Bad Request
    } else {
      res.status(500).json({ error: "Failed to create contact." });
    }
  }
};


// Update contact by ID
const updateContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!result) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact updated." });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Failed to update contact." });
    }
  }
};


// Delete Contact by ID
const deleteContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Contact not found" });
    res.status(204).send();
  } catch {
    res.status(400).json({ error: "Invalid contact ID format." });
  }
};


module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
