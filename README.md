WebservicesJS
=============
Test all your webservices in easy and fast way.

Demo :

http://www.cyrilpereira.com/webservicesjs/

Author :

Cyril Pereira http://www.cyrilpereira.com

Usage:

You'll need to have jQuery (http://jquery.com) and Bootstrap (http://twitter.github.com/bootstrap).

Just add to your html page
    <script type="text/javascript" src="webservicesjs/js/webservices.min.js"></script>

And then create a JSON's object like this

var myforms = [
    {
        action:'http://www.urlwebservices.com/yourwebservices.php',
        title:'test',
        inputs:[
            {label:'field1',name:'name1',defaultvalue:'value1',type:'text'}
        ]
    }
];

Finally start the engine :

$(myforms).webservices();

If need to to access other domain, add a proxyPath, take a look at proxy.php

var options = {proxyPath:'proxy.php'};
$(myforms).webservices(options);

Finaly, if you want to change the loader, do this :

var options = {loaderGif:'ajax-loader.gif'};
$(myforms).webservices(options);