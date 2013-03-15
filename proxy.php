<?php
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
            $postdata = http_build_query($vars);
            $opts = array('http' =>
                array(
                    'method'  => $method,
                    'header'  => 'Content-type: application/x-www-form-urlencoded',
                    'content' => $postdata
                )
            );
            $context  = stream_context_create($opts);
            print file_get_contents($url, false, $context);
        }else{
            $arr = array();
            foreach($vars as $k=>$v) $arr[]=$k.'='.$v;
            print file_get_contents($url.'?'.implode('&',$arr));
        }
    }