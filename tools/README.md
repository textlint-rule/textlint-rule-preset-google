# Package Owner tools

## set-publish-config.js

`set-publish-config.js` set `publishConfig` to each packages.

```
  "publishConfig": {
    "access": "public"
  }
```

lerna need to `publishConfig` for publishing at first time.

- <https://github.com/lerna/lerna/issues/914#issuecomment-318497928>

## update-rule-preset.js

`update-rule-preset.js` update rule preset package.json and source.