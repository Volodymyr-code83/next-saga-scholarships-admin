"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/nookies";
exports.ids = ["vendor-chunks/nookies"];
exports.modules = {

/***/ "(ssr)/./node_modules/nookies/dist/index.js":
/*!********************************************!*\
  !*** ./node_modules/nookies/dist/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.destroyCookie = exports.setCookie = exports.parseCookies = void 0;\nvar cookie = __webpack_require__(/*! cookie */ \"(ssr)/./node_modules/cookie/index.js\");\nvar setCookieParser = __webpack_require__(/*! set-cookie-parser */ \"(ssr)/./node_modules/set-cookie-parser/lib/set-cookie.js\");\nvar utils_1 = __webpack_require__(/*! ./utils */ \"(ssr)/./node_modules/nookies/dist/utils.js\");\n/**\n * Parses cookies.\n *\n * @param ctx NextJS page or API context, express context, null or undefined.\n * @param options Options that we pass down to `cookie` library.\n */\nfunction parseCookies(ctx, options) {\n    var _a, _b;\n    if ((_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.cookie) {\n        return cookie.parse(ctx.req.headers.cookie, options);\n    }\n    if (utils_1.isBrowser()) {\n        return cookie.parse(document.cookie, options);\n    }\n    return {};\n}\nexports.parseCookies = parseCookies;\n/**\n * Sets a cookie.\n *\n * @param ctx NextJS page or API context, express context, null or undefined.\n * @param name The name of your cookie.\n * @param value The value of your cookie.\n * @param options Options that we pass down to `cookie` library.\n */\nfunction setCookie(ctx, name, value, options) {\n    var _a, _b;\n    if (options === void 0) { options = {}; }\n    // SSR\n    if (((_a = ctx === null || ctx === void 0 ? void 0 : ctx.res) === null || _a === void 0 ? void 0 : _a.getHeader) && ctx.res.setHeader) {\n        // Check if response has finished and warn about it.\n        if ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.res) === null || _b === void 0 ? void 0 : _b.finished) {\n            console.warn(\"Not setting \\\"\" + name + \"\\\" cookie. Response has finished.\");\n            console.warn(\"You should set cookie before res.send()\");\n            return {};\n        }\n        /**\n         * Load existing cookies from the header and parse them.\n         */\n        var cookies = ctx.res.getHeader('Set-Cookie') || [];\n        if (typeof cookies === 'string')\n            cookies = [cookies];\n        if (typeof cookies === 'number')\n            cookies = [];\n        /**\n         * Parse cookies but ignore values - we've already encoded\n         * them in the previous call.\n         */\n        var parsedCookies = setCookieParser.parse(cookies, {\n            decodeValues: false,\n        });\n        /**\n         * We create the new cookie and make sure that none of\n         * the existing cookies match it.\n         */\n        var newCookie_1 = utils_1.createCookie(name, value, options);\n        var cookiesToSet_1 = [];\n        parsedCookies.forEach(function (parsedCookie) {\n            if (!utils_1.areCookiesEqual(parsedCookie, newCookie_1)) {\n                /**\n                 * We serialize the cookie back to the original format\n                 * if it isn't the same as the new one.\n                 */\n                var serializedCookie = cookie.serialize(parsedCookie.name, parsedCookie.value, __assign({ \n                    // we prevent reencoding by default, but you might override it\n                    encode: function (val) { return val; } }, parsedCookie));\n                cookiesToSet_1.push(serializedCookie);\n            }\n        });\n        cookiesToSet_1.push(cookie.serialize(name, value, options));\n        // Update the header.\n        ctx.res.setHeader('Set-Cookie', cookiesToSet_1);\n    }\n    // Browser\n    if (utils_1.isBrowser()) {\n        if (options && options.httpOnly) {\n            throw new Error('Can not set a httpOnly cookie in the browser.');\n        }\n        document.cookie = cookie.serialize(name, value, options);\n    }\n    return {};\n}\nexports.setCookie = setCookie;\n/**\n * Destroys a cookie with a particular name.\n *\n * @param ctx NextJS page or API context, express context, null or undefined.\n * @param name Cookie name.\n * @param options Options that we pass down to `cookie` library.\n */\nfunction destroyCookie(ctx, name, options) {\n    /**\n     * We forward the request destroy to setCookie function\n     * as it is the same function with modified maxAge value.\n     */\n    return setCookie(ctx, name, '', __assign(__assign({}, (options || {})), { maxAge: -1 }));\n}\nexports.destroyCookie = destroyCookie;\n/* Utility Exports */\nexports[\"default\"] = {\n    set: setCookie,\n    get: parseCookies,\n    destroy: destroyCookie,\n};\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbm9va2llcy9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2I7QUFDQTtBQUNBLGlEQUFpRCxPQUFPO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCLEdBQUcsaUJBQWlCLEdBQUcsb0JBQW9CO0FBQ2hFLGFBQWEsbUJBQU8sQ0FBQyxvREFBUTtBQUM3QixzQkFBc0IsbUJBQU8sQ0FBQyxtRkFBbUI7QUFDakQsY0FBYyxtQkFBTyxDQUFDLDJEQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsZUFBZTtBQUM1RDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxnQkFBZ0IsTUFBTSxZQUFZO0FBQzFGO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esa0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJlZS1uZXh0anMtYWRtaW4tZGFzaGJvYXJkLy4vbm9kZV9tb2R1bGVzL25vb2tpZXMvZGlzdC9pbmRleC5qcz84YTI0Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVzdHJveUNvb2tpZSA9IGV4cG9ydHMuc2V0Q29va2llID0gZXhwb3J0cy5wYXJzZUNvb2tpZXMgPSB2b2lkIDA7XG52YXIgY29va2llID0gcmVxdWlyZShcImNvb2tpZVwiKTtcbnZhciBzZXRDb29raWVQYXJzZXIgPSByZXF1aXJlKFwic2V0LWNvb2tpZS1wYXJzZXJcIik7XG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiBQYXJzZXMgY29va2llcy5cbiAqXG4gKiBAcGFyYW0gY3R4IE5leHRKUyBwYWdlIG9yIEFQSSBjb250ZXh0LCBleHByZXNzIGNvbnRleHQsIG51bGwgb3IgdW5kZWZpbmVkLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0aGF0IHdlIHBhc3MgZG93biB0byBgY29va2llYCBsaWJyYXJ5LlxuICovXG5mdW5jdGlvbiBwYXJzZUNvb2tpZXMoY3R4LCBvcHRpb25zKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBpZiAoKF9iID0gKF9hID0gY3R4ID09PSBudWxsIHx8IGN0eCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3R4LnJlcSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhlYWRlcnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jb29raWUpIHtcbiAgICAgICAgcmV0dXJuIGNvb2tpZS5wYXJzZShjdHgucmVxLmhlYWRlcnMuY29va2llLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzXzEuaXNCcm93c2VyKCkpIHtcbiAgICAgICAgcmV0dXJuIGNvb2tpZS5wYXJzZShkb2N1bWVudC5jb29raWUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4ge307XG59XG5leHBvcnRzLnBhcnNlQ29va2llcyA9IHBhcnNlQ29va2llcztcbi8qKlxuICogU2V0cyBhIGNvb2tpZS5cbiAqXG4gKiBAcGFyYW0gY3R4IE5leHRKUyBwYWdlIG9yIEFQSSBjb250ZXh0LCBleHByZXNzIGNvbnRleHQsIG51bGwgb3IgdW5kZWZpbmVkLlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgeW91ciBjb29raWUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHlvdXIgY29va2llLlxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0aGF0IHdlIHBhc3MgZG93biB0byBgY29va2llYCBsaWJyYXJ5LlxuICovXG5mdW5jdGlvbiBzZXRDb29raWUoY3R4LCBuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHZhciBfYSwgX2I7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAvLyBTU1JcbiAgICBpZiAoKChfYSA9IGN0eCA9PT0gbnVsbCB8fCBjdHggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN0eC5yZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRIZWFkZXIpICYmIGN0eC5yZXMuc2V0SGVhZGVyKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHJlc3BvbnNlIGhhcyBmaW5pc2hlZCBhbmQgd2FybiBhYm91dCBpdC5cbiAgICAgICAgaWYgKChfYiA9IGN0eCA9PT0gbnVsbCB8fCBjdHggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN0eC5yZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5maW5pc2hlZCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTm90IHNldHRpbmcgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBjb29raWUuIFJlc3BvbnNlIGhhcyBmaW5pc2hlZC5cIik7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJZb3Ugc2hvdWxkIHNldCBjb29raWUgYmVmb3JlIHJlcy5zZW5kKClcIik7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIExvYWQgZXhpc3RpbmcgY29va2llcyBmcm9tIHRoZSBoZWFkZXIgYW5kIHBhcnNlIHRoZW0uXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgY29va2llcyA9IGN0eC5yZXMuZ2V0SGVhZGVyKCdTZXQtQ29va2llJykgfHwgW107XG4gICAgICAgIGlmICh0eXBlb2YgY29va2llcyA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICBjb29raWVzID0gW2Nvb2tpZXNdO1xuICAgICAgICBpZiAodHlwZW9mIGNvb2tpZXMgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgY29va2llcyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogUGFyc2UgY29va2llcyBidXQgaWdub3JlIHZhbHVlcyAtIHdlJ3ZlIGFscmVhZHkgZW5jb2RlZFxuICAgICAgICAgKiB0aGVtIGluIHRoZSBwcmV2aW91cyBjYWxsLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHBhcnNlZENvb2tpZXMgPSBzZXRDb29raWVQYXJzZXIucGFyc2UoY29va2llcywge1xuICAgICAgICAgICAgZGVjb2RlVmFsdWVzOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXZSBjcmVhdGUgdGhlIG5ldyBjb29raWUgYW5kIG1ha2Ugc3VyZSB0aGF0IG5vbmUgb2ZcbiAgICAgICAgICogdGhlIGV4aXN0aW5nIGNvb2tpZXMgbWF0Y2ggaXQuXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbmV3Q29va2llXzEgPSB1dGlsc18xLmNyZWF0ZUNvb2tpZShuYW1lLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIHZhciBjb29raWVzVG9TZXRfMSA9IFtdO1xuICAgICAgICBwYXJzZWRDb29raWVzLmZvckVhY2goZnVuY3Rpb24gKHBhcnNlZENvb2tpZSkge1xuICAgICAgICAgICAgaWYgKCF1dGlsc18xLmFyZUNvb2tpZXNFcXVhbChwYXJzZWRDb29raWUsIG5ld0Nvb2tpZV8xKSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFdlIHNlcmlhbGl6ZSB0aGUgY29va2llIGJhY2sgdG8gdGhlIG9yaWdpbmFsIGZvcm1hdFxuICAgICAgICAgICAgICAgICAqIGlmIGl0IGlzbid0IHRoZSBzYW1lIGFzIHRoZSBuZXcgb25lLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHZhciBzZXJpYWxpemVkQ29va2llID0gY29va2llLnNlcmlhbGl6ZShwYXJzZWRDb29raWUubmFtZSwgcGFyc2VkQ29va2llLnZhbHVlLCBfX2Fzc2lnbih7IFxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBwcmV2ZW50IHJlZW5jb2RpbmcgYnkgZGVmYXVsdCwgYnV0IHlvdSBtaWdodCBvdmVycmlkZSBpdFxuICAgICAgICAgICAgICAgICAgICBlbmNvZGU6IGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIHZhbDsgfSB9LCBwYXJzZWRDb29raWUpKTtcbiAgICAgICAgICAgICAgICBjb29raWVzVG9TZXRfMS5wdXNoKHNlcmlhbGl6ZWRDb29raWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29va2llc1RvU2V0XzEucHVzaChjb29raWUuc2VyaWFsaXplKG5hbWUsIHZhbHVlLCBvcHRpb25zKSk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgaGVhZGVyLlxuICAgICAgICBjdHgucmVzLnNldEhlYWRlcignU2V0LUNvb2tpZScsIGNvb2tpZXNUb1NldF8xKTtcbiAgICB9XG4gICAgLy8gQnJvd3NlclxuICAgIGlmICh1dGlsc18xLmlzQnJvd3NlcigpKSB7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaHR0cE9ubHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBzZXQgYSBodHRwT25seSBjb29raWUgaW4gdGhlIGJyb3dzZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLnNlcmlhbGl6ZShuYW1lLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB7fTtcbn1cbmV4cG9ydHMuc2V0Q29va2llID0gc2V0Q29va2llO1xuLyoqXG4gKiBEZXN0cm95cyBhIGNvb2tpZSB3aXRoIGEgcGFydGljdWxhciBuYW1lLlxuICpcbiAqIEBwYXJhbSBjdHggTmV4dEpTIHBhZ2Ugb3IgQVBJIGNvbnRleHQsIGV4cHJlc3MgY29udGV4dCwgbnVsbCBvciB1bmRlZmluZWQuXG4gKiBAcGFyYW0gbmFtZSBDb29raWUgbmFtZS5cbiAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdGhhdCB3ZSBwYXNzIGRvd24gdG8gYGNvb2tpZWAgbGlicmFyeS5cbiAqL1xuZnVuY3Rpb24gZGVzdHJveUNvb2tpZShjdHgsIG5hbWUsIG9wdGlvbnMpIHtcbiAgICAvKipcbiAgICAgKiBXZSBmb3J3YXJkIHRoZSByZXF1ZXN0IGRlc3Ryb3kgdG8gc2V0Q29va2llIGZ1bmN0aW9uXG4gICAgICogYXMgaXQgaXMgdGhlIHNhbWUgZnVuY3Rpb24gd2l0aCBtb2RpZmllZCBtYXhBZ2UgdmFsdWUuXG4gICAgICovXG4gICAgcmV0dXJuIHNldENvb2tpZShjdHgsIG5hbWUsICcnLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgKG9wdGlvbnMgfHwge30pKSwgeyBtYXhBZ2U6IC0xIH0pKTtcbn1cbmV4cG9ydHMuZGVzdHJveUNvb2tpZSA9IGRlc3Ryb3lDb29raWU7XG4vKiBVdGlsaXR5IEV4cG9ydHMgKi9cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgICBzZXQ6IHNldENvb2tpZSxcbiAgICBnZXQ6IHBhcnNlQ29va2llcyxcbiAgICBkZXN0cm95OiBkZXN0cm95Q29va2llLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/nookies/dist/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/nookies/dist/utils.js":
/*!********************************************!*\
  !*** ./node_modules/nookies/dist/utils.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.areCookiesEqual = exports.hasSameProperties = exports.createCookie = exports.isBrowser = void 0;\n/**\n * Tells whether we are in a browser or server.\n */\nfunction isBrowser() {\n    return typeof window !== 'undefined';\n}\nexports.isBrowser = isBrowser;\n/**\n * Create an instance of the Cookie interface\n */\nfunction createCookie(name, value, options) {\n    var sameSite = options.sameSite;\n    if (sameSite === true) {\n        sameSite = 'strict';\n    }\n    if (sameSite === undefined || sameSite === false) {\n        sameSite = 'lax';\n    }\n    var cookieToSet = __assign(__assign({}, options), { sameSite: sameSite });\n    delete cookieToSet.encode;\n    return __assign({ name: name, value: value }, cookieToSet);\n}\nexports.createCookie = createCookie;\n/**\n * Tells whether given objects have the same properties.\n */\nfunction hasSameProperties(a, b) {\n    var aProps = Object.getOwnPropertyNames(a);\n    var bProps = Object.getOwnPropertyNames(b);\n    if (aProps.length !== bProps.length) {\n        return false;\n    }\n    for (var i = 0; i < aProps.length; i++) {\n        var propName = aProps[i];\n        if (a[propName] !== b[propName]) {\n            return false;\n        }\n    }\n    return true;\n}\nexports.hasSameProperties = hasSameProperties;\n/**\n * Compare the cookie and return true if the cookies have equivalent\n * options and the cookies would be overwritten in the browser storage.\n *\n * @param a first Cookie for comparison\n * @param b second Cookie for comparison\n */\nfunction areCookiesEqual(a, b) {\n    var sameSiteSame = a.sameSite === b.sameSite;\n    if (typeof a.sameSite === 'string' && typeof b.sameSite === 'string') {\n        sameSiteSame = a.sameSite.toLowerCase() === b.sameSite.toLowerCase();\n    }\n    return (hasSameProperties(__assign(__assign({}, a), { sameSite: undefined }), __assign(__assign({}, b), { sameSite: undefined })) && sameSiteSame);\n}\nexports.areCookiesEqual = areCookiesEqual;\n/* Functions */\n//# sourceMappingURL=utils.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbm9va2llcy9kaXN0L3V0aWxzLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2I7QUFDQTtBQUNBLGlEQUFpRCxPQUFPO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsdUJBQXVCLEdBQUcseUJBQXlCLEdBQUcsb0JBQW9CLEdBQUcsaUJBQWlCO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGNBQWMsb0JBQW9CO0FBQzVFO0FBQ0Esc0JBQXNCLDBCQUEwQjtBQUNoRDtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxRQUFRLHFCQUFxQix1QkFBdUIsUUFBUSxxQkFBcUI7QUFDbkk7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyZWUtbmV4dGpzLWFkbWluLWRhc2hib2FyZC8uL25vZGVfbW9kdWxlcy9ub29raWVzL2Rpc3QvdXRpbHMuanM/OWJlMyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFyZUNvb2tpZXNFcXVhbCA9IGV4cG9ydHMuaGFzU2FtZVByb3BlcnRpZXMgPSBleHBvcnRzLmNyZWF0ZUNvb2tpZSA9IGV4cG9ydHMuaXNCcm93c2VyID0gdm9pZCAwO1xuLyoqXG4gKiBUZWxscyB3aGV0aGVyIHdlIGFyZSBpbiBhIGJyb3dzZXIgb3Igc2VydmVyLlxuICovXG5mdW5jdGlvbiBpc0Jyb3dzZXIoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc0Jyb3dzZXIgPSBpc0Jyb3dzZXI7XG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgQ29va2llIGludGVyZmFjZVxuICovXG5mdW5jdGlvbiBjcmVhdGVDb29raWUobmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2FtZVNpdGUgPSBvcHRpb25zLnNhbWVTaXRlO1xuICAgIGlmIChzYW1lU2l0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzYW1lU2l0ZSA9ICdzdHJpY3QnO1xuICAgIH1cbiAgICBpZiAoc2FtZVNpdGUgPT09IHVuZGVmaW5lZCB8fCBzYW1lU2l0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgc2FtZVNpdGUgPSAnbGF4JztcbiAgICB9XG4gICAgdmFyIGNvb2tpZVRvU2V0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IHNhbWVTaXRlOiBzYW1lU2l0ZSB9KTtcbiAgICBkZWxldGUgY29va2llVG9TZXQuZW5jb2RlO1xuICAgIHJldHVybiBfX2Fzc2lnbih7IG5hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZSB9LCBjb29raWVUb1NldCk7XG59XG5leHBvcnRzLmNyZWF0ZUNvb2tpZSA9IGNyZWF0ZUNvb2tpZTtcbi8qKlxuICogVGVsbHMgd2hldGhlciBnaXZlbiBvYmplY3RzIGhhdmUgdGhlIHNhbWUgcHJvcGVydGllcy5cbiAqL1xuZnVuY3Rpb24gaGFzU2FtZVByb3BlcnRpZXMoYSwgYikge1xuICAgIHZhciBhUHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhKTtcbiAgICB2YXIgYlByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYik7XG4gICAgaWYgKGFQcm9wcy5sZW5ndGggIT09IGJQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFQcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcE5hbWUgPSBhUHJvcHNbaV07XG4gICAgICAgIGlmIChhW3Byb3BOYW1lXSAhPT0gYltwcm9wTmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuaGFzU2FtZVByb3BlcnRpZXMgPSBoYXNTYW1lUHJvcGVydGllcztcbi8qKlxuICogQ29tcGFyZSB0aGUgY29va2llIGFuZCByZXR1cm4gdHJ1ZSBpZiB0aGUgY29va2llcyBoYXZlIGVxdWl2YWxlbnRcbiAqIG9wdGlvbnMgYW5kIHRoZSBjb29raWVzIHdvdWxkIGJlIG92ZXJ3cml0dGVuIGluIHRoZSBicm93c2VyIHN0b3JhZ2UuXG4gKlxuICogQHBhcmFtIGEgZmlyc3QgQ29va2llIGZvciBjb21wYXJpc29uXG4gKiBAcGFyYW0gYiBzZWNvbmQgQ29va2llIGZvciBjb21wYXJpc29uXG4gKi9cbmZ1bmN0aW9uIGFyZUNvb2tpZXNFcXVhbChhLCBiKSB7XG4gICAgdmFyIHNhbWVTaXRlU2FtZSA9IGEuc2FtZVNpdGUgPT09IGIuc2FtZVNpdGU7XG4gICAgaWYgKHR5cGVvZiBhLnNhbWVTaXRlID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgYi5zYW1lU2l0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2FtZVNpdGVTYW1lID0gYS5zYW1lU2l0ZS50b0xvd2VyQ2FzZSgpID09PSBiLnNhbWVTaXRlLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIHJldHVybiAoaGFzU2FtZVByb3BlcnRpZXMoX19hc3NpZ24oX19hc3NpZ24oe30sIGEpLCB7IHNhbWVTaXRlOiB1bmRlZmluZWQgfSksIF9fYXNzaWduKF9fYXNzaWduKHt9LCBiKSwgeyBzYW1lU2l0ZTogdW5kZWZpbmVkIH0pKSAmJiBzYW1lU2l0ZVNhbWUpO1xufVxuZXhwb3J0cy5hcmVDb29raWVzRXF1YWwgPSBhcmVDb29raWVzRXF1YWw7XG4vKiBGdW5jdGlvbnMgKi9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/nookies/dist/utils.js\n");

/***/ })

};
;