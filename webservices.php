<?php

if(isset($_GET['user']))
{
    $_GET['method']='get';
    print json_encode($_GET);
}

if(isset($_POST['user']))
{
    $_POST['method']='post';
    print json_encode($_POST);
}