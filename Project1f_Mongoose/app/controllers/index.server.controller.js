exports.render = function(req, res){
   // res.send('Hello World');
   
   if (req.session.lastVisit){
      console.log('last visit was ' +
                  req.session.lastVisit);
      //if the user has been here before...log their last visit
   }
   
   req.session.lastVisit = new Date();
   //put the date of the current visit into the session.lastVisit
   
   res.render('index', {
    title: 'Hello World'
   });
};