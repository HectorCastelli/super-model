var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var blogposts = req.app.locals.db.blogPost.findAll({
    limit: 3,
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(response => {
    blogposts = response;
    return response;
  });
  var promArray = Promise.all([blogposts]).then(values=>{
    res.render('index', {
      posts: blogposts,
    });
  });
});

/* GET home page. */
router.get('/team', function(req, res, next) {
  var members = req.app.locals.db.member.findAll({
    where: {
      main: true,
      active: true
    }
  }).then(response => {
    members = response;
    return response;
  });
  var partners = req.app.locals.db.member.findAll({
    where: {
      main: false,
      active: true
    }
  }).then(response => {
    partners = response;
    return response;
  });
  
  var promArray = Promise.all([members, partners]).then(values=>{
    res.render('team', {
      members: members,
      partners: partners
    });
  });
});

router.get('/subscribe', function(req, res) {
  //console.log(req.query.email);
  req.app.locals.db.subscriber.findOrCreate({
    where: {email: req.query.email}
  });
  res.redirect('/');
});

module.exports = router;
