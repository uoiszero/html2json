const toJson = require("../index")
  , fs = require("fs");

const html = fs.readFileSync("./test.html");

const mapping = {
    results: {
        selector: ".result",
        foreach: {
            title: ".c-title>a",
            url: {
                selector: ".c-title>a",
                attr: "href"
            }
        }
    }
};

let json = toJson(html, mapping);

console.log(json);