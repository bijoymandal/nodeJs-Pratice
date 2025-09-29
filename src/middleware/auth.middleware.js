export const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    return res.redirect("/"); // User is not authenticated, redirect to login page
  }
};
