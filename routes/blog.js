var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:permalink', function(req, res, next) {
  var blogpost = req.app.locals.db.blogPost.findOne({
    where: {permalink:req.params.permalink}
  }).then(response => {
    blogpost = response;
    return response;
  });
  var promArray = Promise.all([blogpost]).then(values=>{
    res.render('blogpost', {
      post: blogpost,
    });
  });
});

module.exports = router;
