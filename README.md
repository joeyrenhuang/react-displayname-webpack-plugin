- Use path to as displayName easily navigate to the file you are looking for. It would only set displayName for 'export default'.
- In react devtools Component panel, add filter hide which name matchs ^(?!src), results your source file only as nest tree like below.
- In addition, it track your click events and trying to open the source file localy.
- Click on dom by times as:
  - 3, open the most near Component from src
  - 4, open the most near Component from node_modules
  - 5, next click would same as [3]

![Kiku](1.png)

1. Install
```
  npm i -D react-displayname-webpack-plugin
```
2. Add to webpack plugin
```
  new (require('react-displayname-webpack-plugin'))()
```
