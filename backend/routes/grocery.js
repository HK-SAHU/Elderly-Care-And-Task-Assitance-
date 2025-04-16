const express = require('express');
const router = express.Router();
const groceryController = require('../controllers/groceryController');
const auth = require('../middleware/auth');

// @route   POST /api/grocery
// @desc    Create a new grocery list
// @access  Private
router.post('/', auth, groceryController.createGroceryList);

// @route   GET /api/grocery
// @desc    Get all grocery lists for current user
// @access  Private
router.get('/', auth, groceryController.getGroceryLists);

// @route   GET /api/grocery/:id
// @desc    Get grocery list by ID
// @access  Private
router.get('/:id', auth, groceryController.getGroceryListById);

// @route   PUT /api/grocery/:id
// @desc    Update grocery list
// @access  Private
router.put('/:id', auth, groceryController.updateGroceryList);

// @route   DELETE /api/grocery/:id
// @desc    Delete grocery list
// @access  Private
router.delete('/:id', auth, groceryController.deleteGroceryList);

module.exports = router;