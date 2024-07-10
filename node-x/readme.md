


### node-x

this markdown document is a quick start guide, the full documentation in html format can be found at

https://javascript-2020.github.io/code-projects/node-x/node-x.html

<br>

node-x is a script launcher for node.js

<br>

it works by maintaining a list of directories and then a script from any of those directories or their sub directories
can be launched easily by node-x from anywhere on the command line, such as

```
node-x server.js
```

<br>

a directory can be added to node-x directory list by

```
node-x add /work/tmp
```


adds the directory /work/tmp to the directory list

```
node-x add .
```

adds the current directory to node-x

<br>

long commands can be aliased to short words, so a command such as

```
node server.js -p 4000 -cwd /work/www/ -ip 127.0.0.2
```

could be aliased as

```
node-x server
```

<br>

node-x supports multiple configurations that can be switched in and out

a configuration consists of a list of directories and aliases

<br>

### installation

npm global installation is recommended

```
npm install -g node-x
```

<br>

### uninstallation

```
npm uninstall -g node-x
```

