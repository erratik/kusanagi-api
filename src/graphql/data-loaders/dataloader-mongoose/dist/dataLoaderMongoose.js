"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mapDataToHash = data => data.reduce((acc, item) => {
  acc[item._id.toString()] = item; // eslint-disable-line no-underscore-dangle
  return acc;
}, {});

const loader = exports.loader = (model, ids) => {
  var data, hash;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return regeneratorRuntime.awrap(model.find({ _id: { $in: ids } }));

      case 2:
        data = _context.sent;
        hash = mapDataToHash(data);
        return _context.abrupt("return", ids.map(id => {
          if (hash[id.toString()]) {
            return hash[id.toString()];
          }
          return null;
        }));

      case 5:
      case "end":
        return _context.stop();
    }
  }, null, undefined);
};

exports.default = loader;
