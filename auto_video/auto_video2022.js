// ==UserScript==
// @name         auto_video2022.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://m.mynj.cn:11188/zxpx/tec/play/player?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
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
    function start_next(cont_unstart_,cont_learning_,cont_is_video_finish){
        console.log("start next link")
        var const_is_learning_ = document.getElementsByClassName('content-learning')[0].innerText == "学习中"
        var const_learning_unfinished_ = document.getElementsByClassName('content-learning')[0].innerText == "未完成"
        if (cont_unstart_ > 0) {
            // 设置未开始为下一个链接
            const next_link_ = document.getElementsByClassName('content-unstart')[0];
            next_link_.click();
        }
        else if (cont_learning_ > 1 && const_learning_unfinished_ ) {
            // 设置未完成为下一个链接
            const next_link_ = document.getElementsByClassName('content-learning')[0];
            next_link_.click();
        }
        //         else if (cont_learning_ > 0 && const_is_learning_ ) {
        //             const next_link_ = document.getElementsByClassName('content-learning')[1];
        //             next_link_.click();
        //         }
        else if (cont_learning_ == 1 && cont_is_video_finish && const_is_learning_)
        { console.log("all finished")
         clearInterval(working_)
         console.log("clearInterval triggerred")
        }
    }


    function autocheckvideos() {
        // 点击页面开始初始化
        document.getElementById('player-con').click()
        //未完成的视频数量
        var cont_is_video_finish = document.getElementsByClassName('learnpercent')[0].outerText.indexOf('已完成') != -1
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
            if(cont_is_video_finish)
            {start_next(cont_unstart_,cont_learning_,cont_is_video_finish)}
        }
        catch (e) {//获取不到视频进度的时候，看下一个;优先看未开始的
            start_next(cont_unstart_,cont_learning_,cont_is_video_finish)

        }
    }

    var working_= setInterval(function () { autocheckvideos() }, 3100)
    })();
