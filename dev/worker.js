


        var socket;
        var onopen;
        
        self.onmessage=function(event){
        
              var json    = event.data;
              switch(json.type){
              
                case 'init'               : init(json);                 break;
                case 'upload'             : upload(json);               break;
                case 'download'           : download(json);             break;
                case 'download-list'      : download.list(json);        break;
                
              }//switch
              
        }//onmessage
        
        function init(json){
        
              var url             = json.url;
              socket              = new WebSocket(url);
              socket.onerror      = console.error;
              socket.onmessage    = event=>self.postMessage(event.data);
              socket.onopen       = ()=>{
              
                    if(onopen){
                          onopen();
                    }else{
                          onopen    = true;
                    }
                    
              };
              
        }//init
        
        function onready(json){
        
              var fn    = ()=>socket.send(JSON.stringify(json));
              if(onopen){
                    fn();
              }else{
                    onopen    = fn;
              }
              
        }//onready
        
  //:
  
        function upload(json){
        
              onready(json);
              self.onmessage    = event=>{
              
                    var data    = event.data;
                    var type    = datatype(data);
                    switch(type){
                    
                      case 'object'   : socket.send(JSON.stringify(event.data));      break;
                      case 'blob'     : socket.send(data);                            break;
                      
                    }//switch
                    
              };
              
        }//upload
        
  //:
  
        function download(json){
        
              onready(json);
              self.onmessage    = event=>socket.send(JSON.stringify(event.data));
              
        }//download
        
        download.list=function(json){
        
              onready(json);
              
        }//list
        
  //:
  
        function datatype(value){
        
              var str     = Object.prototype.toString.call(value);
              var i       = str.indexOf(' ');
              var type    = str.slice(i+1,-1);
              type        = type.toLowerCase();
              return type;
              
        }//datatype
        
        
        
        