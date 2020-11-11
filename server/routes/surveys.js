/* COMP229-W2020-MidTerm_Luke Nguyen_300744804_comp229midterm  */
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

// POST process the Survey Details page and create a new Survey - CREATE
router.post('/add', (req, res, next) => {
  let newSurvey = survey({
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
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

// GET the Survey Details page in order to edit an existing Survey
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
          res.render('surveys/edit', {title: 'Edit Survey Info', survey: currentSurvey})
      }
  })
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id

  let updatedSurvey = {
    
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
}
survey.updateOne({_id: id}, updatedSurvey, (err) =>{
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

// GET - process the delete by user id
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


module.exports = router;
