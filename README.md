#atom-shell-template

This is a small template for an [Atom Shell](https://github.com/atom/atom-shell) application. Will open an application and send a message from "backend" to "frontend".

> The Atom Shell framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS. It is based on node.js and Chromium [...]

![Screenshot](https://raw.githubusercontent.com/emiloberg/atom-shell-template/master/docs/screenshot.png)

### What this does

* It's a template App which will open an App window and send a sentence from the backend to the App window.
* It has a development gulp script which will:
    * restart the App every time a server-side (renderer) Javascript file is changed.
    * recompile the SCSS into CSS if a scss file is changed.
    * lint the Javascript with `gulp jslint`.
    * lint the SCSS with `gulp scsslint`.
    * lint both SCSS and Javascript with `gulp lint`.

Included libraries:

* [Materialize CSS](http://materializecss.com/)
* jQuery

### Installation

1. Install all NPM dependencies by running `npm install` in the root directory
2. Install all Bower dependencies by running `bower install` in the `app/browser` directory.

### Running

* Run by running `./run.sh` (or `start.cmd`, it's the same thing)


### Running for development
* Run for development by running `gulp`. This will restart the App every time a js/html/scss file is changed.

#### Linting
* Lint Javascript with [ESLint](http://eslint.org) by running `gulp jslint`.
* Lint SCSS with [SCSS-Lint](https://github.com/causes/scss-lint) by running `gulp scsslint`.
* Lint both SCSS and Javascript by running `gulp lint`.
