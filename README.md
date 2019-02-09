# \<pre-render-tron\>

Web component wrapper around [render-tron](https://render-tron.appspot.com/).

Syntax:

```html
<pre-render-tron scale="0.5" href="https://www.webcomponents.org/"></pre-render-tron>
```

The "scale" attribute / property is optional. It zooms the content (larger or smaller).

For IE11, a fetch polyfill is required.

pre-render-tron emits events "fetch-in-progress-changed", "error-text-changed", and "error-response-changed" as applicable.

If property / attribute "disabled" is set, the fetch will still take place, but the result won't be loaded until "disabled" is removed. If disabled is set again, the content will be unloaded, but saved for the future if disabled is removed again.

<!--
```
<custom-element-demo>
  <template>
    <div>
      <h3>Basic pre-render-tron demo</h3>
      <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
      <script type="module" src="https://unpkg.com/pre-render-tron@0.0.3/pre-render-tron.js?module"></script>
      <pre-render-tron scale="0.8" href="https://www.theonion.com/"></pre-render-tron>
    </div>
    </template>
</custom-element-demo>
```
-->

## Syntax

<!--
```
<custom-element-demo>
<template>
    <div>
        <wc-info package-name="npm install pre-render-tron" href="https://unpkg.com/pre-render-tron@0.0.6/html.json"></wc-info>
        <script type="module" src="https://unpkg.com/wc-info@0.0.26/wc-info.js?module"></script>
    </div>
</template>
</custom-element-demo>
```
-->


## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

