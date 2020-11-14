const isLoggedIn = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        res.status(404).send("Tenes que loguearte")
    }
  }


  const isLoggedInAndAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(404).send("No se encontró :(");
    }
  }


module.exports = {
    isLoggedIn,
    isLoggedInAndAdmin
}