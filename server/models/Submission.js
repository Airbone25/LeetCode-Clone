const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    problemId: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    result: {
        type: Array,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Submission', SubmissionSchema);

