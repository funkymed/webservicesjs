<?php

    if(isset($_GET['u']))
    {
        print file_get_contents(urldecode($_GET['u']));
    }