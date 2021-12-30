# Antd Management Fast Framework

This project is a repackaging of [Ant Design](https://ant.design/) and [Ant Design Pro](https://pro.ant.design) to quickly build an interface for back-end management projects. Follow is the quick guide for how to use.

## Environment Prepare

setp 1: Install global tools:

```bash
npm: npm install -g husky rimraf lerna
```

or

```bash
cnpm: cnpm install -g husky rimraf lerna
```

or

```bash
yarn: yarn add -g husky rimraf lerna
```

setp 2: Install dependencies `node_modules`:

```bash
npm run lerna:b
```

## Provided Scripts

Antd Management Fast Framework provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Build Framework And Start The Sample Project

```bash
npm run start:build
```

### Start The Sample Project Only

```bash
npm start
```

Wait for execution to complete, Open your browser to browse the website http://localhost:8841, The simulated login account and password is `admin/admin`

### Build Framework

```bash
npm build:f
```

### Example Project Screenshot Preview

[![Alt text](./document/images/01.png)](01.png)

[![Alt text](./document/images/02.png)](01.png)

[![Alt text](./document/images/03.png)](01.png)

[![Alt text](./document/images/04.png)](01.png)

[![Alt text](./document/images/05.png)](01.png)

[![Alt text](./document/images/06.png)](01.png)

[![Alt text](./document/images/07.png)](01.png)

## More

welcome any feedback in our [github](https://github.com/kityandhero/taro-fast-framework).

## Credits

Many thanks to the following individuals, organisations and projects whose work is so important to the success of Antd Management Fast Framework (in no particular order):

- Ant Design
- Ant Design Pro
- Umi
- ...

More dependencies are not listed, thanks all of them.
