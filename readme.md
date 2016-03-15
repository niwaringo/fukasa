# fukasa [![npm version](https://badge.fury.io/js/fukasa.svg)](https://badge.fury.io/js/fukasa)

vanilla js scroll library

## Install

### npm

```JavaScript
npm i fukasa
```

### file download

[download from here](https://raw.githubusercontent.com/niwaringo/fukasa/master/fukasa.js)

## Usage

### use in %
```JavaScript
fukasa.on(0.5, function() {
    var dom = document.createElement("div");
    dom.id = "dom05";
    document.body.appendChild(dom);
});
```
### The Dom to target
```JavaScript
var domtarget = document.getElementById("domtarget");
fukasa.on(domtarget, function() {
    domtarget.innerHTML = "domtarget OK";
});
```
