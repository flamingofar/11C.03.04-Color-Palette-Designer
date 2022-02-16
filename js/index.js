/** @format */
("use strict;");

const colorPicker = document.querySelector("#color");
const hexV = document.querySelector(".hex");
const rgbV = document.querySelector(".rgb");
const hslV = document.querySelector(".hsl");
const cssV = document.querySelector(".css");

window.addEventListener("DOMContentLoaded", setup);
// Setup
function setup() {
	hexV.textContent = colorPicker.value;
	rgbV.textContent = "rgb: 255, 255, 255";
	hslV.textContent = "hsl: 0, 0, 100";
	cssV.textContent = "rgb(0, 0, 0)";
	getColors();
}

//************************ MODEL ************************
// Get HEX color values
function getColors() {
	let hexColorValue, rgbColorValue;
	colorPicker.addEventListener("input", (e) => {
		let colorPickValue = e.target.value;

		// HEX Value
		hexColorValue = `${colorPickValue}`;
		//RGB Value
		rgbColorValue = hexToRgb(hexColorValue);
		//CSS Value
		cssColorValue = rgbToCss(rgbColorValue);
		//HSL Value
		hslColorValue = rgbToHsl(rgbColorValue.r, rgbColorValue.g, rgbColorValue.b);

		displayColors(hexColorValue, rgbColorValue, cssColorValue, hslColorValue);
	});
}

//************************ VIEW ************************
function displayColors(hex, rgb, css, hsl) {
	// Show Values
	displayHex(hex);
	displayRgb(rgb);
	displayHsl(hsl);
	displayCss(css);

	//Set body background color
	const body = document.querySelector("body");
	body.style.backgroundColor = hex;
}

//************************ Controllor ************************

/*
 * Display HEX
 */
function displayHex(hex) {
	hexV.textContent = hex;
}

/*
 * Display RGB
 */
function displayRgb(rgb) {
	rgbV.textContent = `rgb: ${rgb.r}, ${rgb.g},${rgb.b}`;
}

/*
 * DISPLAY HSL
 */
function displayHsl(hsl) {
	hslV.textContent = `hsl: ${hsl.h}, ${hsl.s}, ${hsl.l}`;
}

/*
 * Display CSS
 */
function displayCss(css) {
	cssV.textContent = `css: rgb(${css.r}, ${css.g}, ${css.b})`;
}

/*
 * HEX to RGB
 */
function hexToRgb(hexString) {
	r = parseInt(hexString.substring(1, 3), 16);
	g = parseInt(hexString.substring(3, 5), 16);
	b = parseInt(hexString.substring(5, 7), 16);
	// return { r: r, g: g, b: b };
	return { r, g, b };
}

/*
 *  RGB TO HEX
 */
function rgbToHex(rgbObject) {
	let r, g, b;
	r = convertion(rgbObject.r);
	g = convertion(rgbObject.g);
	b = convertion(rgbObject.b);
	// rgbToHsl(rgbObject.r, rgbObject.g, rgbObject.b);
	return `#${r}${g}${b}`;
}
function convertion(color) {
	let hex = color.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
}

/*
 *CSS to RGB
 */
function rgbToCss(rgb) {
	let r, g, b;
	r = rgb.r;
	g = rgb.g;
	b = rgb.b;
	return { r, g, b };
	// console.log(`RGB Values are: r:${r}, g:${g}, b:${b}`);
}

/*
 * HSL Convertion
 */
function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	let h, s, l;

	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);

	if (max === min) {
		h = 0;
	} else if (max === r) {
		h = 60 * (0 + (g - b) / (max - min));
	} else if (max === g) {
		h = 60 * (2 + (b - r) / (max - min));
	} else if (max === b) {
		h = 60 * (4 + (r - g) / (max - min));
	}

	if (h < 0) {
		h = h + 360;
	}

	l = (min + max) / 2;

	if (max === 0 || min === 1) {
		s = 0;
	} else {
		s = (max - l) / Math.min(l, 1 - l);
	}
	// multiply s and l by 100 to get the value in percent, rather than [0,1]
	s *= 100;
	l *= 100;

	return { h: Math.floor(h), s: Math.floor(s), l: Math.floor(l) };
}
