/**
 * Created by UO on 2014/4/30 15:44.
 */

var toJson = require("../lib/html2json").toJson;

var mapping = {
    p: {
        selector: "p#nv a",
        foreach: {
            name: function(elem){
                return elem.text().trim().replace(" ", "");
            },
            url: {
                selector: ".",
                attr: "href"
            }
        }
    }
};

toJson("http://www.baidu.com/", mapping, function(err, json){
    console.log(json);
});