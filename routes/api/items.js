const express = require ('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    get all items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 }) //negative -1 gives you decending order
    .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create a POST
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});


module.exports = router;