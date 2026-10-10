var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var endpointSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },

    url: {
        type: String,
        required: true,
        trim: true 
    },

    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true, 
    background : true
});

module.exports = mongoose.model('Endpoint', endpointSchema);
