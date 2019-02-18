// https://davidwalsh.name/query-string-javascript
/* eslint no-useless-escape: "off" */
export const getParameter = (name, s) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(s);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
