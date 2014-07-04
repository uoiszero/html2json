# html2json -- Convert Html to Json

[![NPM](https://nodei.co/npm/node-html2json.png)](https://nodei.co/npm/html2json/)

Convert HTML to JSON library.

## Simple to use

```javascript
var toJson = require("node-html2json").toJson;

toJson(url [, mapping], callback)```

hQuery is designed to convert html to json object, JQuery like.

```javascript
var mapping = {
    title:"head title",
};

toJson("http://www.baidu.com", mapping, function(err, json){
    console.log(json);
});
```

## Attribute

`title:"head title"` get title element text by default. use `title:{selector:"head title", attr:"href"}` to get attributes.

## Foreach

use foreach like this. Point `.` mean current element.

```javascript
var mapping = {
    p: {
        selector: "p#nv a",
        foreach: {
            name: ".",
            url: {
                selector: ".",
                attr: "href"
            }
        }
};

toJson("http://www.baidu.com", mapping, function(err, json){
    console.log(json);
});
```

## Function

```javascript
var mapping = {
    title: function(elem){
        return elem.text();
    }
};

toJson("http://www.baidu.com", mapping, function(err, json){
    console.log(json);
});
```