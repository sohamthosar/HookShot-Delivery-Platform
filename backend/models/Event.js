const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    type : String,
    data : Object,
    idempotencyKey : {
        type : String,
        required : true
    },
    endpointIds: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Endpoint'
    }]
}, {
    timestamps : true
});

eventSchema.index(
    { userId : 1, idempotencyKey : 1},
    { unique : true }
);

module.exports = mongoose.model('Event', eventSchema);