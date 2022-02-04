const router = require("express").Router();

router.post("/run", (req, res) => {
  let code = req.body.code;
  let input = req.body.input;
  let lang = req.body.lang;

  console.log(lang);

  // compilation using paiza.io :

  var paiza_io = require("paiza-io");

  if (lang === "javascript") {
    paiza_io("javascript", [code].join("\n"), "", function (error, result) {
      // if (error) throw error;
      console.log("c++ result:");
      console.log(result.stdout); //=> Hello, C++ World!
      res.send(result.stdout);
    });
  } else if (lang === "python") {
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
