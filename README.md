
<br>
<h3>http-file-upload</h3>

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

      http-file-upload
      
<br>
      
note : **windows powershell users**
running powershell scripts are disabled by default

to get the script to run normally in powershell users will have to delete ` http-file-upload.ps1 ` file from the default npm script installation directory

this is usually ` c:/users/<user_name>/AppData/Roaming/npm/ `

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

the server listens on all network interfaces, the default port is 3000
<br>

the built in user interface is accessible at ( on all network interfaces )

https://127.0.0.1:3000/ or https://127.0.0.1:3000/hello

<br>
<br>

http-file-upload supports the following command line parameters
<br>
<br>

-p port

sets the port the server listens on 
<br>
<br>

-d dir

sets a directory to put new uploads or where to find files for download, its relative to the serving directory, if the directory does not exist it is created
<br>
<br>

-cwd

sets the current working directory for the script
<br>
<br>

https | http

set whether the server uses https ( default ) or http
if you need the ca cert you can download it from ` /cacert `
<br>
<br>

-v

prints the current version of the program
<br>
<br>

-cert filename

specify a public certificate to use, pem format
<br>
<br>

-key filename

specify a private key to use, pem format
<br>
<br>
note: [generate https certificates](https://codepen.io/matt-2016/pen/KKYvOxp)
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

***

### example useage

upload/download files in the current directory 

( requires global installation or the launch script on the system path )

`http-file-upload`

<br>
upload/download files in the current directory using port 4000

( requires global installation or the launch script on the system path )

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
    
download with curl

```
curl --insecure https://localhost:3000/download?my-file.txt
```    

<br>

serving files from an alternate directory 

if you installed http-file-upload locally at `/work/http-file-upload/`
and wish to access files at ` /work/tmp/ `

```
npx http-file-upload.js -cwd /work/tmp/
```

if you downloaded the single file http-file-upload.js to `/work/http-file-upload/`
and wish to access files at ` /work/tmp/ `

```
node http-file-upload.js -cwd /work/tmp/
```

<br>

***

### alternative installation methods

### install locally :

    npm install http-file-upload

this will download http-file-upload to ` ./node_modules/http-file-upload `

http-file-upload can then be run using the command

    npx http-file-upload

### install from github

download the repository as a zip file

    https://github.com/javascript-2020/http-file-upload/zipball/main/
    
download the single file `http-file-upload.js` from github

    https://raw.githubusercontent.com/user/javascript-2020/main/http-file-upload.js

clone the repository 

    git clone https://github.com/javascript-2020/http-file-upload.git
https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

<br>

if you would then like http-file-upload to be accessible from anywhere on the file system, the http-file-upload directory should be added to the system path,
http-file-upload comes with the following shell scripts to launch the process :

   windows ..... `http-file-upload.bat ` 
   
  mac ............... ` http-file-upload.sh `
  
  linux .............. ` http-file-upload.sh `

<br>
<br>

***

https://github.com/javascript-2020/http-file-upload

https://www.npmjs.com/package/http-file-upload



