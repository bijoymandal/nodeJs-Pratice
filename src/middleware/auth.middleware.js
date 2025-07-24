export const authMiddleware = (req, res, next) => {
  if (req.session.userEmail) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.redirect("/user/login"); // User is not authenticated, redirect to login page
  }
};
