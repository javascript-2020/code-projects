[![home](https://javascript-2020.github.io/images/home.png)](https://github.com/javascript-2020?tab=repositories)

<h3>http-file-upload</h3>

[npm : http-file-upload](https://www.npmjs.com/package/http-file-upload)

<br>
<br>

this markdown document is essentially a quick start guide

the complete guide, in html format, is available at

https://javascript-2020.github.io/code-projects/http-file-upload/http-file-upload.html

<br>
<br>

http-file-upload is a http server whose only function is to upload and download files ( of any size )

the http server has been designed as a single, no dependency, file for ease of use and portability

files can be uploaded and downloaded
- using the built browser interface
- by a http request, such as those made through node.js, php, curl, python, c++, c#, java

<br>

***

### install

npm global installation is the recommended way to install

    npm install http-file-upload -g
    
http-file-upload can then be run from anywhere on the file system by typing on the command line

      http-file-upload -version
      
<br>

note : **windows powershell users**

running powershell scripts are disabled by default

to get the script to run normally in powershell users will have to delete

` http-file-upload.ps1 `

file from the default npm script installation directory, this is usually

` c:/users/<user_name>/AppData/Roaming/npm/ `

<br>
<br>

see also alternative installation methods below

<br>

***

### uninstall

after global npm installation

     npm uninstall http-file-upload -g
     
<br>

***

### operation

the server listens on all network interfaces, the default port is 3000
<br>

the built in user interface is accessible, on all network interfaces, at

https://127.0.0.1:3000/ or https://127.0.0.1:3000/hello

<br>
<br>

http-file-upload supports the following command line parameters

 the parameters can be specified with or without the dash or with a double dash
<br>
<br>


-p port

sets the port the server listens on, default 3000
<br>
<br>

-d dir

sets a directory to put new uploads or where to find files for download, its relative to the serving directory, if the directory does not exist it is created, default not used
<br>
<br>

-cwd

sets the current working directory for the script, default current directory
<br>
<br>

-https | -http

set whether the server uses https or http, default https
<br>
<br>

-cert cert-file key-file

specify a public certificate and private key to use, any order, pem format

note: [generate https certificates](https://javascript-2020.github.io/generate-https-certificate.html)
<br>
<br>

-version

prints the current version of the program
<br>
<br>

-help

bring up quick help on the command line

<br>
<br>
<br>

download a file using a http request at url

https://127.0.0.1:3000/download?filename

<br>

a list of all files available to download is available from the following url, an array in JSON format is returned

https://127.0.0.1:3000/download-list

<br>

upload a file to this url using a http request

https://127.0.0.1:3000/upload?filename

<br>

the server public certificate is available to download at

https://127.0.0.1:3000/cert

<br>

the server can be quit on the command line by pressing

    escape | q | ctrl-c
    
***

### example useage

upload/download files in the current directory

requires global installation or the launch script on the system path

`http-file-upload`

<br>
upload/download files in the current directory using port 4000

requires global installation or the launch script on the system path

`http-file-upload -p 4000`

<br>

if http-file-upload has been installed globally, and you have some files you want to access over http in a directory ` /work/tmp/ `
1. change to directory ` /work/tmp/ `
2. type ` http-file-upload ` press enter
3. open a web browser at https://localhost:3000/  or perform a http request

```

var url     = 'https://localhost:3000/download?myfile.js';
var opts    = {rejectUnauthorized:false};

require('https').get(url,opts,async res=>{

	var body    = '';
	for await(data of res)body   += data;
	console.log(body);
 
});

```

to download all files in a directory via nodejs

```

var url     = 'https://localhost:3000/';
var opts    = {rejectUnauthorized:false};
var https   = require('https');

https.get(`${url}download-list`,opts,async res=>{

	var body    = '';
	for await(data of res)body   += data;
	var json    = JSON.parse(body);
 
	json.files.forEach(file=>{
 
         https.get(`${url}download?${file}`,opts,res=>{
         
               var fd    = fs.createWriteStream(filename);
               res.pipe(fd);
               
         });
         
	});
 
});

```


to upload a file in nodejs

```

var url     = 'https://localhost:3000/upload?my-file.txt';
var body    = require('fs').readFileSync('my-file.txt');

var req 	= require('https').request(url,{method:'post'},rec);
req.write(body);
req.end();

req.on('error', function(err){
    console.log(err);
});

async function rec(res){

    var body = '';
    for await(data of res)body+=data;
    console.log(body);
    
}//rec

```

to upload a file from the browser

```

var input         = document.createElement('input');
input.type        = 'file';
input.onchange    = onchange;
input.click();

async function onchange(e){

      var file    = input.files[0];
      var url     = `https://localhost:3000/upload?${file.name}`;
      var res     = await fetch(url,{method:'post',body:file});
      var txt     = await res.text();
      console.log(txt);
      
}//onchange

```

download a file with curl

```
curl --insecure https://localhost:3000/download?my-file.txt
```

<br>

serving files from an alternate directory

if you installed http-file-upload locally at `/work/http-file-upload/` and wish to access files at `/work/tmp/`

```
npx http-file-upload -cwd /work/tmp/
```

if you downloaded the single file http-file-upload.js to `/work/http-file-upload/` and wish to access files at `/work/tmp/`

```
node http-file-upload -cwd /work/tmp/
```

<br>

***

### alternative installation methods

### install locally :

    npm install http-file-upload
    
this will download http-file-upload to ` ./node_modules/http-file-upload `

http-file-upload can then be run using the command, from the directory which you issued the npm install command

    npx http-file-upload
    
### install from github

download the project as a zip file

[download this project from github](https://javascript-2020.github.io/utils/download-a-directory-from-a-github-repository/download-a-directory-from-a-github-repository.html?owner=javascript-2020&repo=code-projects&branch=main&path=http-file-upload&download)

download the single file `http-file-upload.js` from github, ( right click - save link as )

https://raw.githubusercontent.com/javascript-2020/code-projects/main/http-file-upload/http-file-upload.js

<br>

### system path environment variable

if you would then like http-file-upload to be accessible from anywhere on the file system, the directory

```
http-file-upload/ext/
```

 should be added to the system path,
 
http-file-upload comes with the following shell scripts to launch the process :

windows ............ ` http-file-upload.bat `

mac ................ ` http-file-upload.sh `

linux .............. ` http-file-upload.sh `

<br>

### node-x

i also have another utility for running node.js scripts [node-x](#)

<br>
<br>

***

https://github.com/javascript-2020/http-file-upload

https://www.npmjs.com/package/http-file-upload



