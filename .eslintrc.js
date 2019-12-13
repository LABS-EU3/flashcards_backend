module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb", 
        "prettier", 
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "max-len": ["error", 80]
    } 
};