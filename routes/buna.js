const express = require('express');
const router = express.Router();
const cp = require('child_process');
const path = require('path');
const uuidV1 = require('uuid/v1');
const fs = require('fs');

router.post('/', function (req, res, next) {
  let fileName = uuidV1();
  fileName = fileName + ".js";
  let filePath = path.join(__dirname, "../buna-js", fileName);
  let bunaData = req.body.code;
  let data = "'use strict'; import Buna from './lib/buna'; let buna = new Buna(); buna.runWeb([" + "'" + bunaData + "'" + "]);";
  fs.writeFile(filePath, data, { overwrite: false }, function (err) {
    if (err) throw err;
    let babelNode = path.join(__dirname, "../node_modules/.bin/babel-node");
    let command = babelNode + " " + filePath;
    let workerProcess = cp.exec(command, {
    });

    let list = [];
    let listErr = [];

    workerProcess.stdout.on('data', function (data) {
      let finalDates = data.split(String.fromCharCode(10));
      finalDates.map((finalDate) => {
        if(finalDate){
          list.push(finalDate);
        }
      })
    });

    workerProcess.stdout.on('end', function () {
      // fs.unlinkSync(filePath);
      res.send({ code: 1, stdout: list })
    })

    workerProcess.stderr.on('data', function (data) {
      // res.send({ code: 1, stdout: listErr });
    });

    // workerProcess.stderr.on('end', function(){
    //   fs.unlinkSync(filePath);
    //   res.send({code:1,stdout:listErr});
    // })
  });
});

module.exports = router;
