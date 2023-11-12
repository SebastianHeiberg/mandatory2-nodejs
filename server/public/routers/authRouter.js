import { Router } from "express";
import { getStoredPassword } from "../../databases/crud.js";
import comparePasswords from "../encryption/decrypt.js";

const router = Router();


router.get("/signout", (req, res) => {
    req.session.destroy()
    res.status(200).send({data: "signout complete"})
})

router.post("/login", async (req, res) => {
  
    const password = req.body.password;
    const email = req.body.email;

    const foundPassword = await getStoredPassword(email)
    const matchingPasswords = await comparePasswords(password, foundPassword)
    
    if (matchingPasswords){
     res.status(200).send({ data : {message : "You are signed in", user: req.body.email, session: req.sessionID}});
    } else {
     res.status(400).send({ data: "Wrong email or password" });
    }

});


router.post('/checkloginstatus', (req, res) => {
 
    if (req.body.sessionId === req.session.id) { 
      res.status(200).send({ signedIn: true});
    } else {
      res.status(400).send({ signedIn: false });
    }
  });



export default router;
