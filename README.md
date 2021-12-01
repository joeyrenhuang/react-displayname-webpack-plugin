- It would set the react app tree like a project tree displayed by file-path
- In react devtools Component panel, add filter hide which name matchs ^(?!src), results your source file only as nest tree like below.
- In addition, it track your click events and trying to open the source file localy and move to the position where Component defined.
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
