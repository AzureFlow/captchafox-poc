import {readFileSync} from "fs";
import {fileURLToPath} from "url";
import {randomItem} from "./utils.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const gpus = readFileSync(__dirname + "/../resources/gpus.txt", "utf8").replaceAll("\r\n", "\n").split("\n");


/**
 * await window.__cf_wapi()
 * @param {string} userAgent
 * @param {{brands: {brand: string, version: string}[], mobile: boolean, platform: string}} userAgentData
 * @param {URL} pageUrl
 * @returns {Promise<Object<string, unknown>>}
 */
async function generateFingerprint({
									   userAgent,
									   userAgentData,
									   pageUrl,
								   }) {
	const gpu = randomItem(gpus).split("~");
	const webglVendorUnmasked = gpu[0];
	const webglRendererUnmasked = gpu[1];
	const webglVendor = "WebKit";
	const webglRenderer = "WebKit WebGL";
	const webglVersion = "WebGL 1.0 (OpenGL ES 2.0 Chromium)";

	const funcs = [
		// CF0100
		function wut() {
			let zero = 0;
			return zero > 1;
		},

		// CF0101
		function isDarkMode() {
			// if(typeof window.matchMedia != "function") {
			//     return false;
			// }
			//
			// const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
			// return prefersDarkScheme.matches !== undefined && !prefersDarkScheme.matches;

			return false;
		},

		// CF0102
		function stackCheck() {
			return {
				depth: 4165,
				msg: "Maximum call stack size exceeded",
				name: "RangeError",
				length: 969,
			};
		},

		// CF0103
		function widthCheck() {
			// return window.matchMedia("(min-width: " + (window.innerWidth - 1) + "px)").matches;
			return true;
		},

		// CF0104
		function processCheck() {
			// try {
			//     return typeof process != "undefined" || typeof window.process == "object";
			// } catch(err) {
			//     return !1;
			// }

			return false;
		},

		// CF0105
		function() {
			return false;
		},

		// CF0106
		function memoryCheck() {
			// return navigator.deviceMemory !== undefined && navigator.deviceMemory;
			return 8;
		},

		// CF0107
		function cpuCheck() {
			// return navigator.oscpu !== undefined && navigator.oscpu;
			return false;
		},

		// CF0108
		function hardwareConcurrency() {
			// try {
			//     const concurrency = navigator.hardwareConcurrency;
			//     if(typeof concurrency == "string") {
			//         const concurrencyNumber = parseInt(concurrency);
			//         if(isNaN(concurrencyNumber)) {
			//             return 1;
			//         } else {
			//             return concurrencyNumber;
			//         }
			//     }
			//
			//     return concurrency;
			// } catch(err) {
			//     return false;
			// }

			return 6;
		},

		// CF0109
		function motionPermission() {
			// return typeof DeviceMotionEvent != "undefined" && typeof DeviceMotionEvent.requestPermission == "function";

			return false;
		},

		// CF0110
		function notificationsPermission() {
			// return new Promise((resolve) => {
			//     if(navigator && navigator.permissions && navigator.permissions.query) {
			//         navigator.permissions.query({
			//             name: "notifications"
			//         }).then(x => {
			//             resolve({
			//                 state: x.state,
			//                 permission: Notification.permission
			//             });
			//         }).catch(() => {
			//             resolve({
			//                 state: "prompt",
			//                 permission: "default"
			//             });
			//         });
			//     } else {
			//         resolve({
			//             state: "prompt",
			//             permission: "default"
			//         });
			//     }
			// });

			return {
				state: "prompt",
				permission: "default",
			};
		},

		// CF0111
		function languages() {
			// if(navigator.languages) {
			//     return navigator.languages;
			// } else {
			//     return [];
			// }

			return ["en-US"];
		},

		// CF0112
		function unsupportedSharedArrayBuffer() {
			// Shared memory and high-resolution timers were effectively disabled at the start of 2018 in light of Spectre.
			// In 2020, a new, secure approach has been standardized to re-enable shared memory.
			//
			// To use shared memory your document must be in a secure context and cross-origin isolated.
			// You can use the Window.crossOriginIsolated and WorkerGlobalScope.crossOriginIsolated properties to check if the document is cross-origin isolated
			// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements
			//
			// if(typeof window.SharedArrayBuffer != "function") {
			//     return false;
			// }
			//
			// const buf = new window.SharedArrayBuffer(1);
			// return buf.byteLength !== undefined && buf.byteLength;

			return false;
		},

		// CF0113
		function webdriverCheck() {
			// return navigator.webdriver != null && navigator.webdriver;

			return false;
		},

		// CF0114
		function webGL() {
			// [snip]

			return [
				// UNMASKED_VENDOR_WEBGL
				webglVendorUnmasked,
				// UNMASKED_RENDERER_WEBGL
				webglRendererUnmasked,
				// VENDOR
				webglVendor,
				// RENDERER
				webglRenderer,
				// VERSION
				webglVersion,
			];
		},

		// CF0115
		function navigatorUserAgent() {
			return userAgent;
		},

		// CF0116
		function navigatorUserAgentData() {
			// return navigator.userAgentData !== undefined && navigator.userAgentData;

			return userAgentData;
		},

		// CF0117
		function vendor() {
			// return navigator.vendor;

			return "Google Inc.";
		},

		// CF0118
		function platform() {
			// return navigator.platform;

			return "Win32";
		},

		// CF0119
		function productSub() {
			// return navigator.productSub;

			return "20030107";
		},

		// CF0120
		function deviceClass() {
			// return {
			//     width: screen.width,
			//     height: screen.height,
			//     availW: screen.availWidth,
			//     availH: screen.availHeight,
			//     clrDepth: screen.colorDepth,
			//     pxDepth: screen.pixelDepth,
			//     pxRatio: window.devicePixelRatio,
			//     outerW: window.outerWidth,
			//     outerH: window.outerHeight
			// };

			return {
				width: 1920,
				height: 1080,
				availW: 1920,
				availH: 1050,
				clrDepth: 24,
				pxDepth: 24,
				pxRatio: 1,
				outerW: 1920,
				outerH: 1050,
			};
		},

		// CF0121
		function webGLAgain() {
			// [snip]

			return [
				// UNMASKED_VENDOR_WEBGL
				webglVendorUnmasked,
				// UNMASKED_RENDERER_WEBGL
				webglRendererUnmasked,
			];
		},

		// CF0122
		function videoCodecs() {
			// const videoElement = document.createElement("video");
			// return !!videoElement.canPlayType && {
			//     ogg: videoElement.canPlayType("video/ogg; codecs=\"theora\""),
			//     h264: videoElement.canPlayType("video/mp4; codecs=\"avc1.42E01E\""),
			//     webm: videoElement.canPlayType("video/webm; codecs=\"vp8, vorbis\"")
			// };

			return {
				ogg: "",
				h264: "probably",
				webm: "probably",
			};
		},

		// CF0123
		function() {
			return false;
		},

		// CF0124
		function pluginsInfo() {
			// const output = [];
			// for(let i = 0; i < navigator.plugins.length; i++) {
			//     const plugin = navigator.plugins[i];
			//     output.push([plugin.name, plugin.description, plugin.filename].join(":"));
			// }
			//
			// return output;

			return [
				"PDF Viewer:Portable Document Format:internal-pdf-viewer",
				"Chrome PDF Viewer:Portable Document Format:internal-pdf-viewer",
				"Chromium PDF Viewer:Portable Document Format:internal-pdf-viewer",
				"Microsoft Edge PDF Viewer:Portable Document Format:internal-pdf-viewer",
				"WebKit built-in PDF:Portable Document Format:internal-pdf-viewer",
			];
		},

		// CF0125
		function pluginTamper() {
			// if(navigator.plugins === undefined) {
			//     return false;
			// }

			// let result = Object.getPrototypeOf(navigator.plugins) === PluginArray.prototype;
			// for(let i = 0; i < navigator.plugins.length; i++) {
			//     result &&= Object.getPrototypeOf(navigator.plugins[i]) === Plugin.prototype;
			// }

			// return result;

			return true;
		},

		// CF0126
		function pluginMimes() {
			// try {
			//     const results = [];
			//     for(let i = 0; i < navigator.mimeTypes.length; i++) {
			//         const mime = navigator.mimeTypes[i];
			//         results.push([mime.description, mime.type, mime.suffixes].join("~"));
			//     }

			//     return results;
			// } catch(err) {
			//     return [];
			// }

			return [
				"Portable Document Format~application/pdf~pdf",
				"Portable Document Format~text/pdf~pdf",
			];
		},

		// CF0127
		function mimeTamper() {
			// if(navigator.mimeTypes === undefined) {
			//     return false;
			// }
			//
			// let result = Object.getPrototypeOf(navigator.mimeTypes) === MimeTypeArray.prototype;
			// for(let i = 0; i < navigator.mimeTypes.length; i++) {
			//     result &&= Object.getPrototypeOf(navigator.mimeTypes[i]) === MimeType.prototype;
			// }
			//
			// return result;

			return true;
		},

		// CF0128
		function windowCloseCheck() {
			// return window.close !== undefined && window.close.toString();

			return "function close() { [native code] }";
		},

		// CF0129
		function windowExternalCheck() {
			// if(window.external === undefined) {
			//     return false;
			// }

			// if(typeof window.external.toString != "function") {
			//     return "notFunction";
			// } else {
			//     return window.external.toString();
			// }

			return "[object External]";
		},

		// CF0130
		function windowCheck() {
			// function _0x20a7bb(_0x13a49e, _0x346823 = []) {
			//     if(Object.getPrototypeOf(_0x13a49e) == null) {
			//         return _0x346823;
			//     }
			//
			//     return _0x20a7bb(Object.getPrototypeOf(_0x13a49e), _0x346823.concat(Object.getOwnPropertyNames(_0x13a49e)));
			// }
			//
			// return _0x20a7bb(window).splice(0, 2000);

			return [
				"Object",
				"Function",
				"Array",
				"Number",
				"parseFloat",
				"parseInt",
				"Infinity",
				"NaN",
				"undefined",
				"Boolean",
				"String",
				"Symbol",
				"Date",
				"Promise",
				"RegExp",
				"Error",
				"AggregateError",
				"EvalError",
				"RangeError",
				"ReferenceError",
				"SyntaxError",
				"TypeError",
				"URIError",
				"globalThis",
				"JSON",
				"Math",
				"Intl",
				"ArrayBuffer",
				"Atomics",
				"Uint8Array",
				"Int8Array",
				"Uint16Array",
				"Int16Array",
				"Uint32Array",
				"Int32Array",
				"Float32Array",
				"Float64Array",
				"Uint8ClampedArray",
				"BigUint64Array",
				"BigInt64Array",
				"DataView",
				"Map",
				"BigInt",
				"Set",
				"WeakMap",
				"WeakSet",
				"Proxy",
				"Reflect",
				"FinalizationRegistry",
				"WeakRef",
				"decodeURI",
				"decodeURIComponent",
				"encodeURI",
				"encodeURIComponent",
				"escape",
				"unescape",
				"eval",
				"isFinite",
				"isNaN",
				"console",
				"Option",
				"Image",
				"Audio",
				"webkitURL",
				"webkitRTCPeerConnection",
				"webkitMediaStream",
				"WebKitMutationObserver",
				"WebKitCSSMatrix",
				"XSLTProcessor",
				"XPathResult",
				"XPathExpression",
				"XPathEvaluator",
				"XMLSerializer",
				"XMLHttpRequestUpload",
				"XMLHttpRequestEventTarget",
				"XMLHttpRequest",
				"XMLDocument",
				"WritableStreamDefaultWriter",
				"WritableStreamDefaultController",
				"WritableStream",
				"Worker",
				"WindowControlsOverlayGeometryChangeEvent",
				"WindowControlsOverlay",
				"Window",
				"WheelEvent",
				"WebSocket",
				"WebGLVertexArrayObject",
				"WebGLUniformLocation",
				"WebGLTransformFeedback",
				"WebGLTexture",
				"WebGLSync",
				"WebGLShaderPrecisionFormat",
				"WebGLShader",
				"WebGLSampler",
				"WebGLRenderingContext",
				"WebGLRenderbuffer",
				"WebGLQuery",
				"WebGLProgram",
				"WebGLObject",
				"WebGLFramebuffer",
				"WebGLContextEvent",
				"WebGLBuffer",
				"WebGLActiveInfo",
				"WebGL2RenderingContext",
				"WaveShaperNode",
				"VisualViewport",
				"VisibilityStateEntry",
				"VirtualKeyboardGeometryChangeEvent",
				"ViewTransition",
				"VideoPlaybackQuality",
				"VideoFrame",
				"VideoColorSpace",
				"ValidityState",
				"VTTCue",
				"UserActivation",
				"URLSearchParams",
				"URLPattern",
				"URL",
				"UIEvent",
				"TrustedTypePolicyFactory",
				"TrustedTypePolicy",
				"TrustedScriptURL",
				"TrustedScript",
				"TrustedHTML",
				"TreeWalker",
				"TransitionEvent",
				"TransformStreamDefaultController",
				"TransformStream",
				"TrackEvent",
				"TouchList",
				"TouchEvent",
				"Touch",
				"ToggleEvent",
				"TimeRanges",
				"TextUpdateEvent",
				"TextTrackList",
				"TextTrackCueList",
				"TextTrackCue",
				"TextTrack",
				"TextMetrics",
				"TextFormatUpdateEvent",
				"TextFormat",
				"TextEvent",
				"TextEncoderStream",
				"TextEncoder",
				"TextDecoderStream",
				"TextDecoder",
				"Text",
				"TaskSignal",
				"TaskPriorityChangeEvent",
				"TaskController",
				"TaskAttributionTiming",
				"SyncManager",
				"SubmitEvent",
				"StyleSheetList",
				"StyleSheet",
				"StylePropertyMapReadOnly",
				"StylePropertyMap",
				"StorageEvent",
				"Storage",
				"StereoPannerNode",
				"StaticRange",
				"SourceBufferList",
				"SourceBuffer",
				"ShadowRoot",
				"Selection",
				"SecurityPolicyViolationEvent",
				"ScriptProcessorNode",
				"ScreenOrientation",
				"Screen",
				"Scheduling",
				"Scheduler",
				"SVGViewElement",
				"SVGUseElement",
				"SVGUnitTypes",
				"SVGTransformList",
				"SVGTransform",
				"SVGTitleElement",
				"SVGTextPositioningElement",
				"SVGTextPathElement",
				"SVGTextElement",
				"SVGTextContentElement",
				"SVGTSpanElement",
				"SVGSymbolElement",
				"SVGSwitchElement",
				"SVGStyleElement",
				"SVGStringList",
				"SVGStopElement",
				"SVGSetElement",
				"SVGScriptElement",
				"SVGSVGElement",
				"SVGRectElement",
				"SVGRect",
				"SVGRadialGradientElement",
				"SVGPreserveAspectRatio",
				"SVGPolylineElement",
				"SVGPolygonElement",
				"SVGPointList",
				"SVGPoint",
				"SVGPatternElement",
				"SVGPathElement",
				"SVGNumberList",
				"SVGNumber",
				"SVGMetadataElement",
				"SVGMatrix",
				"SVGMaskElement",
				"SVGMarkerElement",
				"SVGMPathElement",
				"SVGLinearGradientElement",
				"SVGLineElement",
				"SVGLengthList",
				"SVGLength",
				"SVGImageElement",
				"SVGGraphicsElement",
				"SVGGradientElement",
				"SVGGeometryElement",
				"SVGGElement",
				"SVGForeignObjectElement",
				"SVGFilterElement",
				"SVGFETurbulenceElement",
				"SVGFETileElement",
				"SVGFESpotLightElement",
				"SVGFESpecularLightingElement",
				"SVGFEPointLightElement",
				"SVGFEOffsetElement",
				"SVGFEMorphologyElement",
				"SVGFEMergeNodeElement",
				"SVGFEMergeElement",
				"SVGFEImageElement",
				"SVGFEGaussianBlurElement",
				"SVGFEFuncRElement",
				"SVGFEFuncGElement",
				"SVGFEFuncBElement",
				"SVGFEFuncAElement",
				"SVGFEFloodElement",
				"SVGFEDropShadowElement",
				"SVGFEDistantLightElement",
				"SVGFEDisplacementMapElement",
				"SVGFEDiffuseLightingElement",
				"SVGFEConvolveMatrixElement",
				"SVGFECompositeElement",
				"SVGFEComponentTransferElement",
				"SVGFEColorMatrixElement",
				"SVGFEBlendElement",
				"SVGEllipseElement",
				"SVGElement",
				"SVGDescElement",
				"SVGDefsElement",
				"SVGComponentTransferFunctionElement",
				"SVGClipPathElement",
				"SVGCircleElement",
				"SVGAnimationElement",
				"SVGAnimatedTransformList",
				"SVGAnimatedString",
				"SVGAnimatedRect",
				"SVGAnimatedPreserveAspectRatio",
				"SVGAnimatedNumberList",
				"SVGAnimatedNumber",
				"SVGAnimatedLengthList",
				"SVGAnimatedLength",
				"SVGAnimatedInteger",
				"SVGAnimatedEnumeration",
				"SVGAnimatedBoolean",
				"SVGAnimatedAngle",
				"SVGAnimateTransformElement",
				"SVGAnimateMotionElement",
				"SVGAnimateElement",
				"SVGAngle",
				"SVGAElement",
				"Response",
				"ResizeObserverSize",
				"ResizeObserverEntry",
				"ResizeObserver",
				"Request",
				"ReportingObserver",
				"ReadableStreamDefaultReader",
				"ReadableStreamDefaultController",
				"ReadableStreamBYOBRequest",
				"ReadableStreamBYOBReader",
				"ReadableStream",
				"ReadableByteStreamController",
				"Range",
				"RadioNodeList",
				"RTCTrackEvent",
				"RTCStatsReport",
				"RTCSessionDescription",
				"RTCSctpTransport",
				"RTCRtpTransceiver",
				"RTCRtpSender",
				"RTCRtpReceiver",
				"RTCPeerConnectionIceEvent",
				"RTCPeerConnectionIceErrorEvent",
				"RTCPeerConnection",
				"RTCIceTransport",
				"RTCIceCandidate",
				"RTCErrorEvent",
				"RTCError",
				"RTCEncodedVideoFrame",
				"RTCEncodedAudioFrame",
				"RTCDtlsTransport",
				"RTCDataChannelEvent",
				"RTCDTMFToneChangeEvent",
				"RTCDTMFSender",
				"RTCCertificate",
				"PromiseRejectionEvent",
				"ProgressEvent",
				"Profiler",
				"ProcessingInstruction",
				"PopStateEvent",
				"PointerEvent",
				"PluginArray",
				"Plugin",
				"PictureInPictureWindow",
				"PictureInPictureEvent",
				"PeriodicWave",
				"PerformanceTiming",
				"PerformanceServerTiming",
				"PerformanceResourceTiming",
				"PerformancePaintTiming",
				"PerformanceObserverEntryList",
				"PerformanceObserver",
				"PerformanceNavigationTiming",
				"PerformanceNavigation",
				"PerformanceMeasure",
				"PerformanceMark",
				"PerformanceLongTaskTiming",
				"PerformanceEventTiming",
				"PerformanceEntry",
				"PerformanceElementTiming",
				"Performance",
				"Path2D",
				"PannerNode",
				"PageTransitionEvent",
				"OverconstrainedError",
				"OscillatorNode",
				"OffscreenCanvasRenderingContext2D",
				"OffscreenCanvas",
				"OfflineAudioContext",
				"OfflineAudioCompletionEvent",
				"NodeList",
				"NodeIterator",
				"NodeFilter",
				"Node",
				"NetworkInformation",
				"NavigatorUAData",
				"Navigator",
				"NavigationTransition",
				"NavigationHistoryEntry",
				"NavigationDestination",
				"NavigationCurrentEntryChangeEvent",
				"Navigation",
				"NavigateEvent",
				"NamedNodeMap",
				"MutationRecord",
				"MutationObserver",
				"MouseEvent",
				"MimeTypeArray",
				"MimeType",
				"MessagePort",
				"MessageEvent",
				"MessageChannel",
				"MediaStreamTrackVideoStats",
				"MediaStreamTrackProcessor",
				"MediaStreamTrackGenerator",
				"MediaStreamTrackEvent",
				"MediaStreamTrackAudioStats",
				"MediaStreamTrack",
				"MediaStreamEvent",
				"MediaStreamAudioSourceNode",
				"MediaStreamAudioDestinationNode",
				"MediaStream",
				"MediaSourceHandle",
				"MediaSource",
				"MediaRecorder",
				"MediaQueryListEvent",
				"MediaQueryList",
				"MediaList",
				"MediaError",
				"MediaEncryptedEvent",
				"MediaElementAudioSourceNode",
				"MediaCapabilities",
				"MathMLElement",
				"Location",
				"LayoutShiftAttribution",
				"LayoutShift",
				"LargestContentfulPaint",
				"KeyframeEffect",
				"KeyboardEvent",
				"IntersectionObserverEntry",
				"IntersectionObserver",
				"InputEvent",
				"InputDeviceInfo",
				"InputDeviceCapabilities",
				"Ink",
				"ImageData",
				"ImageCapture",
				"ImageBitmapRenderingContext",
				"ImageBitmap",
				"IdleDeadline",
				"IIRFilterNode",
				"IDBVersionChangeEvent",
				"IDBTransaction",
				"IDBRequest",
				"IDBOpenDBRequest",
				"IDBObjectStore",
				"IDBKeyRange",
				"IDBIndex",
				"IDBFactory",
				"IDBDatabase",
				"IDBCursorWithValue",
				"IDBCursor",
				"History",
				"HighlightRegistry",
				"Highlight",
				"Headers",
				"HashChangeEvent",
				"HTMLVideoElement",
				"HTMLUnknownElement",
				"HTMLUListElement",
				"HTMLTrackElement",
				"HTMLTitleElement",
				"HTMLTimeElement",
				"HTMLTextAreaElement",
				"HTMLTemplateElement",
				"HTMLTableSectionElement",
				"HTMLTableRowElement",
				"HTMLTableElement",
				"HTMLTableColElement",
				"HTMLTableCellElement",
				"HTMLTableCaptionElement",
				"HTMLStyleElement",
				"HTMLSpanElement",
				"HTMLSourceElement",
				"HTMLSlotElement",
				"HTMLSelectElement",
				"HTMLScriptElement",
				"HTMLQuoteElement",
				"HTMLProgressElement",
				"HTMLPreElement",
				"HTMLPictureElement",
				"HTMLParamElement",
				"HTMLParagraphElement",
				"HTMLOutputElement",
				"HTMLOptionsCollection",
				"HTMLOptionElement",
				"HTMLOptGroupElement",
				"HTMLObjectElement",
				"HTMLOListElement",
				"HTMLModElement",
				"HTMLMeterElement",
				"HTMLMetaElement",
				"HTMLMenuElement",
				"HTMLMediaElement",
				"HTMLMarqueeElement",
				"HTMLMapElement",
				"HTMLLinkElement",
				"HTMLLegendElement",
				"HTMLLabelElement",
				"HTMLLIElement",
				"HTMLInputElement",
				"HTMLImageElement",
				"HTMLIFrameElement",
				"HTMLHtmlElement",
				"HTMLHeadingElement",
				"HTMLHeadElement",
				"HTMLHRElement",
				"HTMLFrameSetElement",
				"HTMLFrameElement",
				"HTMLFormElement",
				"HTMLFormControlsCollection",
				"HTMLFontElement",
				"HTMLFieldSetElement",
				"HTMLEmbedElement",
				"HTMLElement",
				"HTMLDocument",
				"HTMLDivElement",
				"HTMLDirectoryElement",
				"HTMLDialogElement",
				"HTMLDetailsElement",
				"HTMLDataListElement",
				"HTMLDataElement",
				"HTMLDListElement",
				"HTMLCollection",
				"HTMLCanvasElement",
				"HTMLButtonElement",
				"HTMLBodyElement",
				"HTMLBaseElement",
				"HTMLBRElement",
				"HTMLAudioElement",
				"HTMLAreaElement",
				"HTMLAnchorElement",
				"HTMLAllCollection",
				"GeolocationPositionError",
				"GeolocationPosition",
				"GeolocationCoordinates",
				"Geolocation",
				"GamepadHapticActuator",
				"GamepadEvent",
				"GamepadButton",
				"Gamepad",
				"GainNode",
				"FormDataEvent",
				"FormData",
				"FontFaceSetLoadEvent",
				"FontFace",
				"FocusEvent",
				"FileReader",
				"FileList",
				"File",
				"FeaturePolicy",
				"External",
				"EventTarget",
				"EventSource",
				"EventCounts",
				"Event",
				"ErrorEvent",
				"EncodedVideoChunk",
				"EncodedAudioChunk",
				"ElementInternals",
				"Element",
				"EditContext",
				"DynamicsCompressorNode",
				"DragEvent",
				"DocumentType",
				"DocumentTimeline",
				"DocumentFragment",
				"Document",
				"DelegatedInkTrailPresenter",
				"DelayNode",
				"DecompressionStream",
				"DataTransferItemList",
				"DataTransferItem",
				"DataTransfer",
				"DOMTokenList",
				"DOMStringMap",
				"DOMStringList",
				"DOMRectReadOnly",
				"DOMRectList",
				"DOMRect",
				"DOMQuad",
				"DOMPointReadOnly",
				"DOMPoint",
				"DOMParser",
				"DOMMatrixReadOnly",
				"DOMMatrix",
				"DOMImplementation",
				"DOMException",
				"DOMError",
				"CustomStateSet",
				"CustomEvent",
				"CustomElementRegistry",
				"Crypto",
				"CountQueuingStrategy",
				"ConvolverNode",
				"ContentVisibilityAutoStateChangeEvent",
				"ConstantSourceNode",
				"CompressionStream",
				"CompositionEvent",
				"Comment",
				"CloseWatcher",
				"CloseEvent",
				"ClipboardEvent",
				"CharacterData",
				"CharacterBoundsUpdateEvent",
				"ChannelSplitterNode",
				"ChannelMergerNode",
				"CanvasRenderingContext2D",
				"CanvasPattern",
				"CanvasGradient",
				"CanvasCaptureMediaStreamTrack",
				"CSSVariableReferenceValue",
				"CSSUnparsedValue",
				"CSSUnitValue",
				"CSSTranslate",
				"CSSTransition",
				"CSSTransformValue",
				"CSSTransformComponent",
				"CSSSupportsRule",
				"CSSStyleValue",
				"CSSStyleSheet",
				"CSSStyleRule",
				"CSSStyleDeclaration",
				"CSSStartingStyleRule",
				"CSSSkewY",
				"CSSSkewX",
				"CSSSkew",
				"CSSScopeRule",
				"CSSScale",
				"CSSRuleList",
				"CSSRule",
				"CSSRotate",
				"CSSPropertyRule",
				"CSSPositionValue",
				"CSSPositionTryRule",
				"CSSPositionTryDescriptors",
				"CSSPerspective",
				"CSSPageRule",
				"CSSNumericValue",
				"CSSNumericArray",
				"CSSNamespaceRule",
				"CSSMediaRule",
				"CSSMatrixComponent",
				"CSSMathValue",
				"CSSMathSum",
				"CSSMathProduct",
				"CSSMathNegate",
				"CSSMathMin",
				"CSSMathMax",
				"CSSMathInvert",
				"CSSMathClamp",
				"CSSLayerStatementRule",
				"CSSLayerBlockRule",
				"CSSKeywordValue",
				"CSSKeyframesRule",
				"CSSKeyframeRule",
				"CSSImportRule",
				"CSSImageValue",
				"CSSGroupingRule",
				"CSSFontPaletteValuesRule",
				"CSSFontFaceRule",
				"CSSCounterStyleRule",
				"CSSContainerRule",
				"CSSConditionRule",
				"CSSAnimation",
				"CSS",
				"CDATASection",
				"ByteLengthQueuingStrategy",
				"BrowserCaptureMediaStreamTrack",
				"BroadcastChannel",
				"BlobEvent",
				"Blob",
				"BiquadFilterNode",
				"BeforeUnloadEvent",
				"BeforeInstallPromptEvent",
				"BaseAudioContext",
				"BarProp",
				"AudioWorkletNode",
				"AudioSinkInfo",
				"AudioScheduledSourceNode",
				"AudioProcessingEvent",
				"AudioParamMap",
				"AudioParam",
				"AudioNode",
				"AudioListener",
				"AudioDestinationNode",
				"AudioData",
				"AudioContext",
				"AudioBufferSourceNode",
				"AudioBuffer",
				"Attr",
				"AnimationTimeline",
				"AnimationPlaybackEvent",
				"AnimationEvent",
				"AnimationEffect",
				"Animation",
				"AnalyserNode",
				"AbstractRange",
				"AbortSignal",
				"AbortController",
				"window",
				"self",
				"document",
				"name",
				"location",
				"customElements",
				"history",
				"navigation",
				"locationbar",
				"menubar",
				"personalbar",
				"scrollbars",
				"statusbar",
				"toolbar",
				"status",
				"closed",
				"frames",
				"length",
				"top",
				"opener",
				"parent",
				"frameElement",
				"navigator",
				"origin",
				"external",
				"screen",
				"innerWidth",
				"innerHeight",
				"scrollX",
				"pageXOffset",
				"scrollY",
				"pageYOffset",
				"visualViewport",
				"screenX",
				"screenY",
				"outerWidth",
				"outerHeight",
				"devicePixelRatio",
				"event",
				"clientInformation",
				"offscreenBuffering",
				"screenLeft",
				"screenTop",
				"styleMedia",
				"onsearch",
				"isSecureContext",
				"trustedTypes",
				"performance",
				"onappinstalled",
				"onbeforeinstallprompt",
				"crypto",
				"indexedDB",
				"sessionStorage",
				"localStorage",
				"onbeforexrselect",
				"onabort",
				"onbeforeinput",
				"onbeforematch",
				"onbeforetoggle",
				"onblur",
				"oncancel",
				"oncanplay",
				"oncanplaythrough",
				"onchange",
				"onclick",
				"onclose",
				"oncontentvisibilityautostatechange",
				"oncontextlost",
				"oncontextmenu",
				"oncontextrestored",
				"oncuechange",
				"ondblclick",
				"ondrag",
				"ondragend",
				"ondragenter",
				"ondragleave",
				"ondragover",
				"ondragstart",
				"ondrop",
				"ondurationchange",
				"onemptied",
				"onended",
				"onerror",
				"onfocus",
				"onformdata",
				"oninput",
				"oninvalid",
				"onkeydown",
				"onkeypress",
				"onkeyup",
				"onload",
				"onloadeddata",
				"onloadedmetadata",
				"onloadstart",
				"onmousedown",
				"onmouseenter",
				"onmouseleave",
				"onmousemove",
				"onmouseout",
				"onmouseover",
				"onmouseup",
				"onmousewheel",
				"onpause",
				"onplay",
				"onplaying",
				"onprogress",
				"onratechange",
				"onreset",
				"onresize",
				"onscroll",
				"onsecuritypolicyviolation",
				"onseeked",
				"onseeking",
				"onselect",
				"onslotchange",
				"onstalled",
				"onsubmit",
				"onsuspend",
				"ontimeupdate",
				"ontoggle",
				"onvolumechange",
				"onwaiting",
				"onwebkitanimationend",
				"onwebkitanimationiteration",
				"onwebkitanimationstart",
				"onwebkittransitionend",
				"onwheel",
				"onauxclick",
				"ongotpointercapture",
				"onlostpointercapture",
				"onpointerdown",
				"onpointermove",
				"onpointerrawupdate",
				"onpointerup",
				"onpointercancel",
				"onpointerover",
				"onpointerout",
				"onpointerenter",
				"onpointerleave",
				"onselectstart",
				"onselectionchange",
				"onanimationend",
				"onanimationiteration",
				"onanimationstart",
				"ontransitionrun",
				"ontransitionstart",
				"ontransitionend",
				"ontransitioncancel",
				"onafterprint",
				"onbeforeprint",
				"onbeforeunload",
				"onhashchange",
				"onlanguagechange",
				"onmessage",
				"onmessageerror",
				"onoffline",
				"ononline",
				"onpagehide",
				"onpageshow",
				"onpopstate",
				"onrejectionhandled",
				"onstorage",
				"onunhandledrejection",
				"onunload",
				"crossOriginIsolated",
				"scheduler",
				"alert",
				"atob",
				"blur",
				"btoa",
				"cancelAnimationFrame",
				"cancelIdleCallback",
				"captureEvents",
				"clearInterval",
				"clearTimeout",
				"close",
				"confirm",
				"createImageBitmap",
				"fetch",
				"find",
				"focus",
				"getComputedStyle",
				"getSelection",
				"matchMedia",
				"moveBy",
				"moveTo",
				"open",
				"postMessage",
				"print",
				"prompt",
				"queueMicrotask",
				"releaseEvents",
				"reportError",
				"requestAnimationFrame",
				"requestIdleCallback",
				"resizeBy",
				"resizeTo",
				"scroll",
				"scrollBy",
				"scrollTo",
				"setInterval",
				"setTimeout",
				"stop",
				"structuredClone",
				"webkitCancelAnimationFrame",
				"webkitRequestAnimationFrame",
				"Iterator",
				"chrome",
				"WebAssembly",
				"caches",
				"cookieStore",
				"ondevicemotion",
				"ondeviceorientation",
				"ondeviceorientationabsolute",
				"launchQueue",
				"sharedStorage",
				"documentPictureInPicture",
				"AbsoluteOrientationSensor",
				"Accelerometer",
				"AudioDecoder",
				"AudioEncoder",
				"AudioWorklet",
				"BatteryManager",
				"Cache",
				"CacheStorage",
				"Clipboard",
				"ClipboardItem",
				"CookieChangeEvent",
				"CookieStore",
				"CookieStoreManager",
				"Credential",
				"CredentialsContainer",
				"CryptoKey",
				"DeviceMotionEvent",
				"DeviceMotionEventAcceleration",
				"DeviceMotionEventRotationRate",
				"DeviceOrientationEvent",
				"FederatedCredential",
				"GPU",
				"GPUAdapter",
				"GPUAdapterInfo",
				"GPUBindGroup",
				"GPUBindGroupLayout",
				"GPUBuffer",
				"GPUBufferUsage",
				"GPUCanvasContext",
				"GPUColorWrite",
				"GPUCommandBuffer",
				"GPUCommandEncoder",
				"GPUCompilationInfo",
				"GPUCompilationMessage",
				"GPUComputePassEncoder",
				"GPUComputePipeline",
				"GPUDevice",
				"GPUDeviceLostInfo",
				"GPUError",
				"GPUExternalTexture",
				"GPUInternalError",
				"GPUMapMode",
				"GPUOutOfMemoryError",
				"GPUPipelineError",
				"GPUPipelineLayout",
				"GPUQuerySet",
				"GPUQueue",
				"GPURenderBundle",
				"GPURenderBundleEncoder",
				"GPURenderPassEncoder",
				"GPURenderPipeline",
				"GPUSampler",
				"GPUShaderModule",
				"GPUShaderStage",
				"GPUSupportedFeatures",
				"GPUSupportedLimits",
				"GPUTexture",
				"GPUTextureUsage",
				"GPUTextureView",
				"GPUUncapturedErrorEvent",
				"GPUValidationError",
				"GravitySensor",
				"Gyroscope",
				"IdleDetector",
				"ImageDecoder",
				"ImageTrack",
				"ImageTrackList",
				"Keyboard",
				"KeyboardLayoutMap",
				"LinearAccelerationSensor",
				"Lock",
				"LockManager",
				"MIDIAccess",
				"MIDIConnectionEvent",
				"MIDIInput",
				"MIDIInputMap",
				"MIDIMessageEvent",
				"MIDIOutput",
				"MIDIOutputMap",
				"MIDIPort",
				"MediaDeviceInfo",
				"MediaDevices",
				"MediaKeyMessageEvent",
				"MediaKeySession",
				"MediaKeyStatusMap",
				"MediaKeySystemAccess",
				"MediaKeys",
				"NavigationPreloadManager",
				"NavigatorManagedData",
				"OrientationSensor",
				"PasswordCredential",
				"RelativeOrientationSensor",
				"ScreenDetailed",
				"ScreenDetails",
				"Sensor",
				"SensorErrorEvent",
				"ServiceWorker",
				"ServiceWorkerContainer",
				"ServiceWorkerRegistration",
				"StorageManager",
				"SubtleCrypto",
				"VideoDecoder",
				"VideoEncoder",
				"VirtualKeyboard",
				"WGSLLanguageFeatures",
				"WebTransport",
				"WebTransportBidirectionalStream",
				"WebTransportDatagramDuplexStream",
				"WebTransportError",
				"Worklet",
				"XRDOMOverlayState",
				"XRLayer",
				"XRWebGLBinding",
				"AuthenticatorAssertionResponse",
				"AuthenticatorAttestationResponse",
				"AuthenticatorResponse",
				"PublicKeyCredential",
				"Bluetooth",
				"BluetoothCharacteristicProperties",
				"BluetoothDevice",
				"BluetoothRemoteGATTCharacteristic",
				"BluetoothRemoteGATTDescriptor",
				"BluetoothRemoteGATTServer",
				"BluetoothRemoteGATTService",
				"CaptureController",
				"DocumentPictureInPicture",
				"EyeDropper",
				"FileSystemDirectoryHandle",
				"FileSystemFileHandle",
				"FileSystemHandle",
				"FileSystemWritableFileStream",
				"FontData",
				"FragmentDirective",
				"HID",
				"HIDConnectionEvent",
				"HIDDevice",
				"HIDInputReportEvent",
				"IdentityCredential",
				"IdentityProvider",
				"IdentityCredentialError",
				"LaunchParams",
				"LaunchQueue",
				"NavigatorLogin",
				"NotRestoredReasonDetails",
				"NotRestoredReasons",
				"OTPCredential",
				"PaymentAddress",
				"PaymentRequest",
				"PaymentRequestUpdateEvent",
				"PaymentResponse",
				"PaymentManager",
				"PaymentMethodChangeEvent",
				"Presentation",
				"PresentationAvailability",
				"PresentationConnection",
				"PresentationConnectionAvailableEvent",
				"PresentationConnectionCloseEvent",
				"PresentationConnectionList",
				"PresentationReceiver",
				"PresentationRequest",
				"PressureObserver",
				"PressureRecord",
				"ProtectedAudience",
				"Serial",
				"SerialPort",
				"StorageBucket",
				"StorageBucketManager",
				"USB",
				"USBAlternateInterface",
				"USBConfiguration",
				"USBConnectionEvent",
				"USBDevice",
				"USBEndpoint",
				"USBInTransferResult",
				"USBInterface",
				"USBIsochronousInTransferPacket",
				"USBIsochronousInTransferResult",
				"USBIsochronousOutTransferPacket",
				"USBIsochronousOutTransferResult",
				"USBOutTransferResult",
				"WakeLock",
				"WakeLockSentinel",
				"XRAnchor",
				"XRAnchorSet",
				"XRBoundedReferenceSpace",
				"XRCPUDepthInformation",
				"XRCamera",
				"XRDepthInformation",
				"XRFrame",
				"XRHitTestResult",
				"XRHitTestSource",
				"XRInputSource",
				"XRInputSourceArray",
				"XRInputSourceEvent",
				"XRInputSourcesChangeEvent",
				"XRLightEstimate",
				"XRLightProbe",
				"XRPose",
				"XRRay",
				"XRReferenceSpace",
				"XRReferenceSpaceEvent",
				"XRRenderState",
				"XRRigidTransform",
				"XRSession",
				"XRSessionEvent",
				"XRSpace",
				"XRSystem",
				"XRTransientInputHitTestResult",
				"XRTransientInputHitTestSource",
				"XRView",
				"XRViewerPose",
				"XRViewport",
				"XRWebGLDepthInformation",
				"XRWebGLLayer",
				"XRHand",
				"XRJointPose",
				"XRJointSpace",
				"getScreenDetails",
				"queryLocalFonts",
				"showDirectoryPicker",
				"showOpenFilePicker",
				"showSaveFilePicker",
				"originAgentCluster",
				"onpageswap",
				"onpagereveal",
				"credentialless",
				"fence",
				"speechSynthesis",
				"onscrollend",
				"onscrollsnapchange",
				"onscrollsnapchanging",
				"BackgroundFetchManager",
				"BackgroundFetchRecord",
				"BackgroundFetchRegistration",
				"BluetoothUUID",
				"CSSMarginRule",
				"CSSNestedDeclarations",
				"CSSViewTransitionRule",
				"CaretPosition",
				"ChapterInformation",
				"CropTarget",
				"DocumentPictureInPictureEvent",
				"Fence",
				"FencedFrameConfig",
				"HTMLFencedFrameElement",
				"MediaMetadata",
				"MediaSession",
				"NavigationActivation",
				"Notification",
				"PageRevealEvent",
				"PageSwapEvent",
				"PerformanceLongAnimationFrameTiming",
				"PerformanceScriptTiming",
				"PeriodicSyncManager",
				"PermissionStatus",
				"Permissions",
				"PushManager",
				"PushSubscription",
				"PushSubscriptionOptions",
				"RTCDataChannel",
				"RemotePlayback",
				"ScrollTimeline",
				"ViewTimeline",
				"SharedStorage",
				"SharedStorageWorklet",
				"SharedWorker",
				"SnapEvent",
				"SpeechSynthesis",
				"SpeechSynthesisErrorEvent",
				"SpeechSynthesisEvent",
				"SpeechSynthesisUtterance",
				"SpeechSynthesisVoice",
				"ViewTransitionTypeSet",
				"WebSocketError",
				"WebSocketStream",
				"webkitSpeechGrammar",
				"webkitSpeechGrammarList",
				"webkitSpeechRecognition",
				"webkitSpeechRecognitionError",
				"webkitSpeechRecognitionEvent",
				"webkitRequestFileSystem",
				"webkitResolveLocalFileSystemURL",
				"webpackChunk_N_E",
				"__next_set_public_path__",
				"next",
				"__NEXT_DATA__",
				"__SSG_MANIFEST_CB",
				"__NEXT_P",
				"_N_E",
				"applyFocusVisiblePolyfill",
				"__MIDDLEWARE_MATCHERS",
				"__BUILD_MANIFEST",
				"__SSG_MANIFEST",
				"captchaFoxOnLoad",
				"__core-js_shared__",
				"__svelte",
				"captchafox",
				"_0x4952",
				"_0x1684",
				"__cf_wapi",
				"TEMPORARY",
				"PERSISTENT",
				"constructor",
				"addEventListener",
				"dispatchEvent",
				"removeEventListener",
				"constructor",
			];
		},

		// CF0131
		function documentCheck() {
			// return _0x20a7bb(window.document);

			return [
				"location",
				"_reactListeningq8s9b87wm3",
				"constructor",
				"implementation",
				"URL",
				"documentURI",
				"compatMode",
				"characterSet",
				"charset",
				"inputEncoding",
				"contentType",
				"doctype",
				"documentElement",
				"xmlEncoding",
				"xmlVersion",
				"xmlStandalone",
				"domain",
				"referrer",
				"cookie",
				"lastModified",
				"readyState",
				"title",
				"dir",
				"body",
				"head",
				"images",
				"embeds",
				"plugins",
				"links",
				"forms",
				"scripts",
				"currentScript",
				"defaultView",
				"designMode",
				"onreadystatechange",
				"anchors",
				"applets",
				"fgColor",
				"linkColor",
				"vlinkColor",
				"alinkColor",
				"bgColor",
				"all",
				"scrollingElement",
				"onpointerlockchange",
				"onpointerlockerror",
				"hidden",
				"visibilityState",
				"wasDiscarded",
				"prerendering",
				"featurePolicy",
				"webkitVisibilityState",
				"webkitHidden",
				"onbeforecopy",
				"onbeforecut",
				"onbeforepaste",
				"onfreeze",
				"onprerenderingchange",
				"onresume",
				"onsearch",
				"onvisibilitychange",
				"timeline",
				"fullscreenEnabled",
				"fullscreen",
				"onfullscreenchange",
				"onfullscreenerror",
				"webkitIsFullScreen",
				"webkitCurrentFullScreenElement",
				"webkitFullscreenEnabled",
				"webkitFullscreenElement",
				"onwebkitfullscreenchange",
				"onwebkitfullscreenerror",
				"rootElement",
				"pictureInPictureEnabled",
				"onbeforexrselect",
				"onabort",
				"onbeforeinput",
				"onbeforematch",
				"onbeforetoggle",
				"onblur",
				"oncancel",
				"oncanplay",
				"oncanplaythrough",
				"onchange",
				"onclick",
				"onclose",
				"oncontentvisibilityautostatechange",
				"oncontextlost",
				"oncontextmenu",
				"oncontextrestored",
				"oncuechange",
				"ondblclick",
				"ondrag",
				"ondragend",
				"ondragenter",
				"ondragleave",
				"ondragover",
				"ondragstart",
				"ondrop",
				"ondurationchange",
				"onemptied",
				"onended",
				"onerror",
				"onfocus",
				"onformdata",
				"oninput",
				"oninvalid",
				"onkeydown",
				"onkeypress",
				"onkeyup",
				"onload",
				"onloadeddata",
				"onloadedmetadata",
				"onloadstart",
				"onmousedown",
				"onmouseenter",
				"onmouseleave",
				"onmousemove",
				"onmouseout",
				"onmouseover",
				"onmouseup",
				"onmousewheel",
				"onpause",
				"onplay",
				"onplaying",
				"onprogress",
				"onratechange",
				"onreset",
				"onresize",
				"onscroll",
				"onsecuritypolicyviolation",
				"onseeked",
				"onseeking",
				"onselect",
				"onslotchange",
				"onstalled",
				"onsubmit",
				"onsuspend",
				"ontimeupdate",
				"ontoggle",
				"onvolumechange",
				"onwaiting",
				"onwebkitanimationend",
				"onwebkitanimationiteration",
				"onwebkitanimationstart",
				"onwebkittransitionend",
				"onwheel",
				"onauxclick",
				"ongotpointercapture",
				"onlostpointercapture",
				"onpointerdown",
				"onpointermove",
				"onpointerrawupdate",
				"onpointerup",
				"onpointercancel",
				"onpointerover",
				"onpointerout",
				"onpointerenter",
				"onpointerleave",
				"onselectstart",
				"onselectionchange",
				"onanimationend",
				"onanimationiteration",
				"onanimationstart",
				"ontransitionrun",
				"ontransitionstart",
				"ontransitionend",
				"ontransitioncancel",
				"oncopy",
				"oncut",
				"onpaste",
				"children",
				"firstElementChild",
				"lastElementChild",
				"childElementCount",
				"activeElement",
				"styleSheets",
				"pointerLockElement",
				"fullscreenElement",
				"adoptedStyleSheets",
				"pictureInPictureElement",
				"fonts",
				"adoptNode",
				"append",
				"captureEvents",
				"caretRangeFromPoint",
				"clear",
				"close",
				"createAttribute",
				"createAttributeNS",
				"createCDATASection",
				"createComment",
				"createDocumentFragment",
				"createElement",
				"createElementNS",
				"createEvent",
				"createExpression",
				"createNSResolver",
				"createNodeIterator",
				"createProcessingInstruction",
				"createRange",
				"createTextNode",
				"createTreeWalker",
				"elementFromPoint",
				"elementsFromPoint",
				"evaluate",
				"execCommand",
				"exitFullscreen",
				"exitPictureInPicture",
				"exitPointerLock",
				"getAnimations",
				"getElementById",
				"getElementsByClassName",
				"getElementsByName",
				"getElementsByTagName",
				"getElementsByTagNameNS",
				"getSelection",
				"hasFocus",
				"hasStorageAccess",
				"hasUnpartitionedCookieAccess",
				"importNode",
				"open",
				"prepend",
				"queryCommandEnabled",
				"queryCommandIndeterm",
				"queryCommandState",
				"queryCommandSupported",
				"queryCommandValue",
				"querySelector",
				"querySelectorAll",
				"releaseEvents",
				"replaceChildren",
				"requestStorageAccess",
				"requestStorageAccessFor",
				"startViewTransition",
				"webkitCancelFullScreen",
				"webkitExitFullscreen",
				"write",
				"writeln",
				"constructor",
				"fragmentDirective",
				"browsingTopics",
				"hasPrivateToken",
				"hasRedemptionRecord",
				"onscrollend",
				"onscrollsnapchange",
				"onscrollsnapchanging",
				"caretPositionFromPoint",
				"nodeType",
				"nodeName",
				"baseURI",
				"isConnected",
				"ownerDocument",
				"parentNode",
				"parentElement",
				"childNodes",
				"firstChild",
				"lastChild",
				"previousSibling",
				"nextSibling",
				"nodeValue",
				"textContent",
				"ELEMENT_NODE",
				"ATTRIBUTE_NODE",
				"TEXT_NODE",
				"CDATA_SECTION_NODE",
				"ENTITY_REFERENCE_NODE",
				"ENTITY_NODE",
				"PROCESSING_INSTRUCTION_NODE",
				"COMMENT_NODE",
				"DOCUMENT_NODE",
				"DOCUMENT_TYPE_NODE",
				"DOCUMENT_FRAGMENT_NODE",
				"NOTATION_NODE",
				"DOCUMENT_POSITION_DISCONNECTED",
				"DOCUMENT_POSITION_PRECEDING",
				"DOCUMENT_POSITION_FOLLOWING",
				"DOCUMENT_POSITION_CONTAINS",
				"DOCUMENT_POSITION_CONTAINED_BY",
				"DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC",
				"appendChild",
				"cloneNode",
				"compareDocumentPosition",
				"contains",
				"getRootNode",
				"hasChildNodes",
				"insertBefore",
				"isDefaultNamespace",
				"isEqualNode",
				"isSameNode",
				"lookupNamespaceURI",
				"lookupPrefix",
				"normalize",
				"removeChild",
				"replaceChild",
				"constructor",
				"addEventListener",
				"dispatchEvent",
				"removeEventListener",
				"constructor",
			];
		},

		// CF0132
		function navigatorCheck() {
			// _0x20a7bb(window.navigator);

			return [
				"vendorSub",
				"productSub",
				"vendor",
				"maxTouchPoints",
				"scheduling",
				"userActivation",
				"doNotTrack",
				"geolocation",
				"connection",
				"plugins",
				"mimeTypes",
				"pdfViewerEnabled",
				"webkitTemporaryStorage",
				"webkitPersistentStorage",
				"windowControlsOverlay",
				"hardwareConcurrency",
				"cookieEnabled",
				"appCodeName",
				"appName",
				"appVersion",
				"platform",
				"product",
				"userAgent",
				"language",
				"languages",
				"onLine",
				"webdriver",
				"getGamepads",
				"javaEnabled",
				"sendBeacon",
				"vibrate",
				"constructor",
				"deprecatedRunAdAuctionEnforcesKAnonymity",
				"protectedAudience",
				"bluetooth",
				"storageBuckets",
				"clipboard",
				"credentials",
				"keyboard",
				"managed",
				"mediaDevices",
				"storage",
				"serviceWorker",
				"virtualKeyboard",
				"wakeLock",
				"deviceMemory",
				"userAgentData",
				"login",
				"ink",
				"mediaCapabilities",
				"hid",
				"locks",
				"gpu",
				"mediaSession",
				"permissions",
				"presentation",
				"usb",
				"xr",
				"serial",
				"adAuctionComponents",
				"runAdAuction",
				"canLoadAdAuctionFencedFrame",
				"canShare",
				"share",
				"clearAppBadge",
				"getBattery",
				"getUserMedia",
				"requestMIDIAccess",
				"requestMediaKeySystemAccess",
				"setAppBadge",
				"webkitGetUserMedia",
				"clearOriginJoinedAdInterestGroups",
				"createAuctionNonce",
				"joinAdInterestGroup",
				"leaveAdInterestGroup",
				"updateAdInterestGroups",
				"deprecatedReplaceInURN",
				"deprecatedURNToURL",
				"getInstalledRelatedApps",
				"getInterestGroupAdAuctionData",
				"registerProtocolHandler",
				"unregisterProtocolHandler",
			];
		},

		// CF0133
		function documentElementAttributeNames() {
			// if(document.documentElement === undefined) {
			//     return [];
			// }
			//
			// if(typeof document.documentElement.getAttributeNames != "function") {
			//     return [];
			// } else {
			//     return document.documentElement.getAttributeNames();
			// }

			return ["lang", "class", "data-js-focus-visible"];
		},

		// CF0134
		function iframeChrome() {
			// const iframe = document.createElement("iframe");
			// iframe.srcdoc = "blank page";
			// document.body.appendChild(iframe);
			// const result = typeof iframe.contentWindow.chrome;
			// iframe.remove();
			//
			// return result;

			return "object";
		},

		// CF0135
		function iframeCheck() {
			// return !!document.createElement("iframe").contentWindow;

			return false;
		},

		// CF0136
		function evalEnvironmentCheck() {
			return eval.toString().length;
		},

		// CF0137
		function functionToString() {
			// return !!Object["Function.toString"];

			return false;
		},

		// CF0138
		function indexedDBCheck() {
			// [snip]

			return false;
		},

		// CF0139
		function indexedDBCheck2() {
			// [snip]

			return false;
		},

		// CF0140
		function indexedDBCheck3() {
			// return !!window.openDatabase;

			return false;
		},

		// CF0141
		function() {
			// if(self.Promise !== undefined && self.Promise.allSettled !== undefined) {
			//     return new Promise((resolve) => {
			//         navigator.webkitTemporaryStorage.queryUsageAndQuota(function(usedBytes, grantedBytes) {
			//             const _0x43636a = Math.round(grantedBytes / 1048576);
			//             const _0x2b2d52 = Math.round(function() {
			//                 if(window.performance !== undefined && window.performance.memory !== undefined && window.performance.memory.jsHeapSizeLimit !== undefined) {
			//                     return performance.memory.jsHeapSizeLimit;
			//                 } else {
			//                     return 1073741824;
			//                 }
			//             }() / 1048576) * 2;
			//
			//             resolve(_0x43636a < _0x2b2d52);
			//         }, function(err) {
			//             resolve(false);
			//         });
			//     });
			// } else {
			//     return new Promise((resolve) => {
			//         window.webkitRequestFileSystem(0, 1, function successCallback() {
			//             resolve(false);
			//         }, function errorCallback() {
			//             resolve(true);
			//         });
			//     });
			// }

			return true;
		},

		// CF0142
		function pluginsOverflowCheck() {
			// return navigator.plugins.item(4294967296) === navigator.plugins[0];

			return true;
		},

		// CF0143
		function canOverridePluginRefresh() {
			// if(!navigator.plugins) {
			// 	return !0;
			// }
			//
			// const backup = navigator.plugins.refresh;
			// const rndStr = randomString(20);
			// navigator.plugins.refresh = rndStr;
			//
			// const result = navigator.plugins.refresh === rndStr;
			// navigator.plugins.refresh = backup;
			//
			// return result;

			return true;
		},

		// CF0144
		function plugins() {
			// if(!navigator.plugins) {
			//     return false;
			// }
			//
			// return [navigator.plugins[0].name === navigator.plugins[0][0].enabledPlugin.name, navigator.plugins[0][0].enabledPlugin === navigator.plugins[0]];

			return [true, true];
		},

		// CF0145
		function appVersion() {
			// const appVersion = navigator?.appVersion;
			// return appVersion !== null && appVersion !== undefined && appVersion;

			return userAgent.split("Mozilla/")[1];
		},

		// CF0146
		function isBrave() {
			// return !!navigator.brave;
			return false;
		},

		// CF0147
		function hasTouch() {
			// return navigator.maxTouchPoints === 1 && window.navigator.userAgent.indexOf("Mobile") !== -1;
			return false;
		},

		// CF0148
		function hostCheck() {
			// return window.location.origin + window.location.pathname;
			return pageUrl.origin + pageUrl.pathname;
		},
	];

	let count = 100;
	const payload = {};
	for(const func of funcs) {
		// noinspection ES6RedundantAwait
		payload["CF" + count.toString().padStart(4, "0")] = await func();
		count++;
	}

	return payload;
}

export default generateFingerprint;