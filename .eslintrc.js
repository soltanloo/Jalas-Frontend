module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules":{
    "react/no-unused-prop-types": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "react/jsx-curly-brace-presence": "off",
    "no-underscore-dangle": "off",
    'max-len': ["error", { "code": 130 }]
  },
  "globals": {
    "localStorage": true,
    "sessionStorage": true,
    "fetch": true,
    "window": true,
  }
};
