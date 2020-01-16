/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/job.js.erb");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/job.js.erb":
/*!************************!*\
  !*** ./src/job.js.erb ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * CallBacks:\n * __________________________________________________________________________________\n * All the callback function should have one parameter:\n * function(result){};\n * And the result parameter will contain an array of objects that look like JOB.\n * result = [{Format: the barcode type, Value: the value of the barcode}];\n * __________________________________________________________________________________\n *\n * You can use either the set functions or just access the properties directly to set callback or\n * other properties. Just always remember to call Init() before starting to decode something never mess\n * around with the SupportedFormats property.\n *\n */\nJOB = {\n\tConfig : {\n\t\t// Set to false if the decoder should look for one barcode and then stop. Increases performance.\n\t\tMultiple : true,\n\n\t\t// The formats that the decoder will look for.\n\t\tDecodeFormats : [\"Code128\",\"Code93\",\"Code39\",\"EAN-13\", \"2Of5\", \"Inter2Of5\", \"Codabar\"],\n\n\t\t// ForceUnique just must makes sure that the callback function isn't repeatedly called\n\t\t// with the same barcode. Especially in the case of a video stream.\n\t\tForceUnique: true,\n\n\t\t// Set to true if information about the localization should be recieved from the worker.\n\t\tLocalizationFeedback: false,\n\n\t\t// Set to true if checking orientation of the image should be skipped.\n\t\t// Checking orientation takes a bit of time for larger images, so if\n\t\t// you are sure that the image orientation is 1 you should skip it.\n\t\tSkipOrientation : false\n\t},\n\tSupportedFormats : [\"Code128\",\"Code93\",\"Code39\",\"EAN-13\", \"2Of5\", \"Inter2Of5\", \"Codabar\"],// Don't touch.\n\tScanCanvas : null, // Don't touch the canvas either.\n\tScanContext : null,\n\tSquashCanvas : document.createElement(\"canvas\"),\n\tImageCallback : null, // Callback for the decoding of an image.\n\tStreamCallback : null, // Callback for the decoding of a video.\n\tLocalizationCallback : null, // Callback for localization.\n\tStream : null, // The actual video.\n\tDecodeStreamActive : false, // Will be set to false when StopStreamDecode() is called.\n\tDecoded : [], // Used to enfore the ForceUnique property.\n\tDecoderWorker : new Worker(\"<%= asset_path('decoder-worker.js.erb') %>\"),\n\tOrientationCallback : null,\n\t// Always call the Init().\n\tInit : function() {\n\t\tJOB.ScanCanvas = JOB.FixCanvas(document.createElement(\"canvas\"));\n\t\tJOB.ScanCanvas.width = 640;\n\t\tJOB.ScanCanvas.height = 480;\n\t\tJOB.ScanContext = JOB.ScanCanvas.getContext(\"2d\");\n\t\tvar script  = document.createElement('script');\n  \t\tscript.src  = \"<%= asset_path('exif.js.erb') %>\";\n \t\tscript.type = 'text/javascript';\n\t\tdocument.getElementsByTagName('head').item(0).appendChild(script);\n\t},\n\n\t// Value should be true or false.\n\tSetRotationSkip : function(value) {\n\t\tJOB.Config.SkipOrientation = value;\n\t},\n\t// Sets the callback function for the image decoding.\n\tSetImageCallback : function(callBack) {\n\t\tJOB.ImageCallback = callBack;\n\t},\n\n\t// Sets the callback function for the video decoding.\n\tSetStreamCallback : function(callBack) {\n\t\tJOB.StreamCallback = callBack;\n\t},\n\n\t// Sets callback for localization, the callback function should take one argument.\n\t// This will be an array with objects with format.\n\t// {x, y, width, height}\n\t// This represents a localization rectangle.\n\t// The rectangle comes from a 320, 240 area i.e the search canvas.\n\tSetLocalizationCallback : function(callBack) {\n\t\tJOB.LocalizationCallback = callBack;\n\t\tJOB.Config.LocalizationFeedback = true;\n\t},\n\n\t// Set to true if LocalizationCallback is set and you would like to\n\t// receive the feedback or false if\n\tSwitchLocalizationFeedback : function(bool) {\n\t\tJOB.Config.LocalizationFeedback = bool;\n\t},\n\n\t// Switches for changing the Multiple property.\n\tDecodeSingleBarcode : function() {\n\t\tJOB.Config.Multiple = false;\n\t},\n\tDecodeMultiple : function() {\n\t\tJOB.Config.Multiple = true;\n\t},\n\n\t// Sets the formats to decode, formats should be an array of a subset of the supported formats.\n\tSetDecodeFormats : function(formats) {\n\t\tJOB.Config.DecodeFormats = [];\n\t\tfor(var i = 0; i < formats.length; i++) {\n\t\t\tif(JOB.SupportedFormats.indexOf(formats[i]) != -1) {\n\t\t\t\tJOB.Config.DecodeFormats.push(formats[i]);\n\t\t\t}\n\t\t}\n\t\tif(JOB.Config.DecodeFormats.length == 0) {\n\t\t\tJOB.Config.DecodeFormats = JOB.SupportedFormats.slice();\n\t\t}\n\t},\n\n\t// Removes a list of formats from the formats to decode.\n\tSkipFormats : function(formats) {\n\t\tfor(var i = 0; i < formats.length; i++) {\n\t\t\tvar index = JOB.Config.DecodeFormats.indexOf(formats[i]);\n\t\t\tif(index >= 0) {\n\t\t\t\tJOB.Config.DecodeFormats.splice(index,1);\n\t\t\t}\n\t\t}\n\t},\n\n\t// Adds a list of formats to the formats to decode.\n\tAddFormats : function(formats) {\n\t\tfor(var i = 0; i < formats.length; i++) {\n\t\t\tif(JOB.SupportedFormats.indexOf(formats[i]) != -1) {\n\t\t\t\tif(JOB.Config.DecodeFormats.indexOf(formats[i]) == -1) {\n\t\t\t\t\tJOB.Config.DecodeFormats.push(formats[i]);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\t// The callback function for image decoding used internally by JOB.\n\tJOBImageCallback : function(e) {\n\t\tif(e.data.success == \"localization\") {\n\t\t\tif(JOB.Config.LocalizationFeedback) {\n\t\t\t\tJOB.LocalizationCallback(e.data.result);\n\t\t\t}\n\t\t\treturn;\n\t\t}\n\t\tif(e.data.success == \"orientationData\") {\n\t\t\tJOB.OrientationCallback(e.data.result);\n\t\t\treturn;\n\t\t}\n\t\tvar filteredData = [];\n\t\tfor(var i = 0; i < e.data.result.length; i++) {\n\t\t\tif(JOB.Decoded.indexOf(e.data.result[i].Value) == -1 || JOB.Config.ForceUnique == false) {\n\t\t\t\tfilteredData.push(e.data.result[i]);\n\t\t\t\tif(JOB.Config.ForceUnique) JOB.Decoded.push(e.data.result[i].Value);\n\t\t\t}\n\t\t}\n\t\tJOB.ImageCallback(filteredData);\n\t\tJOB.Decoded = [];\n\t},\n\n\t// The callback function for stream decoding used internally by JOB.\n\tJOBStreamCallback : function(e) {\n\t\tif(e.data.success == \"localization\") {\n\t\t\tif(JOB.Config.LocalizationFeedback) {\n\t\t\t\tJOB.LocalizationCallback(e.data.result);\n\t\t\t}\n\t\t\treturn;\n\t\t}\n\t\tif(e.data.success && JOB.DecodeStreamActive) {\n\t\t\tvar filteredData = [];\n\t\t\tfor(var i = 0; i < e.data.result.length; i++) {\n\t\t\t\tif(JOB.Decoded.indexOf(e.data.result[i].Value) == -1 || JOB.ForceUnique == false) {\n\t\t\t\t\tfilteredData.push(e.data.result[i]);\n\t\t\t\t\tif(JOB.ForceUnique) JOB.Decoded.push(e.data.result[i].Value);\n\t\t\t\t}\n\t\t\t}\n\t\t\tif(filteredData.length > 0) {\n\t\t\t\tJOB.StreamCallback(filteredData);\n\t\t\t}\n\t\t}\n\t\tif(JOB.DecodeStreamActive) {\n\t\t\tJOB.ScanContext.drawImage(JOB.Stream,0,0,JOB.ScanCanvas.width,JOB.ScanCanvas.height);\n\t\t\tJOB.DecoderWorker.postMessage({\n\t\t\t\tscan : JOB.ScanContext.getImageData(0,0,JOB.ScanCanvas.width,JOB.ScanCanvas.height).data,\n\t\t\t\tscanWidth : JOB.ScanCanvas.width,\n\t\t\t\tscanHeight : JOB.ScanCanvas.height,\n\t\t\t\tmultiple : JOB.Config.Multiple,\n\t\t\t\tdecodeFormats : JOB.Config.DecodeFormats,\n\t\t\t\tcmd : \"normal\",\n\t\t\t\trotation : 1,\n\t\t\t});\n\n\t\t}\n\t\tif(!JOB.DecodeStreamActive) {\n\t\t\tJOB.Decoded = [];\n\t\t}\n\t},\n\n\t// The image decoding function, image is a data source for an image or an image element.\n\tDecodeImage : function(image) {\n\t\tif(image instanceof Image || image instanceof HTMLImageElement)\n\t\t{\n\t\t\timage.exifdata = false;\n\t\t\tif(image.complete) {\n\t\t\t\tif(JOB.Config.SkipOrientation) {\n\t\t\t\t\tJOB.JOBDecodeImage(image,1,\"\");\n\t\t\t\t} else {\n\t\t\t\t\tEXIF.getData(image, function(exifImage) {\n\t\t\t\t\t\tvar orientation = EXIF.getTag(exifImage,\"Orientation\");\n\t\t\t\t\t\tvar sceneType = EXIF.getTag(exifImage,\"SceneCaptureType\");\n\t\t\t\t\t\tif(typeof orientation != 'number') orientation = 1;\n\t\t\t\t\t\tJOB.JOBDecodeImage(exifImage,orientation,sceneType);\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tvar img = new Image();\n\t\t\t\timg.onload = function() {\n\t\t\t\t\tif(JOB.Config.SkipOrientation) {\n\t\t\t\t\t\tJOB.JOBDecodeImage(img,1,\"\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tEXIF.getData(this, function(exifImage) {\n\t\t\t\t\t\t\tvar orientation = EXIF.getTag(exifImage,\"Orientation\");\n\t\t\t\t\t\t\tvar sceneType = EXIF.getTag(exifImage,\"SceneCaptureType\");\n\t\t\t\t\t\t\tif(typeof orientation != 'number') orientation = 1;\n\t\t\t\t\t\t\tJOB.JOBDecodeImage(exifImage,orientation,sceneType);\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t\timg.src = image.src;\n\t\t\t}\n\t\t} else {\n\t\t\tvar img = new Image();\n\t\t\timg.onload = function() {\n\t\t\t\tif(JOB.Config.SkipOrientation) {\n\t\t\t\t\tJOB.JOBDecodeImage(img,1,\"\");\n\t\t\t\t} else {\n\t\t\t\t\tEXIF.getData(this, function(exifImage) {\n\t\t\t\t\t\tvar orientation = EXIF.getTag(exifImage,\"Orientation\");\n\t\t\t\t\t\tvar sceneType = EXIF.getTag(exifImage,\"SceneCaptureType\");\n\t\t\t\t\t\tif(typeof orientation != 'number') orientation = 1;\n\t\t\t\t\t\tJOB.JOBDecodeImage(exifImage,orientation,sceneType);\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t};\n\t\t\timg.src = image;\n\t\t}\n\t},\n\n\t// Starts the decoding of a stream, the stream is a video not a blob i.e it's an element.\n\tDecodeStream : function(stream) {\n\t\tJOB.Stream = stream;\n\t\tJOB.DecodeStreamActive = true;\n\t\tJOB.DecoderWorker.onmessage = JOB.JOBStreamCallback;\n\t\tJOB.ScanContext.drawImage(stream,0,0,JOB.ScanCanvas.width,JOB.ScanCanvas.height);\n\t\tJOB.DecoderWorker.postMessage({\n\t\t\tscan : JOB.ScanContext.getImageData(0,0,JOB.ScanCanvas.width,JOB.ScanCanvas.height).data,\n\t\t\tscanWidth : JOB.ScanCanvas.width,\n\t\t\tscanHeight : JOB.ScanCanvas.height,\n\t\t\tmultiple : JOB.Config.Multiple,\n\t\t\tdecodeFormats : JOB.Config.DecodeFormats,\n\t\t\tcmd : \"normal\",\n\t\t\trotation : 1,\n\t\t});\n\t},\n\n\t// Stops the decoding of a stream.\n\tStopStreamDecode : function() {\n\t\tJOB.DecodeStreamActive = false;\n\t\tJOB.Decoded = [];\n\t},\n\n\tJOBDecodeImage : function (image,orientation,sceneCaptureType) {\n\t\tif(orientation == 8 || orientation == 6) {\n\t\t\tif(sceneCaptureType == \"Landscape\" && image.width > image.height) {\n\t\t\t\torientation = 1;\n\t\t\t\tJOB.ScanCanvas.width = 640;\n\t\t\t\tJOB.ScanCanvas.height = 480;\n\t\t\t} else {\n\t\t\t\tJOB.ScanCanvas.width = 480;\n\t\t\t\tJOB.ScanCanvas.height = 640;\n\t\t\t}\n\t\t} else {\n\t\t\tJOB.ScanCanvas.width = 640;\n\t\t\tJOB.ScanCanvas.height = 480;\n\t\t}\n\t\tJOB.DecoderWorker.onmessage = JOB.JOBImageCallback;\n\t\tJOB.ScanContext.drawImage(image,0,0,JOB.ScanCanvas.width,JOB.ScanCanvas.height);\n\t\tJOB.Orientation = orientation;\n\t\tJOB.DecoderWorker.postMessage({\n\t\t\tscan : JOB.ScanContext.getImageData(0,0,JOB.ScanCanvas.width,JOB.ScanCanvas.height).data,\n\t\t\tscanWidth : JOB.ScanCanvas.width,\n\t\t\tscanHeight : JOB.ScanCanvas.height,\n\t\t\tmultiple : JOB.Config.Multiple,\n\t\t\tdecodeFormats : JOB.Config.DecodeFormats,\n\t\t\tcmd : \"normal\",\n\t\t\trotation : orientation,\n\t\t\tpostOrientation : JOB.PostOrientation\n\t\t});\n\t},\n\n\tDetectVerticalSquash : function (img) {\n    \tvar ih = img.naturalHeight;\n    \tvar canvas = JOB.SquashCanvas;\n    \tcanvas.width = 1;\n    \tcanvas.height = ih;\n    \tvar ctx = canvas.getContext('2d');\n    \tctx.drawImage(img, 0, 0);\n    \ttry {\n        \tvar data = ctx.getImageData(0, 0, 1, ih).data;\n    \t} catch (err) {\n        \tconsole.log(\"Cannot check verticalSquash: CORS?\");\n        \treturn 1;\n    \t}\n    \tvar sy = 0;\n    \tvar ey = ih;\n    \tvar py = ih;\n    \twhile (py > sy) {\n        \tvar alpha = data[(py - 1) * 4 + 3];\n        \tif (alpha === 0) {\n        \t    ey = py;\n        \t} else {\n            \tsy = py;\n        \t}\n        \tpy = (ey + sy) >> 1;\n    \t}\n    \tvar ratio = (py / ih);\n    \treturn (ratio===0)?1:ratio;\n\t},\n\n\tFixCanvas : function (canvas)\n\t{\n    \tvar ctx = canvas.getContext('2d');\n    \tvar drawImage = ctx.drawImage;\n    \tctx.drawImage = function(img, sx, sy, sw, sh, dx, dy, dw, dh)\n    \t{\n        \tvar vertSquashRatio = 1;\n        \tif (!!img && img.nodeName == 'IMG')\n        \t{\n            \tvertSquashRatio = JOB.DetectVerticalSquash(img);\n            \tsw || (sw = img.naturalWidth);\n            \tsh || (sh = img.naturalHeight);\n        \t}\n        \tif (arguments.length == 9)\n            \tdrawImage.call(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);\n        \telse if (typeof sw != 'undefined')\n            \tdrawImage.call(ctx, img, sx, sy, sw, sh / vertSquashRatio);\n        \telse\n            \tdrawImage.call(ctx, img, sx, sy);\n    \t};\n    \treturn canvas;\n\t}\n};\n\n\n//# sourceURL=webpack:///./src/job.js.erb?");

/***/ })

/******/ });