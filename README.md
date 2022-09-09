# Taro Fast Framework

This project is a repackaging of [Taro](https://taro-docs.jd.com/) to quickly build an interface for back-end management projects. Follow is the quick guide for how to use.

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

Taro Fast Framework provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Build Framework And Start The Weapp Sample Project

```bash
npm run start:weapp:build
```

### Start The Sample Project Only

```bash
npm run start:weapp:simple

(Ensure that the build is executed at least once)
```

Wait for execution to complete, you can open wechat development tool to view.

### Build Framework

```bash
npm run build:all
```

### Example Project Screenshot Preview

[![Alt text](https://m1.im5i.com/2022/09/10/Uqe7ud.png?raw=true)](01.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/Uqezjw.png?raw=true)](02.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/Uqe5yG.png?raw=true)](03.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/Uqe2SF.png?raw=true)](04.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/UqeGmY.png?raw=true)](05.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/UqeSnK.png?raw=true)](06.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/UqeeGC.png?raw=true)](07.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/UqefwH.png?raw=true)](08.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/Uqeaia.png?raw=true)](09.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/UqelqT.png?raw=true)](10.png)

******

[![Alt text](https://m1.im5i.com/2022/09/10/UqeyyA.png?raw=true)](11.png)

### Online Preview

<img src="https://m1.im5i.com/2022/09/10/Uqe6mS.jpg?raw=true" width=256 height=256 />

## More

welcome any feedback in our [github](https://github.com/kityandhero/taro-fast-framework).

## Credits

Many thanks to the following individuals, organisations and projects whose work is so important to the success of Taro Fast Framework (in no particular order):

- Taro
- Rollup
- Lodash
- ...

More dependencies are not listed, thanks all of them.
