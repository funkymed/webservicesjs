<?php
/**
 * Proxy to load file or webservice in ajax call
 * Just call this file with a varirable called 'u'  who contain the url
 */
$url    = '';
$method = '';
$vars   = array();

if(isset($_GET['u']))
{
    $url = $_GET['u'];
    unset($_GET['u']);
    $vars = $_GET;
    $method = 'GET';
}else if(isset($_POST['u']))
{
    $url = $_POST['u'];
    unset($_POST['u']);
    $vars = $_POST;
    $method = 'POST';
}

if($url!='')
{
    if($method=='POST')
    {
        $fields_string='';
        foreach($vars as $key=>$value) { 
            $fields_string .= $key.'='.$value.'&'; 
        }
        rtrim($fields_string, '&');

        $ch = curl_init();

        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_POST, count($vars));
        curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);

        $result = curl_exec($ch);

        curl_close($ch);

    }else{
        $arr = array();
        foreach($vars as $k=>$v) $arr[]=$k.'='.$v;


        $vars = implode('&',$arr);
        $vars = str_replace(' ','+',$vars);

        
        print file_get_contents($url.'?'.$vars);
    }
}