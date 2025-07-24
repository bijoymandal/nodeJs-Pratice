export const setLastVisit = (req, res, next) => {
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString(); // Store last visit in session
  }
  res.cookie(
    "lastVisit",
    new Date().toISOString(),
    { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true },
    next()
  ); // Set cookie for last visit
};
