/* COMP229 Group Project - The Localhosts*/
let mongoose = require('mongoose');

//create a model class for the questions
let Question = mongoose.Schema({
  Question: String,
  Answer: String
})

// create a model class for the survey
let Survey = mongoose.Schema({
    Title: String,
    QuestionOne: Question,
    QuestionTwo: Question,
    QuestionThree: Question
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);
