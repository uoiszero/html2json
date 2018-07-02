/**
 * Created by UO on 2014/4/29 19:22.
 */

const toJson = require("../index")
  , fs = require("fs");

const html = fs.readFileSync("./test.html");
const mapping = {
  "page-title": "head>title"
};

let json = toJson(html, mapping);

console.log(json);