// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-script-url": "off",
    "linebreak-style": "off",
    "arrow-parens": ["off"],
    "compat/compat": "error",
    "consistent-return": "off",
    "comma-dangle": "off",
    "generator-star-spacing": "off",
    "import/no-unresolved": "error",
    "import/no-extraneous-dependencies": "off",
    "no-console": "error",
    "no-use-before-define": "off",
    "no-multi-assign": "off",
    "promise/param-names": "error",
    "promise/always-return": "error",
    "promise/catch-or-return": "error",
    "promise/no-native": "off",
    "react/jsx-no-bind": "off",
    "quotes": ["error", "single"],
    "strict": ["error", "never"],
    "jsx-a11y/no-static-element-interactions": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "error",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": "off",
  },
  "plugins": [
    "import",
    "promise",
    "compat",
    "react"
  ]
}
