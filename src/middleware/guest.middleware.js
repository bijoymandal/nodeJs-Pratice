// src/middleware/guest.middleware.js
export function guestMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    // Already logged in → redirect to dashboard
    return res.redirect("/dashboard");
  }
  next();
}
