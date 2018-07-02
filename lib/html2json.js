const _ = require("lodash")
  , cheerio = require("cheerio");

function toJson(html, mapping) {
  if (mapping === undefined) {
    throw new Error("no data mapping.");
  }
  const $ = cheerio.load(html);
  let json = {};
  getElement($, json, mapping, null);
  return json;
}

function getElement($, json, mapping, current) {
  _.each(_.keys(mapping), function (key) {
    let elem = mapping[key];
    if (typeof elem === "undefined") {
      throw new Error("undefined is not a valid mapping key.")
    }
    if (typeof elem === "string") {
      json[key] = current === null ?
        $(elem).text().trim() :
        (elem === "." ?
          current.text().trim() :
          current.find(elem).text().trim());
    } else if (typeof elem === "function") {
      json[key] = current === null ?
        elem($("html")) :
        elem(current);
    } else if (typeof elem === "object") {
      let selector = elem.selector;
      if (typeof selector === "undefined") {
        throw new Error("undefined is not a valid selector.")
      }
      let attr = elem.attr || "text";
      if (typeof attr === "string") {
        if (attr === "text") {
          json[key] = current === null ?
            $(selector).text().trim() :
            (selector === "." ?
              $(current).text().trim() :
              $(current).find(selector).text().trim());
        } else if (attr === "value") {
          json[key] = current === null ?
            $(selector).val().trim() :
            (selector === "." ?
              $(current).text().trim() :
              $(current).find(selector).text().trim());
        } else {
          json[key] = current === null ?
            $(selector).attr(attr) :
            (selector === "." ?
              $(current).attr(attr) :
              $(current).find(selector).attr(attr));
        }
      }
      let method = elem.method || "";
      if (typeof method === "string" && method !== "") {
        json[key] = {
          text: json[key],
          method: method
        }
      }
      let foreach = elem.foreach;
      if (typeof foreach === "object") {
        json[key] = _.map($(selector), function (elem) {
          let obj = {};
          getElement($, obj, foreach, $(elem));
          return obj;
        });
      }
    }
  })
}

exports.toJson = toJson;