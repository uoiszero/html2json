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
  _.each(mapping, (val, key) => {
    let elem = mapping[key];
    if (typeof elem === "undefined") {
      throw new Error("undefined is not a valid mapping key.")
    }
    let type = typeof elem;
    switch (type) {
      case "string":
        json[key] = current === null
          ? ($(elem).text() || "").trim()
          : text(current, elem);
        break;
      case "function":
        json[key] = current === null
          ? elem($("html"))
          : elem(current);
        break;
      case "object":
        let selector = elem.selector;
        if (typeof selector === "undefined") {
          throw new Error("undefined is not a valid selector.")
        }
        let attr = elem.attr || "text";
        if (typeof attr === "string") {
          switch (attr) {
            case "text":
              json[key] = current === null
                ? ($(selector).text() || "").trim()
                : text(current, selector);
              break;
            case "value":
              json[key] = current === null
                ? ($(selector).val() || "").trim()
                : value(current, selector);
              break;
            default:
              json[key] = current === null
                ? ($(selector).attr(attr) || "").trim()
                : attribute(current, selector, attr);
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
          json[key] = _.map($(selector), elem => {
            let obj = {};
            getElement($, obj, foreach, $(elem));
            return obj;
          });
        }
    }
  })
}

function text($, selector) {
  return selector === "."
    ? ($.text() || "").trim()
    : ($.find(selector).text() || "").trim()
}

function attribute($, selector, attr) {
  return selector === "."
    ? ($.attr(attr) || "").trim()
    : ($.find(selector).attr(attr) || "").trim()
}

function value($, selector) {
  return selector === "."
    ? ($.val() || "").trim()
    : ($.find(selector).val() || "").trim()
}

exports.toJson = toJson;