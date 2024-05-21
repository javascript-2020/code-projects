
<br>
<h3>http-file-upload</h3>

http-file-upload is a http server whose only function is to upload and download files ( of any size )
the http server has been designed as a single, no dependency, file for ease of use and portability

files can be uploaded or downloaded using the built browser interface or any http request, such as those made through node.js, php, curl, python

### install
global installation is the recommended way to install

    npm install http-file-upload -g

**http-file-upload** can then be run from anywhere on the file system by typing on the command line

      http-file-upload
      
note : **windows powershell users**
running powershell scripts are disabled by default, to get the script to run normally
in **powershell** users will have to delete ` http-file-upload.ps1 ` file from the default npm script installation directory, this is usually ` c:/users/<user_name>/AppData/Roaming/npm/ `

see also alternative installation methods below

### uninstall
after global installation

     npm uninstall http-file-upload -g 

<br>


<br>
<br>




the server listens on all network interfaces, the default port is 3000

https://127.0.0.1:3000/ or https://127.0.0.1:3000/hello

<br>

**http-file-upload** supports the following command line parameters

-p port
sets the port the server listens on 

-d dir
sets a directory to put new uploads or where to find files for download, its relative to the directory the script was started from, if the directory does not exist it is created

-cwd
sets the current working directory for the script

https | http
set whether the server uses https ( default ) or http
if you need the ca cert you can download it from ` /cacert `
<br>

### example useage

if http-file-upload has been installed globally, and you have some files you want to access over http in a directory ` /work/tmp/ ` 
1. change to directory ` /work/tmp/ `
2. type ` http-file-upload ` press enter
3. open a web browser at https://localhost:3000/  or perform a http request 
>
        
        var url     = 'https://localhost:3000/download?myfile.js';
        var opts    = {rejectUnauthorized:false};
        
        require('https').get(url,opts,async res=>{
        
        			var body    = '';
        			for await(data of res)body   += data;
        			console.log(body);
        			
        });


to download all files in a directory via nodejs
        

    var url     = 'https://localhost:3000/';
    var opts    = {rejectUnauthorized:false};
    var https   = require('https');
    
    https.get(`${url}download-list`,opts,async res=>{
    
     			var body    = '';
     			for await(data of res)body   += data;
     			var json    = JSON.parse(body);
     			json.files.forEach(file=>{
     			
	                https.get(`${url}download?${file}`,opts,res=>{
	                   
	                      var fd    = fs.createWriteStream(file);
	                      res.pipe(fd);
	                 			
	                });
        			      
    			});
   			
    });



to upload a file in nodejs
	
	var url     = 'https://localhost:3000/upload?myfile.txt';
	var body    = require('fs').readFileSync('myfile.txt');

	var req = require('https').request(url,{method:'post'},rec);
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

to upload a file from the browser

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
<br>
<br>

### alternative installation methods

### install locally :

    npm install http-file-upload

and then run using the command from that directory

    npx http-file-upload

if you would then like http-file-upload to be accessible from anywhere on the file system, http-file-upload directory should be added to the system path variable, http-file-upload comes with the appropriate shell scripts :

   windows ..... `http-file-upload.bat ` 
  mac ............... ` http-file-upload.sh `
  linux .............. ` http-file-upload.sh `





