function initImageView(photoName) {
    var len = document.images.length;

    for (i = 0; i < len; i++) {
        var objImg = window.document.images[i];

        if (objImg.name == photoName) {
            if (objImg.width > 500) {
              objImg.width = 500;
            }
        }
    }
}

function initImageView130(photoName) {
    var len = document.images.length;

    for (i = 0; i < len; i++) {
        var objImg = window.document.images[i];
        if (objImg.name == photoName) {
            if (objImg.width > 130) {
              objImg.width = 130;
            }
        }
    }
}

function initImageView50(photoName) {
    var len = document.images.length;

    for (i = 0; i < len; i++) {
        var objImg = window.document.images[i];
        if (objImg.name == photoName) {
            if (objImg.width > 50) {
              objImg.width = 50;
            }
        }
    }
}