//Danh sách hình ảnh:
var arr_img = [
    "url(./img/1.png)", "url(./img/2.png)", "url(./img/3.png)", "url(./img/4.png)", "url(./img/5.png)", "url(./img/6.png)", "url(./img/7.png)", "url(./img/8.png)"
]

//list grid-item
var arrGridItem = document.querySelectorAll("img#id1");

var tmp_img1 = null;
var vtri_img1 = 16;
var vtri_img2 = 16;

var arrayImage = new Array();
for (var i = 0; i < 15; i++) {
    arrayImage[i] = null;
}

//Xử lý khi ấn nút
function CheckStatus(k) {
    if (arrGridItem[k].src != "#") {
        arrGridItem[k].src = arrayImage[k];
        if (tmp_img1 == null) {
            tmp_img1 = arrayImage[k];
            vtri_img1 = k;
            //arrGridItem[k].style.backgroundImage=arrayImage[k];
            //setTimeout(function(){arrGridItem[k].src="img/disable.jpg";}, 1000);

        } else {
            if (k != vtri_img1) {
                if (tmp_img1 == arrayImage[k]) {
                    setTimeout(function() {
                        arrGridItem[k].src = "#";
                        arrGridItem[vtri_img1].src = "#";
                        tmp_img1 = null;
                    }, 500);
                } else {
                    setTimeout(function() {
                        arrGridItem[k].src = "img/disable.jpg";
                        arrGridItem[vtri_img1].src = "img/disable.jpg";
                        tmp_img1 = null;
                    }, 500);
                }
            }
        }
    }
}

//ẩn nút play
function letPlay() {
    document.getElementById("start").style.display = "none";
    document.getElementById("progress").style.display = "";

    for (var i = 0; i < 8; i++) {
        //Tìm vị trí để nhúng hình ảnh vào
        //Nếu đã có ảnh rồi thì lặp lại tìm vị trí mới
        do {
            var tmp1 = Math.floor(Math.random() * 16);
        } while (arrayImage[tmp1] != null);
        arrayImage[tmp1] = arr_img[i];

        do {
            var tmp2 = Math.floor(Math.random() * 16);
        } while (arrayImage[tmp2] != null);
        arrayImage[tmp2] = arr_img[i];
    }
    for (var i = 0; i < 16; i++) {
        arrGridItem[i].src = "img/disable.jpg";
    }
}



//Chuyển các số nhỏ hơn 10 thành 01, 02, 03...
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//Tính thời gian hiện tại đã chơi
function progressTime(min, sec) {
    var totalTime = 600;
    var presentTime = min * 60 + sec;
    return (presentTime / totalTime) * 100;
}

//Hiển thị thời gian đang chơi
//Thời gian giới hạn là 10 phút
var sec = min = 0;

function getTimePlay() {

    var timeout, tmp;

    function BatDauTinh() {

        if (sec == 60) {
            sec = 0;
            min += 1;
        }
        tmp = progressTime(min, sec);

        if (min == 10 && sec == 0) {
            document.getElementById("time-play").innerHTML = checkTime(min) + ":" + checkTime(sec);
            document.getElementById("myprogressbar").style.width = tmp + "%";
            /*Ý tưởng: Hiện cửa sổ popup thông báo điểm và nút reset */
            alert('Hết giờ');
            clearTimeout(timeout);
            return;
        }
        /*Hiển thị đồng hồ*/

        document.getElementById("time-play").innerHTML = checkTime(min) + ":" + checkTime(sec);
        document.getElementById("myprogressbar").style.width = tmp + "%";
        if (tmp >= 30) {
            document.getElementById("myprogressbar").style.backgroundColor = "#ffc107";
        }
        if (tmp >= 80) {
            document.getElementById("myprogressbar").style.backgroundColor = "#dc3545";
        }
        timeout = setTimeout(function() {
            sec += 1;
            BatDauTinh();
        }, 1000);
    }
    BatDauTinh();
}