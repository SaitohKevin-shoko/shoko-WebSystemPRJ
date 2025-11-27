function onSubmit(form, btnName){
    form.buttonName.value=btnName;
    form.submit();
}

function initPicture(picField, num_pix) {
    var len = document.images.length;
    for (i = 0; i < len; i++) {
        var objImg = window.document.images[i];
        if (objImg.name == picField) {
            if (objImg.width > num_pix) {
                objImg.width = num_pix;
            }
        }
    }
}

function initPicture2(picField, num_pix_width, num_pix_height) {
    var len = document.images.length;
    for (i = 0; i < len; i++) {
        var objImg = window.document.images[i];
        if (objImg.name == picField) {
            if (objImg.width > num_pix_width) {
                objImg.width = num_pix_width;
            }
            if (objImg.height > num_pix_height) {
                objImg.height = num_pix_height;
            }
        }
    }
}

function initPictureRasio(photoName, width, height) {
    var len = document.images.length;

    for (i = 0; i < len; i++) {
        var objImg = window.document.images[i];
        if (objImg.name == photoName) {
            var imgWidth = objImg.width;
            var imgHeight = objImg.height;

            if (imgWidth > width || imgHeight > height) {
                var rasio = width / imgWidth;
                var heightRasio = height / imgHeight;

                if (rasio > heightRasio) {
                    rasio = heightRasio;
                }

                objImg.width = imgWidth * rasio;
                objImg.height = imgHeight * rasio;
            }
        }
    }
}