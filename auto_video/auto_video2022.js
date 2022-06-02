console.log("start 油猴脚本")
function check_video_process(percent_) {
    //处理视频进度和学习进度不一致的情况
    var total_duration_list = document.getElementsByClassName("vjs-duration-display")[0].innerText.split(':')
    var total_durations = parseInt(parseInt(total_duration_list[0] * 60) + parseInt(total_duration_list[1]))

    var cur_duration_list = document.getElementsByClassName("vjs-current-time-display")[0].innerText.split(':')
    var cur_durations = parseInt(parseInt(cur_duration_list[0] * 60) + parseInt(cur_duration_list[1]))

    var video_played = parseInt(cur_durations * 100 / total_durations)
    if (video_played > percent_) {
        var new_time = parseInt(percent_ / 100 * total_durations) - 1
        document.getElementById("player-container-id_html5_api").currentTime = new_time
        console.log("video progess ", video_played, ",learning  percent ", percent_, " ,set video to ", new_time, " seconds")
    }

}
function autocheckvideos() {
    // 点击页面开始初始化
    document.getElementById('player-con').click()
    //未完成的视频数量
    var cont_unstart_ = document.getElementsByClassName('content-unstart').length;
    var cont_learning_ = document.getElementsByClassName('content-learning').length;
    try {//获取视频进度和状态
        var percent_ = Number(document.getElementById('realPlayVideoTime').innerText);
        console.log("percent_", percent_)
        var state_ = document.getElementsByClassName('vjs-control-text')[2]
        if (state_.innerText == "播放") {
            console.log("播放 clicked");
            state_.click()
        }
        if (0 <= percent_ <= 100) {
            check_video_process(percent_)
            //点击确定
            const buttonEle = document.getElementsByClassName('l-btn-left')[0];
            if (buttonEle) {
                buttonEle.click();
                console.log("percent_", percent_, "10 mins OK clicked");
            }

        }
    }
    catch (e) {//获取不到视频进度的时候，看下一个;优先看未开始的
        console.log("start next link")
        if (cont_unstart_ > 0) {
            const next_link_ = document.getElementsByClassName('content-unstart')[0];
            next_link_.click();
        }
        else if (cont_learning_ > 0 && document.getElementsByClassName('content-learning')[0].innerText == "未完成") {
            const next_link_ = document.getElementsByClassName('content-learning')[0];
            next_link_.click();
        }
        else if (cont_learning_ > 0 && document.getElementsByClassName('content-learning')[0].innerText == "学习中") {
            const next_link_ = document.getElementsByClassName('content-learning')[1];
            next_link_.click();
        }
        else if (cont_unstart_ == 0 && cont_learning_ <= 1) { alert("all finished") }
        console.log(e)
    }
}

setInterval(function () { autocheckvideos() }, 3100)
