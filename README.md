WebservicesJS
=============
Test all your webservices in easy and fast way.

Demo :

http://www.cyrilpereira.com/webservicesjs/

Author :

Cyril Pereira http://www.cyrilpereira.com

Usage:

var myforms = [
    {
        action:'localfile.php?',
        title:'test',
        inputs:[
            {label:'field1',name:'name1',defaultvalue:'value1',type:'text'}
        ]
    }
];

$(myforms).webservices();


if need to to access other domain, add a proxyPath, i code a little php (work only in method GET) thing to do that

var options = {proxyPath:'proxy.php?u='};
$(myforms).webservices(options);

if you want to change the loader, do this :

var options = {loaderGif:'ajax-loader.gif'};
$(myforms).webservices(options);