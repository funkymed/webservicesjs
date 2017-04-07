#WebservicesJS

Test all your webservices in easy and fast way.

Info : http://funkymed.github.com/webservicesjs/
GitHub : https://github.com/funkymed/webservicesjs

##Demo

med.planet-d.net/demo/web/webservicesjs

##Author

Cyril Pereira <cyril.pereira@gmail.com>

##Documentation

You'll need to have jQuery (http://jquery.com) and Bootstrap (http://twitter.github.com/bootstrap).

If you got my files, no need to do more things, just edit the forms.js

~~~
var myforms = [
    {
        action:'http://www.urlwebservices.com/yourwebservices.php',
        title:'test',
        method:'GET',
        inputs:[
            {label:'field1',name:'name1',defaultvalue:'value1',type:'text'}
        ]
    }
];
~~~
Finally start the engine :
~~~
$(myforms).webservices();
~~~
If need to to access other domain, add a proxyPath, take a look at proxy.php
~~~
var options = {proxyPath:'proxy.php'};
$(myforms).webservices(options);
~~~
Finaly, if you want to change the loader, do this :
~~~
var options = {loaderGif:'ajax-loader.gif'};
$(myforms).webservices(options);
~~~
Now you can use your variable directly in url, in this exemple (field1) will be replaced by the value of the field
~~~
var myforms = [
    {
        action:'http://www.urlwebservices.com/(field1)',
        title:'test',
        method:'GET',
        inputs:[
            {label:'field1',name:'name1',defaultvalue:'value1',type:'text'}
        ]
    }
];
~~~
