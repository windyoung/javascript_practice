console.log("start 油猴脚本")
setInterval(() => {
    //未完成的视频数量
    const cont_unstart_ = document.getElementsByClassName('content-unstart').length;
    const cont_learning_ = document.getElementsByClassName('content-learning').length;
    try {//获取视频进度和状态
        const percent_ = Number(document.getElementById('realPlayVideoTime').innerText);
        const state_ = document.getElementsByClassName('vjs-control-text')[2]
        if (state_.innerText == "播放") {
            console.log("播放 clicked");
            state_.click()
        }
        if (0 <= percent_ <= 100) {//点击确定
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
    }
}, 3100)