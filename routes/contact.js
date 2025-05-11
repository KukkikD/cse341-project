const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

// GET all contacts
router.get('/', contactController.getAll);

// GET a single contact by ID
router.get('/:id', contactController.getSingle);

// POST a new contact
router.post('/', contactController.createContact);

// PUT update a contact
router.put('/:id', contactController.updateContact);

// DELETE a contact
router.delete('/:id', contactController.deleteContact);

module.exports = router; 