# html2json -- Convert Html to Json

[![NPM](https://nodei.co/npm/node-html2json.png)](https://www.npmjs.com/package/node-html2json)

Convert HTML to JSON library.

## Simple to use

```javascript
let toJson = require("node-html2json");

//return a json object
toJson(html, mapping);
```

html2json is designed to convert html to json object, JQuery like.

```javascript
let mapping = {
  title: "head>title"
};

//json = {"title": "THE html title"}
let json = toJson(html, mapping);
```

## Attribute

get title element text by default.

```json
title: "head>title"
```

to get attribute 'href'.

```json
title: {
  selector: "some <a> Tag",
  attr: "href"
  }
```

## Foreach

use foreach like this.

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
};
```

## Function

object value could be a function with an parameter "element", which is an cheerio object.

```javascript
const mapping = {
  title: function(element) {
    let text = element
      .find("head>title")
      .text()
      .trim();
    return text.split("_")[0];
  }
};
```

## Current Element

use "." to represent the current element.

```javascript
const mapping = {
  results: {
    selector: ".result",
    foreach: {
      title: ".c-title>a",
      id: {
        selector: ".",
        attr: "id"
      }
    }
  }
};
```
