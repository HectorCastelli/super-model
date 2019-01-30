var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:permalink', function (req, res, next) {
  var game = req.app.locals.db.game.findOne({
    where: {
      permalink: req.params.permalink
    },
    include: [{
      model: req.app.locals.db.blogPost,
      as: 'Posts'
    },{
      model: req.app.locals.db.gameCredits,
      as: 'Credits',
      include: [{
        model: req.app.locals.db.member,
        as: 'Member'
      }]
    }],
    order: [
      ['Posts', 'id', 'DESC'],
      ['Credits', 'id', 'ASC']
    ]
  }).then(response => {
    game = response;
    return response;
  });
  var promArray = Promise.all([game]).then(values => {
    res.render('game', {
      game: game,
      posts: game.Posts,
      credits: game.Credits
    });
  });
});

module.exports = router;