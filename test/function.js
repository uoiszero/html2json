const toJson = require("../index")
  , fs = require("fs");

const html = fs.readFileSync("./test.html");


const mapping = {
  results: {
    selector: ".result",
    foreach: {
      title: ".c-title>a",
      media: function (element) {
        let text = element.find(".c-author").text().trim();
        return text.split(/[\n  ]+/)[0];
      },
      id: {
        selector: ".",
        attr: "id"
      }
    }
  }
};

let json = toJson(html, mapping);

console.log(json);