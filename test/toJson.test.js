const toJson = require("../index"),
  path = require("path"),
  fs = require("fs"),
  should = require("should");

const html = fs.readFileSync(path.join(__dirname, "test.html"));

const mapping = {
  title: "head>title",
  results: {
    selector: ".result",
    foreach: {
      title: ".c-title>a",
      url: {
        selector: ".c-title>a",
        attr: "href"
      },
      id: {
        selector: ".",
        attr: "id"
      },
      media: function (element) {
        let text = element.find(".c-author").text().trim();
        return text.split(/[\n  ]+/)[0];
      },
    }
  }
};

let json = toJson(html, mapping);
describe("html to json test", () => {

  it("empty mapping test", () => {
    let title = toJson(html);
    should(title).be.an.Object()
      .hasOwnProperty("title", "百度新闻搜索_乌龙");
  })

  it("single element text", () => {
    should(json).be.a.Object()
      .hasOwnProperty("title", "百度新闻搜索_乌龙");
  })

  it("foreach test", () => {
    should(json).have.ownProperty("results")
      .be.an.Array()
      .not.be.empty()
      .matchEach(item => {
        return should(item).have.properties(["title", "url", "id"]);
      });
  })


})