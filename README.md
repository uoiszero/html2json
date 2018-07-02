# html2json -- Convert Html to Json

[![NPM](https://nodei.co/npm/node-html2json.png)](https://nodei.co/npm/html2json/)

Convert HTML to JSON library.

## Simple to use

```javascript
let toJson = require("node-html2json");

toJson(html, mapping)
```

hQuery is designed to convert html to json object, JQuery like.

```javascript
let mapping = {
    title:"head title",
};

let json = toJson(mapping);
```

## Attribute

`title:"head title"` get title element text by default. use `title:{selector:"head title", attr:"href"}` to get attributes.

## Foreach

use foreach like this. Point `.` mean current element.

```javascript
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
}

```

## Function

object value could be a function with an parameter "element", which is an cheerio object. 

```javascript
const mapping = {
  title: function (element) {
    let text = element.find("head>title").text().trim();
    return text.split("_")[0];
  }
};
```