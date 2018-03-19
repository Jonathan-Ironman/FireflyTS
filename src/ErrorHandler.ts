﻿function alert(message: string, duration: number) {
  duration = duration || 1500;
  const elem = $("<div/>", {
    class: "alert popup",
    text: message
  }).appendTo("body");

  elem.delay(duration).fadeOut(300);
  setTimeout(() => {
    elem.remove();
  }, duration + 300);
}

const onError = window.onerror;
window.onerror = function errorHandler(
  errorMsg,
  url,
  lineNumber,
  column,
  errObj
) {
  alert(errorMsg, 4000);
  return onError(errorMsg, url, lineNumber, column, errObj);
};