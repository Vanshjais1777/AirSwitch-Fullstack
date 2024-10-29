const mongoose = require('mongoose');

const masterSchema = new mongoose.Schema({
    masterid: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
});

module.exports = mongoose.model('Master', masterSchema);