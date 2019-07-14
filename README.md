# urldiff
> URL difference processor, sorter and filter

[![Build Status](https://travis-ci.org/perry-mitchell/urldiff.svg?branch=master)](https://travis-ci.org/perry-mitchell/urldiff) [![npm version](https://badge.fury.io/js/urldiff.svg)](https://www.npmjs.com/package/urldiff)

## About

**urldiff** is a library for parsing, diff'ing and scoring URLs based on their differences. These scores can then be used for comparing similar URLs and then sorting them within result sets.

Install by running `npm install urldiff --save`.

urldiff is designed to work on Node 6 and up.

## Usage

The `urldiff` package provides a couple of methods for working with URLs and their scores. You can easily calculate the likeness score of 2 URLs by using `calcuateURLScore`:

```javascript
const { calcuateURLScore } = require("urldiff");

const score = calcuateURLScore("http://somesite.com/test.html", "https://test.somesite.com/");
// `score` is a number between 0 and 1, where 1 is more similar
```

You can also sort an array of URLs or objects containing URLs:

```javascript
const { sortByURL } = require("urldiff");

sortByURL(
    "https://test.com", // reference URL
    [
        { name: "two", url: "http://page.org/sub" },
        { name: "one", url: "http://test.com/page.html" }
    ], // Array of items to sort
    0, // Min diff score
    item => item.url // Getter to fetch the URL
);

// Output would be:
// [
//     { name: "one", url: "http://test.com/page.html" },
//     { name: "two", url: "http://page.org/sub" }
// ]
```
