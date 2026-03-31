module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
    //redirect to the original url
    req.session.redirectUrl=req.originalUrl;
    req.flash("error", "You must be logged in for this action.");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; 
    }
    next();
};