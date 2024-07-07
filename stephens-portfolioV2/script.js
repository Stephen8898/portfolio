// Implementing PDF.js for Resume
var url = "path/to/your/resume.pdf";

var pdfjsLib = window["pdfjs-dist/build/pdf"];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://mozilla.github.io/pdf.js/build/pdf.worker.js";

var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function (pdf) {
  console.log("PDF loaded");
  var pageNumber = 1;
  pdf.getPage(pageNumber).then(function (page) {
    console.log("Page loaded");
    var scale = 1.5;
    var viewport = page.getViewport({ scale: scale });
    var canvas = document.getElementById("pdf-canvas");
    var context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    var renderTask = page.render(renderContext);
    renderTask.promise.then(function () {
      console.log("Page rendered");
    });
  });
});
