/**
 * Example
 */

var myforms = [
    {
        action:'http://www.cyrilpereira.com/webservicesjs/webservices.php',
        title:'test GET',
        method:'GET',
        inputs:[
            {label:'user',name:'user',defaultvalue:'demo',type:'text'},
            {label:'password',name:'password',defaultvalue:'pass',type:'text'},
            {label:'action',name:'action',defaultvalue:'login',type:'text'}
        ]
    },{
        action:'http://www.cyrilpereira.com/webservicesjs/webservices.php',
        title:'Test POST',
        method:'POST',
        inputs:[
            {label:'user',name:'user',defaultvalue:'demo',type:'text'},
            {label:'password',name:'password',defaultvalue:'pass',type:'text'},
            {label:'action',name:'action',defaultvalue:'login',type:'text'}
        ]
    }
];


$(myforms).webservices({proxyPath:'proxy.php'});