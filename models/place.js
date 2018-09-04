const mongoose = require('mongoose');

var days = mongoose.Schema({
    day: { type: String, lowercase: true, default: '' },
    hours: { type: String, lowercase: true, default: '' }
});

var props = mongoose.Schema({
    description: { type: String, lowercase: true, default: '' },
    schedule: [days],
    food: { type: [String], lowercase: true, default: [] },
    cuisines: { type: [String], lowercase: true, default: [] },
    price: { type: String, default: '' },
    events: { type: [String], lowercase: true, default: [] },
    features: { type: [String], lowercase: true, default: [] }
});

var locations = mongoose.Schema({
    street: { type: String, lowercase: true, default: '' },
    barrio: { type: String, lowercase: true, default: '' },
    locality: { type: String, lowercase: true, default: '' },
    country: { type: String, lowercase: true, default: '' }
});

var review = mongoose.Schema({
    title: { type: String, lowercase: true, default: '' },
    review: { type: String, lowercase: true, default: '' },
    ranking: { type: Number, default: 0 }
});

var place = mongoose.Schema({
    name: { type: String, required: true, lowercase: true },
    img: { type: [String], defult: [] },
    url: { type: String, required: true },
    properties: props,
    location: locations,
    reviews: [review]
});

module.exports = mongoose.model('Lugares', place);