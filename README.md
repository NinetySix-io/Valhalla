# Valhalla

This is a monorepo on top of turborepo

<br />

---

[![DeepSource](https://deepsource.io/gh/NinetySix-io/Valhalla.svg/?label=active+issues&show_trend=true&token=jA7-DpUbdnf-SZGnpAl2ibgy)](https://deepsource.io/gh/NinetySix-io/Valhalla/?ref=repository-badge)

[![thor-ci](https://github.com/NinetySix-io/Valhalla/actions/workflows/thor.yaml/badge.svg?branch=main)](https://github.com/NinetySix-io/Valhalla/actions/workflows/thor.yaml)

---

<br />
<br />

## Set up

### First time

### Notes

- Never do `import type` in serv apps, this causes app to not work properly

#### Prerequisite

- Node 14+
- pnpm
- MongoDB
- Protobuf
  - `brew install protobuff`

#### Set up

```bash
pnpm i
```

### Environment

Need to make a .env file for each apps

- [Odin](./apps/odin/src/config/environment/index.ts)

<br />
<br />
<hr />

### Development

```bash
pnpm run dev
```
