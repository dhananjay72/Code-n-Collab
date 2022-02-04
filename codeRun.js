const router = require("express").Router();

router.post("/run", (req, res) => {
  let code = req.body.code;
  let input = req.body.input;
  let lang = req.body.lang;

  // compilation using paiza.io :

  var paiza_io = require("paiza-io");

  if (lang === "python" || lang === "javascript") {
    paiza_io("python", code, input, function (error, result) {
      console.log(result);
      if (error) {
        console.log(error);
        res.send(error);
        res.status(400).json(error);
      }
      res.send(result.stdout);
    });
  } else {
    paiza_io(lang, [code].join("\n"), input, function (error, result) {
      //   console.log(result);
      if (error) {
        res.send(error);
        res.status(400).json(error);
      }
      res.send(result.stdout);
    });
  }
  // paiza io end
});

module.exports = router;
