/**
 * Created by UO on 2014/4/29 19:22.
 */

var toJson = require("../lib/html2json").toJson;

var mapping = {
    title:"head title"
};

toJson("http://www.baidu.com/", mapping, function(err, json){
    console.log(json);
});