/* COMP229 Group Project - The Localhosts*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const surveys = require('../models/surveys');

// define the survey model
let survey = require('../models/surveys');

/* GET surveys List page. READ */
router.get('/', (req, res, next) => {
  // find all surveys in the surveys collection
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'Surveys',
        surveys: surveys
      });
    }
  });

});

//  GET the Survey Details page in order to add a new Survey
router.get('/add', (req, res, next) => {
    res.render('surveys/add', {title: 'Add Survey'})
});

// POST process the Survey Details page and create a new Survey
router.post('/add', (req, res, next) => {
  let newSurvey = survey({
    "Title": req.body.Title,
    "QuestionOne": {
      "Question": req.body.QuestionOne,
      "Answer": "none"
    },
    "QuestionTwo": {
      "Question": req.body.QuestionTwo,
      "Answer": "none"
    },
    "QuestionThree": {
      "Question": req.body.QuestionThree,
      "Answer": "none"
    },
  })
  survey.create(newSurvey, (err, Survey) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        //refresh the survey list
        res.redirect('/surveys');
    }
})
});

// GET the Survey details page in order to edit an existing Survey
router.get('/edit/:id', (req, res, next) => {

  let id = req.params.id; 

  survey.findById(id, (err, currentSurvey) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
        console.log(currentSurvey)
          res.render('surveys/edit', {title: 'Edit Survey Info', survey: currentSurvey})
      }
  })
});

// POST - process the questions passed from the survey and update the form
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id
  survey.findByIdAndUpdate(id, {$set:{
    "QuestionOne.Question": req.body.QuestionOne,
    "QuestionTwo.Question": req.body.QuestionTwo,
    "QuestionThree.Question": req.body.QuestionThree,
  }}, function (err, doc) {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    res.redirect('/surveys');

  });

});

// GET - process the survey deletion by survey id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  survey.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //refresh the contact list
          res.redirect('/surveys');
      }
  })
});

// GET - Take the survey by survey id
router.get('/view/:id', (req, res, next) => {

  let id = req.params.id; 

  survey.findById(id, (err, currentSurvey) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
        console.log(currentSurvey)
          res.render('surveys/views', {title: 'View Survey Info', survey: currentSurvey})
      }
  })
});

// POST - process the survey submission

router.post('/view/:id', (req, res, next) => {
  let id = req.params.id
  survey.findByIdAndUpdate(id, {$set:{
    "QuestionOne.Answer": req.body.AnswerOne,
    "QuestionTwo.Answer": req.body.AnswerTwo,
    "QuestionThree.Answer": req.body.AnswerThree,
  }}, function (err, doc) {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    res.redirect('/surveys');

  });

});

// GET - view the survey results
router.get('/results/:id', (req, res, next) => {

  let id = req.params.id; 

  survey.findById(id, (err, currentSurvey) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
        console.log(currentSurvey)
          res.render('surveys/results', {title: 'View Survey Results', survey: currentSurvey})
      }
  })
});

module.exports = router;
