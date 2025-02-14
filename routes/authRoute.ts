import express from "express";
import passport from 'passport';

import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {

  const messages = req.session.messages

  res.render("login", { messages });
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true
  })
);

router.get('/github',
  forwardAuthenticated,
  passport.authenticate('github', { scope: [ 'user:email' ] }));

  router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login', successRedirect: '/dashboard'}),
  
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  })


router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
