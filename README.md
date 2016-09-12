# ESLint - CharlotteJS - Monday, September 12

## References and Tools

- http://eslint.org/
- [built-in rules](http://eslint.org/docs/rules/)
- [AirBnB's style guide](https://github.com/airbnb/javascript)
- [Standard JS](https://github.com/feross/standard)
- Third party [plugins](https://www.npmjs.com/browse/keyword/eslintplugin) and [configs](https://www.npmjs.com/browse/keyword/eslintplugin)
- [ESlint Nibble](https://www.npmjs.com/package/eslint-nibble)
- [Ghooks](https://github.com/gtramontina/ghooks)
- [AST Explorer](http://astexplorer.net/)

## Commands

```sh
# install ESLint
npm install -D eslint

# set up
npm --init

# It will add to your package.json, so you need to install again
npm install

# Run ESlint on the current directory
./node_modules/.bin/eslint .

# Auto-fix
./node_modules/.bin/eslint . --fix

# With cache
./node_modules/.bin/eslint . --cache

# Create a plugin (in a fresh repo)
npm install -g yeoman
yo eslint:plugin
yo eslint:rule # for each rule you want to create

```


## In this repo
- Keynote Presentation (eslint-talk.key)
- Some JS files for playing around (sandbox)
- Code snippets of things I'll probably forget when lots of people are staring at me (cheatsheets)
