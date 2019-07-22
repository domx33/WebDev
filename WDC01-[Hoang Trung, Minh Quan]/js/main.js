//Danh sách liên kết hình ảnh:
var arr_img = [
    "img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/8.png"
]

//list grid-item - mảng các ô được đánh số thứ tự từ 0 - 15
var arrGridItem = document.querySelectorAll("img#id1");

//Biến dùng để kiểm tra ảnh có trùng nhau hay không
var comparedImage = null;

//Biến dùng để lưu vị trí bức ảnh 1
var posImage1 = 16;
var posImage2 = 16;

//Lưu trữ số lần click ảnh
var numberMoves = 0;

//Lưu trữ số cặp đã tìm được
var point = 0;

//Một mảng hình ảnh ẩn sau các ô
var arrayImage = new Array();

for (var i = 0; i < 15; i++) {
    arrayImage[i] = null;
}

/* Xử lý cửa sổ popup */
var modal = document.getElementById("myModal");
var rule = document.getElementById("myRule");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
btn.onclick = function() {
    rule.style.display = "block";
}

function turnOff() {
    rule.style.display = "none";
}
/* kết quả */

var greeting = document.getElementById("result");
var times = document.getElementById("totalTime");
var moves = document.getElementById("totalMove");
var scores = document.getElementById("urScore");

//Điểm ban đầu
var totalUrScore;
var lastScore = document.getElementById("myScore");

var loop;
//xử lý khi ấn nút
function CheckStatus(k) {
    if (arrGridItem[k].src != "#") {
        //Hiển thị hình ảnh ô thứ k (tương ứng một bức ảnh ẩn)
        arrGridItem[k].src = arrayImage[k];

        //Click một lần trừ ngẫu nhiên từ 10 - 50 điểm
        totalUrScore -= 10 + Math.floor(Math.random() * 40);

        //Nếu biến comparedImage chưa có lưu trữ bức ảnh nào thì gán cho nó bức ảnh hiện tại
        if (comparedImage == null) {
            comparedImage = arrayImage[k];
            //Lưu lại vị trí của img1
            posImage1 = k;

            //Tăng số click lên 1
            numberMoves += 1;
            setTimeout(function() {
                document.getElementById("moves").innerHTML = "Moves: " + checkTime(numberMoves);
            }, 200);
        }
        //Biến comparedImage đã có liên kết một bức ảnh 
        else {
            if (k != posImage1) {
                //Tăng số click lên 1
                numberMoves += 1;
                setTimeout(function() {
                    document.getElementById("myMoves").innerHTML = "Moves: " + checkTime(numberMoves);
                }, 300);
                //Trường hợp ảnh trùng nhau thì sẽ đưa ảnh thành file ảnh khác
                if (comparedImage == arrayImage[k]) {

                    setTimeout(function() {
                        arrGridItem[k].src = "img/grey.jpg";
                        arrGridItem[posImage1].src = "img/grey.jpg";
                        comparedImage = null;
                    }, 400);

                    //Khi tìm được ảnh trùng thì số cặp tìm được sẽ tăng lên
                    point += 1;
                    totalUrScore += 15;
                    lastScore.innerHTML = "Your scores: " + totalUrScore;

                    //Khi tìm đủ 8 cặp thì  chiến thắng và hiện ra bảng thông báo (popup hoặc alert)
                    if (point == 8) {
                        modal.style.display = "block";
                        setmyPopup(true);
                        clearTimeout(timeout);
                        clearInterval(loop);
                    }
                }
                //Trường hợp ảnh khác nhau 
                else {
                    setTimeout(function() {
                        arrGridItem[k].src = "img/disable.jpg";
                        arrGridItem[posImage1].src = "img/disable.jpg";
                        comparedImage = null;
                    }, 400);

                    totalUrScore -= 50;
                    lastScore.innerHTML = "Your scores: " + totalUrScore;
                }
            }
        }
    }
}

//ẩn nút play
function letPlay() {
    document.getElementById("start").style.display = "none";
    document.getElementById("progress").style.display = "";
    document.getElementById("myMoves").style.display = "";
    document.getElementById("myTimePlay").style.display = "";
    document.getElementById("myScore").style.display = "";
    setMap();
    totalUrScore = 1000 + Math.floor(Math.random() * 1000);
    alert("Chúc mừng bạn nhận được: " + totalUrScore + " điểm. Chúc bạn chơi game vui vẻ!");
    lastScore.innerHTML = "Your scores: " + totalUrScore;
    //Mỗi 5 giây lại thực hiện 1 lần
    loop = setInterval(function() {
        if (progressPlay < 30) {
            totalUrScore -= Math.floor(Math.random() * 10);
        } else if (progressPlay >= 30 < 70) {
            totalUrScore -= Math.floor(Math.random() * 40);
        } else {
            totalUrScore -= Math.floor(Math.random() * 80);
        }
        lastScore.innerHTML = "Your scores: " + totalUrScore;
    }, 5000);
}

//set màn chơi
function setMap() {

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
    var totalTime = 180;
    var presentTime = min * 60 + sec;
    return (presentTime / totalTime) * 100;
}

//Hiển thị thời gian đang chơi
//Thời gian giới hạn là 3 phút

var sec = min = 0;
var timeout, progressPlay;

function setTimePlay() {

    if (sec == 60) {
        sec = 0;
        min += 1;
    }
    progressPlay = progressTime(min, sec);

    if (min == 3 && sec == 0 || totalUrScore <= 450) {
        document.getElementById("myTimePlay").innerHTML = "Time: " + checkTime(min) + ":" + checkTime(sec);
        document.getElementById("myprogressbar").style.width = progressPlay + "%";
        /*
        Ý tưởng tạm thời: Hiện cửa sổ popup thông báo điểm và nút reset 
        Có thể thay lệnh alert
        */
        modal.style.display = "block";
        setmyPopup(false);
        clearTimeout(timeout);
        clearInterval(loop);
        return;
    }

    /*Hiển thị đồng hồ*/
    document.getElementById("myTimePlay").innerHTML = "Time: " + checkTime(min) + ":" + checkTime(sec);
    document.getElementById("myprogressbar").style.width = progressPlay + "%";

    /* Tương ứng với mỗi mốc trong quá trình chơi thì thanh tiến trình sẽ đổi màu */
    if (progressPlay >= 30) {
        document.getElementById("myprogressbar").style.backgroundColor = "#ffc107";
    }
    if (progressPlay >= 70) {
        document.getElementById("myprogressbar").style.backgroundColor = "#dc3545";
    }
    timeout = setTimeout(function() {
        sec += 1;
        setTimePlay();
    }, 1000);
}


//Trạng thái của cửa sổ cuối cùng khi game kết thúc
function setmyPopup(win) {
    if (win == true && point == 8) {
        greeting.innerHTML = "Congratulations!";
    } else {
        greeting.innerHTML = "Time's OVer!";
    }
    times.innerHTML = "Times play: " + checkTime(min) + ":" + checkTime(sec);
    moves.innerHTML = "Moves: " + checkTime(numberMoves);
    scores.innerHTML = "Your score: " + totalUrScore;
}