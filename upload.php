<?php
/***********************************************

  "upload.php"

  Created by Michael Cheng on 06/09/2015 11:03
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

if(isset($_FILES['file'])) {
	echo 'Server received the file: ' . $_FILES['file']['name'] . '. No upload will really be done.';
}
?>