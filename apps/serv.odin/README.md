# Odin

Customer facing server

## Common problem

**Unable to get access token with graphql playground**
You must configure the graphql settings
Click on the gear icon on the top right
Add the following:

```
  "request.credentials": "include"
```
