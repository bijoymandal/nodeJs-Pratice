export default class DashboardController {
  getDashboard(req, res) {
    res.render("pages/dashboard", {
      title: "Dashboard",
      activePage: "dashboard",
    });
  }
}
