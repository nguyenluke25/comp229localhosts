/* COMP229 Group Project - The Localhosts*/
let mongoose = require('mongoose');

//create a model class for the questions
let SurveyAnswer = mongoose.Schema({
  Answer: [{type: String}]
})

// create a model class for the survey
let Survey = mongoose.Schema({
    Title: String,
    QuestionList: [{type: String}],
    NumberOfQuestions: Number,
    Answers: [{type: SurveyAnswer}]
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);
