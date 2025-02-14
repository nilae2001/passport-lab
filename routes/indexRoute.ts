import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";


router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  if(req.user!.role === "admin") {
    res.redirect("/admin")
  } else {
    res.render("dashboard", {
      user: req.user,
    });
  }
});

router.get("/admin", ensureAuthenticated, (req, res) => {
  let adminMode;
  let keys;

  adminMode = true;

  const sessionStore = req.sessionStore as any;

  if (sessionStore) {
    sessionStore.all((err: any, sessions: { [key: string]: any }) => {
      if (err) {
        console.error("Error fetching sessions:", err);
        return res.status(500).send("Error fetching sessions.");
      }

      keys = Object.keys(sessions);

      res.render("adminDashboard", {
        user: req.user,
        adminMode: adminMode,
        sessionKeys: keys, 
      });
    });
  } 
});


router.post("/revoke/:sessionID", ensureAuthenticated, (req, res) => {
  
  const sessionID = req.params.sessionID;

  req.sessionStore.destroy(sessionID, (err: any) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error destroying session.");
    }

    res.redirect("/admin");
  });
});


export default router;
