/* COMP229-W2020-MidTerm_Luke Nguyen_300744804_comp229midterm  */
let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
    Title: String,
    QuestionOne: String,
    
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);
