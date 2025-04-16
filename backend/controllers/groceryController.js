const GroceryList = require('../models/Grocery');

// @route   POST /api/grocery
// @desc    Create a new grocery list
// @access  Private
exports.createGroceryList = async (req, res) => {
  const { name, items } = req.body;

  try {
    const newGroceryList = new GroceryList({
      user: req.user.id,
      name,
      items: items || []
    });

    const groceryList = await newGroceryList.save();
    res.status(201).json(groceryList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/grocery
// @desc    Get all grocery lists for current user
// @access  Private
exports.getGroceryLists = async (req, res) => {
  try {
    const groceryLists = await GroceryList.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(groceryLists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/grocery/:id
// @desc    Get grocery list by ID
// @access  Private
exports.getGroceryListById = async (req, res) => {
  try {
    const groceryList = await GroceryList.findById(req.params.id);
    
    if (!groceryList) {
      return res.status(404).json({ msg: 'Grocery list not found' });
    }

    // Check user owns the grocery list
    if (groceryList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(groceryList);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Grocery list not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/grocery/:id
// @desc    Update grocery list
// @access  Private
exports.updateGroceryList = async (req, res) => {
  const { name, items } = req.body;

  try {
    let groceryList = await GroceryList.findById(req.params.id);
    
    if (!groceryList) {
      return res.status(404).json({ msg: 'Grocery list not found' });
    }

    // Check user owns the grocery list
    if (groceryList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update fields
    if (name) groceryList.name = name;
    if (items) groceryList.items = items;
    groceryList.updatedAt = Date.now();

    await groceryList.save();

    res.json(groceryList);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Grocery list not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/grocery/:id
// @desc    Delete grocery list
// @access  Private
exports.deleteGroceryList = async (req, res) => {
  try {
    const groceryList = await GroceryList.findById(req.params.id);
    
    if (!groceryList) {
      return res.status(404).json({ msg: 'Grocery list not found' });
    }

    // Check user owns the grocery list
    if (groceryList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await groceryList.remove();

    res.json({ msg: 'Grocery list removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Grocery list not found' });
    }
    res.status(500).send('Server error');
  }
};