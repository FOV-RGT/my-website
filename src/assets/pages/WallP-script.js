
// 预加载动画

var rotateInterval;
var bkimglist = [];
var bkimglistlength = 0;
let Shiroko;
let bodyimgindex;

// 背景

fetch('https://jsd.onmicrosoft.cn/gh/FOV-RGT/recources@main/img/backgroundimg.json')
.then(response => response.json())
.then(data => {
    bkimglist = data;
    bkimglistlength = bkimglist.length;
    const randomimg = Math.floor(Math.random() * bkimglistlength);
    bodyimgindex = randomimg;
    document.body.style.backgroundImage = `url(${bkimglist[bodyimgindex].url})`;
})

// 点赞动画时间线

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(RoughEase,ExpoScaleEase,SlowMo,CustomEase);
    Shiroko = gsap.timeline({
        onComplete: () => Shiroko.clear()
        });
});

MusicPlayer();
const image = document.getElementById('Polaris');
const maxAngle = 50;
let currentAngle = 0;

// 函数：随机旋转图片
function rotateImage() {
    const randomAngle = Math.floor(Math.random() * maxAngle + 50);
    const direction = Math.random() < 0.5 ? -1 : 1; // 随机方向
    const newAngle = randomAngle * direction;
    currentAngle += newAngle;
    image.style.transform = `rotate(${currentAngle}deg)`;
}

rotateInterval = setInterval(rotateImage, 1000);
setTimeout(() => {
    clearInterval(rotateInterval);
    const image = document.getElementById('Polaris');
    image.style.transition = 'transform 3s';
    image.style.transform = `rotate(465deg)`;
    image.style.animation = `up 0.8s forwards`;
    image.addEventListener('animationend',() => {
        const text1 = document.querySelector('.BanGDream');
        text1.style.animation = 'flowIn 1s forwards';
        text1.addEventListener('animationend',() => {
            const text2 = document.querySelector('.preloader-text2');
            text2.style.animation = 'opacityUp 1s forwards';
            text2.addEventListener('animationend',TechOTaKusSaveTheWorld);
        });
    });
},3000);    

function TechOTaKusSaveTheWorld() {
    setTimeout(() => {
        const preloaderWrappers = document.querySelectorAll('.preloader-wrapper');
        const contentElement = document.querySelector('.content');
        let animationsCompleted = 0;
        if (preloaderWrappers.length > 0) {
                preloaderWrappers.forEach((wrapper, index) => {
                    wrapper.style.animation = `slideDown 0.2s cubic-bezier(0.01,1,0.85,1) forwards ${index * 0.2}s`;
                });
            preloaderWrappers.forEach(wrapper => {
                wrapper.addEventListener('animationend', function(event) {
                    if (event.animationName === 'slideDown') {
                        animationsCompleted += 1;
                        // 检查是否所有动画都已完成
                        if (animationsCompleted === preloaderWrappers.length) {
                            const preloaderbackground = document.querySelector('.preloader-background');
                            preloaderbackground.style.display = 'none';
                            const image = document.getElementById('Polaris');
                            image.style.transition = 'opacity 0.5s';
                            image.style.opacity = '0';
                            const text1 = document.querySelector('.BanGDream');
                            text1.style.transition = 'opacity 0.5s';
                            text1.style.opacity = '0';
                            const text2 = document.querySelector('.MyGO');
                            text2.style.transition = 'opacity 0.5s';
                            text2.style.opacity = '0';
                            preloaderWrappers.forEach(wrapper => {
                                wrapper.style.transition = 'border-right-color 1s';
                                wrapper.style.borderRightColor ='rgba(240,236,236,0)';
                            });
                            const preloaderBlocks = document.querySelectorAll('.preloader-block');
                            preloaderBlocks.forEach(block => {
                                block.style.animation = 'slideOut 0.75s cubic-bezier(0.01,1,0.85,1) forwards';
                                setTimeout(() => {
                                    block.style.transition = 'opacity 0.6s';
                                    block.style.opacity = '0';
                                },400);
                            });
                            // 监听每个preloader-block的动画结束事件
                            preloaderBlocks.forEach(block => {
                                block.addEventListener('animationend', function(event) {
                                    if (event.animationName === 'slideOut') {
                                        // 所有动画结束后，隐藏preloader元素并显示实际内容
                                        image.style.display = 'none';
                                        text1.style.display = 'none';
                                        text2.style.display = 'none';
                                        const preloadercontainer = document.querySelector('.preloader-textcontainer');
                                        preloadercontainer.style.display ='none';
                                        preloaderWrappers.forEach(wrapper => {
                                            wrapper.style.display = 'none';
                                        });
                                        preloaderBlocks.forEach(block => {
                                            block.style.display ='none';
                                        });
                                    }
                                });
                            });
                            
                        }
                    }
                });
            });
        }  
    },500)
}

// 音乐播放器

var musiclist = [];
var MusicList = [];
var currentindex = 0;
var listlength = 0;
var Dragging = false;
var progress = 0;
let Switching = false;
let ManualMute = false;
let randommusiclist = [];
let randomstart = false;
let currentmusiclist = [];
let cycle = false;
let randomplay = false;
let like = false;
let Hidden = false;

function MusicPlayer(){
    fetch('https://jsd.onmicrosoft.cn/gh/FOV-RGT/recources@main/audio/musiclist-1.json')
    .then(response => response.json())
    .then(data => {
        musiclist = data;
        currentmusiclist = musiclist.slice();
        listlength = musiclist.length;
        currentindex = 0;
        MusicList = document.querySelector('.music-list');
        UpdateList();
    })
    .then(() => {
        document.getElementById('MusicPlayer').src = currentmusiclist[currentindex].url;
        document.getElementById('MusicPlayer').play().then(() =>{
            document.querySelector('.cover').style.animationPlayState = 'running';
            UpdateOnlyOne();
        }).catch(() => console.log('自动播放被阻止'))
    })
    const prevBtn = document.getElementById('prevBtn');
    const playBtn = document.getElementById('playBtn');
    const nextBtn = document.getElementById('nextBtn');
    const openList = document.getElementById('openList');
    const closeList = document.getElementById('closeList');
    const progressbutton = document.querySelector('.music_progress_handle');
    const volumebutton = document.querySelector('.volume_handle');
    const musicprogress = document.querySelectorAll('.music_progress_bar,.music_progress_line');
    const volumepercentage = document.querySelectorAll('.volume_bar,.volume_line');
    const PlaybackOrderControl = document.querySelector('.fa-repeat');
    const heart = document.querySelector('.fa-heart');
    document.querySelector('.modalbackground').onclick = ListClose;
    prevBtn.onclick = (event) => {
        prevMusic();
        clicking(event);
    };
    playBtn.onclick = (event) => {
        PlayOrPauseMusic();
        clicking(event);
    };
    nextBtn.onclick = (event) => {
        nextMusic();
        clicking(event);
    };
    openList.onclick = (event) => {
        ListOpen();
        clicking(event);
    };
    closeList.onclick = (event) => {
        ListClose();
        clicking(event);
    };
    const MusicPlayer = document.getElementById('MusicPlayer');
    MusicPlayer.volume = 0.3;
    MusicPlayer.addEventListener('ended',() => {
        Dragging = false;
        Switching = false;
        MusicPlayer.pause();
        document.querySelector('.cover').style.animationPlayState = 'paused';
        document.removeEventListener('mousemove',UpdateMusicProgress);
        document.removeEventListener('mouseup',RemoveMouseListener);
        if (cycle) {
            MusicPlayer.currentTime = 0;
            MusicPlayer.play().then(() => {
                document.querySelector('.cover').style.animationPlayState = 'running';
            })
        } else nextMusic();
    });
    MusicPlayer.addEventListener('play',() => {
        if (!Hidden) {
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
            const Playerinfo = document.querySelector('.player-info');
            Playerinfo.style.transition = 'top 0.4s,opacity 0.3s';
            Playerinfo.style.top = '-102%';
            Playerinfo.style.opacity = '1';
        }
    });
    MusicPlayer.addEventListener('pause',() => {
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
        const Playerinfo = document.querySelector('.player-info');
        Playerinfo.style.transition = 'top 0.4s,opacity 0.3s';
        Playerinfo.style.top = '0%';
        Playerinfo.style.opacity = '0';
    });
    setInterval(() => {
        if (Dragging) return;
        const durationTime = MusicPlayer.duration;
        document.querySelector('.time').textContent = UpdateMusicTime(durationTime);
        const currentTime = MusicPlayer.currentTime;
        document.querySelector('.current-time').textContent = UpdateMusicTime(currentTime);
        progress = (currentTime / durationTime) * 100;
        document.querySelector('.music_progress_line').style.width = `${progress}%`;
    },16.67);
    progressbutton.addEventListener('mousedown',() => {
        Dragging = true;
        document.body.classList.add('no-select');
        document.addEventListener('mousemove',UpdateMusicProgress);
        document.addEventListener('mouseup',RemoveMouseListener);
    });
    volumebutton.addEventListener('mousedown',() => {
        document.body.classList.add('no-select');
        document.addEventListener('mousemove',UpdateVolume);
        document.addEventListener('mouseup',RemoveVolumeMouseListener);
    });
    musicprogress.forEach(target => {
        target.addEventListener('click',UpdateMusicProgress);
    });
    volumepercentage.forEach(target => {
        target.addEventListener('click',UpdateVolume);
    });
    const volumestatus = document.getElementById('volumestatus');
    let currentvolume;
    volumestatus.addEventListener('click',(event) => {
        clicking(event);
        if (!ManualMute){
            currentvolume = MusicPlayer.volume;
            const volumeline = document.querySelector('.volume_line');
            const bar = document.querySelector('.volume_bar');
            const volumeinterval = setInterval(() => {
                let volume = volumeline.offsetWidth / bar.offsetWidth;
                MusicPlayer.volume = volume;
            },20);
            volumeline.style.transition = 'width 0.3s';
            volumeline.style.width = '0%';
            setTimeout(() => clearInterval(volumeinterval),300);
            volumestatus.classList.add('fa-volume-xmark');
            ManualMute = true;
        } else {
            const volumeline = document.querySelector('.volume_line');
            const bar = document.querySelector('.volume_bar');
            const volumeinterval = setInterval(() => {
                let volume = volumeline.offsetWidth / bar.offsetWidth;
                MusicPlayer.volume = volume;
            },20);
            volumeline.style.transition = 'width 0.3s';
            document.querySelector('.volume_line').style.width = `${currentvolume * 100}%`;
            setTimeout(() => clearInterval(volumeinterval),300);
            volumestatus.classList.remove('fa-volume-xmark');
            ManualMute = false;
        }
    });
    PlaybackOrderControl.addEventListener('click',cycleplay);
    heart.addEventListener('click',(event) => {
        clicking(event);
        if (!like) {
            like = true;
            if (!MusicPlayer.paused) {
                Shiroko.to(".imgA",{
                    top:-240,
                    duration:0.6,
                    ease:"back.out(1)"
                })
                .to(".imgA",{
                    keyframes:[
                        {rotation:-30,duration:0.22},
                        {rotation:0,duration:0.22}
                    ],
                    ease:'sine.out'
                },"-=0.45")
                .to(".imgA",{
                    top:0,
                    duration:0.6,
                    delay:0.4,
                    ease:"back.in(2.5)"
                })
                .to(".imgA",{
                    keyframes:[
                        {rotation:-30,duration:0.22},
                        {rotation:0,duration:0.22}
                    ],
                    ease:'sine.inOut'
                },"<-0.1")
                .to({},{duration:0.2});
            } else {
                Shiroko.to(".imgA",{
                    left:"48%",
                    duration:0
                })
                .to(".imgA",{
                    top:-117,
                    duration:0.6,
                    ease:"back.out(1.5)"
                })
                .to(".imgA",{
                    keyframes:[
                        {rotation:-30,duration:0.22},
                        {rotation:0,duration:0.22}
                    ],
                    ease:'sine.out'
                },"-=0.5")
                .to(".imgA",{
                    top:0,
                    duration:0.6,
                    delay:0.4,
                    ease:"back.in(3)",
                    onComplete: () => {
                        gsap.set(".imgA",{left:"53%"});
                    }
                })
                .to(".imgA",{
                    keyframes:[
                        {rotation:-30,duration:0.22},
                        {rotation:0,duration:0.22}
                    ],
                    ease:'sine.inOut'
                },"<-0.1")
                .to({},{duration:0.2});
            }
            heart.classList.remove('fa-regular');
            heart.classList.add('fa-solid');
        } else {
            like = false;
            if (!MusicPlayer.paused) {
                Shiroko.to(".imgB",{
                    top:-241,
                    duration:0.6,
                    ease:"back.out(1)"
                })
                .to(".imgB",{
                    keyframes:[
                        {rotation:-30,duration:0.22},
                        {rotation:0,duration:0.22}
                    ],
                    ease:'sine.out'
                },"-=0.45")
                .to(".imgB",{
                    top:0,
                    duration:0.6,
                    delay:0.4,
                    ease:"back.in(2.5)"
                })
                .to(".imgB",{
                    keyframes:[
                        {rotation:-30,duration:0.22},
                        {rotation:0,duration:0.22}
                    ],
                    ease:'sine.inOut'
                },"<-0.1")
                .to({},{duration:0.2});
            } else {
                Shiroko.to(".imgB",{
                    left:"48%",
                    duration:0
                })
                .to(".imgB",{
                    top:-120,
                    duration:0.6,
                    ease:"back.out(1.5)"
                })
                .to(".imgB",{
                    keyframes:[
                        {rotation:-30,duration:0.22},
                        {rotation:0,duration:0.22}
                    ],
                    ease:'sine.out'
                },"-=0.5")
                .to(".imgB",{
                    top:0,
                    duration:0.6,
                    delay:0.4,
                    ease:"back.in(3)",
                    onComplete: () => {
                        gsap.set(".imgB",{left:"53%"});
                    }
                })
                .to(".imgB",{
                    keyframes:[
                        {rotation:-30,duration:0.22},
                        {rotation:0,duration:0.22}
                    ],
                    ease:'sine.inOut'
                },"<-0.1")
                .to({},{duration:0.2});
            }
            heart.classList.remove('fa-solid');
            heart.classList.add('fa-regular');
        }
    });
    const hidebox = document.querySelector('.hide-box');
    const hidebutton = document.querySelector('.hide-box i')
    const playerwarp = document.querySelector('.player-warp');
    const Playerinfo = document.querySelector('.player-info');
    hidebox.addEventListener('click',() => {
        if (!Hidden) {
            Hidden = true;
            if (!MusicPlayer.paused) {
                Playerinfo.style.transition = 'top 0.3s,opacity 0.2s';
                Playerinfo.style.top = '0%';
                Playerinfo.style.opacity = '0';
            }
            playerwarp.style.right = '-440px';
            hidebutton.style.transform = 'rotate(-180deg)'
        } else {
            setTimeout(() => Hidden = false,250);
            if (!MusicPlayer.paused) {
                Playerinfo.style.transition = 'top 0.45s,opacity 0.35s';
                Playerinfo.style.top = '-102%';
                Playerinfo.style.opacity = '1';
            }
            playerwarp.style.right = '20px';
            hidebutton.style.transform = 'rotate(0deg)'
        }
    });
}

function prevMusic(){
    currentindex = (currentindex - 1 + listlength) % listlength;
    if (!document.getElementById('MusicPlayer').paused) {
        document.getElementById('MusicPlayer').pause();
        document.querySelector('.cover').style.animationPlayState = 'paused';
    }
    SetMusic();
}

function PlayOrPauseMusic(){
    const MusicPlayer = document.getElementById('MusicPlayer');
    if (MusicPlayer.paused) {
        MusicPlayer.play();
        document.querySelector('.cover').style.animationPlayState = 'running';
    }else {
        MusicPlayer.pause();
        document.querySelector('.cover').style.animationPlayState = 'paused';
    }
    UpdateOnlyOne();
}

function nextMusic(){
    currentindex = (currentindex + 1) % listlength;
    if (!document.getElementById('MusicPlayer').paused) {
        document.getElementById('MusicPlayer').pause();
        document.querySelector('.cover').style.animationPlayState = 'paused';
    }
    SetMusic();
}

function ListOpen(){
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    document.querySelector('.modal').style.animation = 'modal-in 0.4s forwards';
    document.querySelector('.modal-box').style.animation = 'modal-box-in 0.4s forwards';
}

function ListClose(){
    document.querySelector('.modal').style.animation = 'modal-out 0.4s forwards';
    document.querySelector('.modal-box').style.animation = 'modal-box-out 0.4s forwards';
    setTimeout(() => {
        document.querySelector('.modal').style.display = 'none';
    },400);
}

function SetMusic(){
    Switching = true;
    const MusicPlayer = document.getElementById('MusicPlayer');
    MusicPlayer.src = currentmusiclist[currentindex].url;
    MusicPlayer.play().then(() => {
        Switching = false;
        Dragging = false;
        document.removeEventListener('mousemove',UpdateMusicProgress);
        document.removeEventListener('mouseup',RemoveMouseListener);
        document.querySelector('.cover').style.animationPlayState = 'running';
        if (randomplay && currentindex == musiclist.length - 1) {
            randomstart = true;
            Randomlist();
        }
        else UpdateOnlyOne();
    }).catch(() => console.log('切歌太慢是网络不行绝对不是代码的原因（'));
}

function UpdateOnlyOne() {
    UpdateMusicInfo();
    const MusicPlayer = document.getElementById('MusicPlayer');
    const target = document.querySelector(`.music-list li[data-index="${currentindex}"]`);
    const button = target.querySelector('span.play-circle');
    if (!target.classList.contains('playing')) {
        target.classList.add('playing');
        const anothermusic = document.querySelectorAll(`.music-list li:not([data-index="${currentindex}"])`);
        anothermusic.forEach(music => {
            music.classList.remove('playing');
            const anotherbuttons = music.querySelector('span.play-circle');
            anotherbuttons.classList.remove('fa-pause-circle');
            anotherbuttons.classList.add('fa-play-circle');
        });
    }
    if (MusicPlayer.paused) {
        button.classList.remove('fa-pause-circle');
        button.classList.add('fa-play-circle');
    } else {
        button.classList.remove('fa-play-circle');
        button.classList.add('fa-pause-circle');
    }
}

function UpdateList(){
    MusicList.innerHTML = '';
    currentmusiclist.forEach((target,index) => {
        const song = document.createElement('li');
        song.dataset.index = index;
        song.className = (index == currentindex) ? 'playing':'';
        const songInfo = document.createElement('span');
        songInfo.dataset.index = index;
        songInfo.textContent = `${index + 1}. ${target.title} - ${target.author}`;
        song.appendChild(songInfo);
        const playControl = document.createElement('span');
        playControl.dataset.index = index;
        playControl.className = `fa ${(index == currentindex) && !document.getElementById('MusicPlayer').paused ? 'fa-pause-circle' : 'fa-play-circle'} play-circle`;
        song.appendChild(playControl);
        MusicList.appendChild(song);
    });
    document.querySelectorAll('.music-list li span:not(.play-circle)').forEach((target) => {
        target.addEventListener('click',(event) => {
            const dataIndex = parseInt(event.target.getAttribute('data-index'))
            console.log(dataIndex);
            if (currentindex == dataIndex) {
                PlayOrPauseMusic();
            } else {
                currentindex = parseInt(event.target.getAttribute('data-index'));
                if (!document.getElementById('MusicPlayer').paused) {
                    document.getElementById('MusicPlayer').pause();
                    document.querySelector('.cover').style.animationPlayState = 'paused';
                    }
                SetMusic();
            }
        });
    });
    UpdateMusicInfo();
    UpdateSmallbutton();
}

function Randomlist() {
    if (randomstart) {
        randomplay = true;
        randommusiclist = currentmusiclist.slice();
        randommusiclist.splice(currentindex,1);
        for (let i = listlength - 2; i > 0;i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randommusiclist[i],randommusiclist[j]] = [randommusiclist[j],randommusiclist[i]];
        }
        const currentmusic = currentmusiclist[currentindex];
        Array.prototype.unshift.apply(randommusiclist,[currentmusic]);
        randomstart = false;
        currentmusiclist = randommusiclist.slice();
        currentindex = 0;
        UpdateList();
    }
}

function cycleplay() {
    const PlaybackOrderControl = document.querySelector('.fa-repeat');
    const control = document.querySelector('.PlaybackOrderControl');
    control.classList.add('clicking');
    setTimeout(() => control.classList.remove('clicking'),150);
    if (!cycle) {
        cycle = true;
        document.querySelector('.PlaybackOrderControl span').style.opacity = '100%';
    } else {
        randomstart = true;
        cycle = false;
        document.querySelector('.PlaybackOrderControl span').style.opacity = '0%';
        Randomlist();
        PlaybackOrderControl.classList.remove('fa-repeat');
        PlaybackOrderControl.classList.add('fa-shuffle');
        PlaybackOrderControl.removeEventListener('click',cycleplay);
        document.querySelector('.fa-shuffle').addEventListener('click',SequentialPlay);
    }
}

function SequentialPlay() {
    randomplay = false;
    const PlaybackOrderControl = document.querySelector('.fa-shuffle');
    const currentmusic = currentmusiclist[currentindex];
    currentindex = musiclist.indexOf(currentmusic);
    currentmusiclist = musiclist.slice();
    UpdateList();
    const control = document.querySelector('.PlaybackOrderControl');
    control.classList.add('clicking');
    setTimeout(() => control.classList.remove('clicking'),150);
    PlaybackOrderControl.removeEventListener('click',SequentialPlay);
    PlaybackOrderControl.classList.remove('fa-shuffle');
    PlaybackOrderControl.classList.add('fa-repeat');
    PlaybackOrderControl.addEventListener('click',cycleplay);
}

function UpdateSmallbutton(){
    const Buttons = document.querySelectorAll('.fa.fa-play-circle.play-circle');
    Buttons.forEach(buttons => {
        buttons.addEventListener('click',() => {
            if (!(currentindex == parseInt(buttons.getAttribute('data-index')))) {
                currentindex = parseInt(buttons.getAttribute('data-index'));
                if (!document.getElementById('MusicPlayer').paused) {
                document.getElementById('MusicPlayer').pause();
                document.querySelector('.cover').style.animationPlayState = 'paused';
                }
                SetMusic();
            }else {
                PlayOrPauseMusic();
            }
        });
    });
    const Pausebutton = document.querySelector('.fa.fa-pause-circle.play-circle');
    if (Pausebutton) Pausebutton.onclick = PlayOrPauseMusic;
}

function UpdateMusicInfo() {
    const target = currentmusiclist[currentindex];
    if (!document.getElementById('Playerimg').src || document.getElementById('Playerimg').src != target.pic) {
        document.getElementById('Playerimg').src = target.pic;
    }
    if (!document.querySelector('.name').textContent || document.querySelector('.name').textContent != target.title) {
        document.querySelector('.name').textContent = target.title;
    }
    if (!document.querySelector('.singer').textContent || document.querySelector('.singer').textContent != target.author) {
        document.querySelector('.singer').textContent = target.author;
    }
}

function UpdateMusicTime(seconds) {
    if (!isNaN(seconds)) {
        let mins = parseInt(seconds / 60);
        let secs = parseInt(seconds % 60);
        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;
        return `${mins}:${secs}`;    
    } else {
        return `00:00`;
    }
}

function UpdateMusicProgress(Mouse) {
    const MusicPlayer = document.getElementById('MusicPlayer');
    const progressLine = document.querySelector('.music_progress_line');
    const bar = document.querySelector('.music_progress_bar').getBoundingClientRect();
    const currentlength = Mouse.clientX - bar.left;
    progress = Math.max(0,Math.min(1,currentlength / bar.width)) * 100;
    progressLine.style.width = `${progress}%`;
    document.querySelector('.current-time').textContent = UpdateMusicTime((progress / 100) * MusicPlayer.duration);
    if (!Dragging && !Switching) MusicPlayer.currentTime = (progress / 100) * MusicPlayer.duration;
}

function UpdateVolume(Mouse) {
    if (ManualMute == false) document.querySelector('.volume_line').style.transition = '';
    const MusicPlayer = document.getElementById('MusicPlayer');
    const volumeline = document.querySelector('.volume_line');
    const bar = document.querySelector('.volume_bar').getBoundingClientRect();
    const currentlength = Mouse.clientX - bar.left;
    let VolumePercentage = Math.max(0,Math.min(1,currentlength / bar.width));
    volumeline.style.width = `${VolumePercentage * 100}%`;
    const volumestatus = document.getElementById('volumestatus');
    if (ManualMute == true) {
        volumestatus.classList.remove('fa-volume-xmark');
        document.querySelector('.volume_line').style.transition = '';
        ManualMute = false;
    }
    if (VolumePercentage > 0.5) {
        volumestatus.classList.remove('fa-volume-low');
        volumestatus.classList.add('fa-volume-high');
    } else if (VolumePercentage > 0 && VolumePercentage <=0.5) {
        if (volumestatus.classList.contains('fa-volume-high')) {
            volumestatus.classList.remove('fa-volume-high');
        } else {
            volumestatus.classList.remove('fa-volume-off');
        }
        volumestatus.classList.add('fa-volume-low');
    } else {
        volumestatus.classList.remove('fa-volume-low');
        volumestatus.classList.add('fa-volume-off');
    }
    MusicPlayer.volume = VolumePercentage;
}

function RemoveMouseListener() {
    Dragging = false;
    const MusicPlayer = document.getElementById('MusicPlayer');
    document.removeEventListener('mousemove',UpdateMusicProgress);
    document.removeEventListener('mouseup',RemoveMouseListener);
    document.body.classList.remove('no-select');
    if (Switching) return;
    MusicPlayer.currentTime = (progress / 100) * MusicPlayer.duration;
}

function RemoveVolumeMouseListener() {
    document.removeEventListener('mousemove',UpdateVolume);
    document.removeEventListener('mouseup',RemoveVolumeMouseListener);
    document.body.classList.remove('no-select');
}

function clicking(event) {
    event.target.classList.add('clicking');
    setTimeout(() => event.target.classList.remove('clicking'),150);
}

// 背景切换

const leftswch = document.getElementById('leftswch');
leftswch.addEventListener('click',bodyimg);
const rightswch = document.getElementById('rightswch');
rightswch.addEventListener('click',bodyimg);
const leftswchicon = document.getElementById('leftswchicon');
const rightswchicon = document.getElementById('rightswchicon');
const transitionimga = document.querySelector('.transitionimga');
const transitionimgb = document.querySelector('.transitionimgb');
let tranimgleft;
let tranimgright;
const transvg1 = document.getElementById('svg1');
const transvg2 = document.getElementById('svg2');
const fluttercontainer = document.querySelector('.fluttercontainer');
let no = true;
const trancontainer = document.querySelector('.container');
const faulta = document.querySelectorAll('.a');
const faultb = document.querySelectorAll('.b');
const faultA = document.querySelectorAll('.notfoundtextA');
const faultB = document.querySelectorAll('.notfoundtextB');
const textcontainer = document.querySelectorAll('.textcontainer');
const fluttertext = document.querySelectorAll('.fluttertext');
const successtext = document.querySelectorAll('.successtext');
let Turning = false;

function bodyimg(event) {
    transitionimga.style.display = 'block';
    transitionimgb.style.display = 'flex';
    clicking(event);
    if (event.target.id === leftswch.id) {
        leftswchicon.style.animation = 'leftswchicon1 0.2s ease-out forwards';
        setTimeout(() => {
            leftswchicon.style.animation = 'leftswchicon2 0.2s ease-out forwards';
        },200)
        if (Turning) return
        Turning = true;
        trancontainer.style.transform = 'translate(-50%,-50%) rotate(-30deg)';
        tranimgleft.restart();
        // svglineleft.restart();
        setTimeout(flutterA,800);
        setTimeout(falutremoveA,1100);
        setTimeout(trananimation,1600);
        setTimeout(switchbodyimg,800,event.target.id);
    }else {
        rightswchicon.style.animation = 'rightswchicon1 0.2s ease-out forwards';
        setTimeout(() => {
            rightswchicon.style.animation = 'rightswchicon2 0.2s ease-out forwards';
        },200)
        if (Turning) return
        Turning = true;
        trancontainer.style.transform = 'translate(-50%,-50%) rotate(30deg)';
        tranimgright.restart();
        // svglineleft.restart();
        setTimeout(flutterA,800);
        setTimeout(falutremoveA,1100);
        setTimeout(trananimation,1600);
        setTimeout(switchbodyimg,800,event.target.id);
    }
}

function switchbodyimg(id) {
    if (id === "leftswch") {
        bodyimgindex = (bodyimgindex - 1 + bkimglistlength) % bkimglistlength;
        document.body.style.backgroundImage = `url(${bkimglist[bodyimgindex].url})`;
    }else {
        bodyimgindex = (bodyimgindex + 1) % bkimglistlength;
        document.body.style.backgroundImage = `url(${bkimglist[bodyimgindex].url})`;
    }
}

let falutOnA;
let falutOnB;
let flicker;

function flutterA() {
    falutOnA = setInterval(() => {
        faulta.forEach(target => {
            const a = Math.random() * 2 - 1 + "vw";
            const b = Math.random() * 2 - 1 + "vw";
            document.documentElement.style.setProperty('--a',a);
            document.documentElement.style.setProperty('--b',b);
            target.classList.add("a_fault");
            randomclip(target);
        })
        faultb.forEach(target => {
            const a = Math.random() * 2 - 1 + "vw";
            const b = Math.random() * 2 - 1 + "vw";
            document.documentElement.style.setProperty('--a',a);
            document.documentElement.style.setProperty('--b',b);
            target.classList.add("b_fault");
            randomclip(target);
        })
        fluttertext.forEach(target => {
            target.style.transform = `translate(${Math.random() * 2 - 1}%,${Math.random() * 6 - 3}%)`;
        });
    },16.67);
    
}

function flutterB() {
    falutOnB = setInterval(() => {
        faultA.forEach(target => {
            const a = Math.random() * 2 - 1 + "vw";
            const b = Math.random() * 2 - 1 + "vw";
            document.documentElement.style.setProperty('--a',a);
            document.documentElement.style.setProperty('--b',b);
            target.classList.add("A_fault");
            target.style.transform = `translate(${Math.random() * 2 - 1}%,${Math.random() * 6 - 3}%)`;
            randomclip(target);
        })
        faultB.forEach(target => {
            const a = Math.random() * 2 - 1 + "vw";
            const b = Math.random() * 2 - 1 + "vw";
            document.documentElement.style.setProperty('--a',a);
            document.documentElement.style.setProperty('--b',b);
            target.classList.add("B_fault");
            target.style.transform = `translate(${Math.random() * 2 - 1}%,${Math.random() * 6 - 3}%)`;
            randomclip(target);
        })
    },16.67);
}

function falutremoveA() {
    clearInterval(falutOnA);
    faulta.forEach(target => {
        target.classList.remove('a_fault');
        target.style.clipPath = '';
    });
    faultb.forEach(target => {
        target.classList.remove('b_fault');
        target.style.clipPath = '';
    });
    fluttertext.forEach(target => {
        target.style.transform = '';
    })
}

function falutremoveB() {
    clearInterval(falutOnB);
    faultA.forEach(target => {
        target.classList.remove('A_fault');
        target.style.transform = '';
        target.style.clipPath = '';
    });
    faultB.forEach(target => {
        target.classList.remove('B_fault');
        target.style.transform = '';
        target.style.clipPath = '';
    });
}

document.addEventListener('DOMContentLoaded',() => {
    // if (no) return;
    tranimgleft = gsap.timeline({
        delay:0.1,
        paused:true,
        onComplete:RevertStyle
    });
    tranimgleft.fromTo(transitionimga, 
        {x: "-100%", borderRadius: "5vh"}, 
        { 
            x: "0%", 
            duration: 0.6, 
            ease: "sine.inOut"
        }
    ,0)
    .fromTo(transitionimgb, 
        {x: "-100%", borderRadius: "5vh"}, 
        { 
            x: "0%", 
            duration: 0.6, 
            ease: "sine.inOut"
        }
    ,0.05)
    .to(transitionimga, 
        {
            borderRadius: "0", 
            duration: 0.2, 
            ease: "power2.inOut"
        }
    ,0.35)
    .to(transitionimgb, 
        {
            borderRadius: "0", 
            duration: 0.2, 
            ease: "power2.inOut"
        }
    ,"<")
    .fromTo(fluttercontainer,
        {x: "-68%"},
        { 
            x: "50%",
            duration: 5.4,
            ease: "slow(0.45,0.7)"
        }
    ,0.05)
    .fromTo(trancontainer,
        {rotation: "-30"},
        { 
            rotation: "0" ,
            duration: 0.75,
            ease: "power3.inOut"
        }
    ,3.41)
    .to(transitionimgb, {x: "100%",duration: 0.6,ease: "sine.inOut"},4.61)
    .to(transitionimga, {x: "100%",duration: 0.6,ease: "sine.inOut"},4.66)
    .to(transitionimgb, {borderRadius: "5vh",duration:0.2,ease: "power2.inOut"},4.71)
    .to(transitionimga, {borderRadius: "5vh",duration:0.2,ease: "power2.inOut"},"<");

    tranimgright = gsap.timeline({
        delay:0.1,
        paused:true,
        onComplete:RevertStyle
    });
    tranimgright.fromTo(transitionimga, 
        {x: "100%", borderRadius: "5vh"}, 
        { 
            x: "0%", 
            duration: 0.6, 
            ease: "sine.inOut"
        }
    ,0)
    .fromTo(transitionimgb, 
        {x: "100%", borderRadius: "5vh"}, 
        { 
            x: "0%", 
            duration: 0.6, 
            ease: "sine.inOut"
        }
    ,0.05)
    .to(transitionimga, 
        {
            borderRadius: "0", 
            duration: 0.2, 
            ease: "power2.inOut"
        }
    ,0.35)
    .to(transitionimgb, 
        {
            borderRadius: "0", 
            duration: 0.2, 
            ease: "power2.inOut"
        }
    ,"<")
    .fromTo(fluttercontainer,
        {x: "68%"},
        { 
            x: "-50%",
            duration: 5.4,
            ease: "slow(0.45,0.7)"
        }
    ,0.05)
    .fromTo(trancontainer,
        {rotation: "30"},
        { 
            rotation: "0" ,
            duration: 0.75,
            ease: "power3.inOut"
        }
    ,3.41)
    .to(transitionimgb, {x: "-100%",duration: 0.6,ease: "sine.inOut"},4.61)
    .to(transitionimga, {x: "-100%",duration: 0.6,ease: "sine.inOut"},4.66)
    .to(transitionimgb, {borderRadius: "5vh",duration:0.2,ease: "power2.inOut"},4.71)
    .to(transitionimga, {borderRadius: "5vh",duration:0.2,ease: "power2.inOut"},"<");
    
    // svglineleft = gsap.timeline({
    //     paused:true
    // });
    // svglineleft.fromTo(transvg1,
    //     { x: "-60%"},
    //     { 
    //         x: "-10%",
    //         duration: 8,
    //         ease: "slow(0.5,0.4,false)"
    //     }
    // ,"<")
    // .fromTo(transvg2,
    //     { x: "-60%"},
    //     { 
    //         x: "-10%",
    //         duration: 8,
    //         ease: "slow(0.5,0.4,false)"
    //     }
    // ,"<")   
    // .fromTo(transvg1,
    //     { opacity: 1},
    //     {   
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: "sine.out"
    //     }
    // ,"-=2")
    // .fromTo(transvg2,
    //     { opacity: 1},
    //     {   
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: "sine.out"
    //     }
    // ,"<");
})

function trananimation() {
    flutterA();
    setTimeout(() => {
        falutremoveA();flutterB();Flickerfunction();
        flicker = setInterval(Flickerfunction,500);
        fluttertext.forEach(target => {
            target.style.opacity = '0%';
        });
    },350);
    setTimeout(() => {
        falutremoveB();clearInterval(flicker);
        faultA.forEach(target => {
            target.style.opacity = '0%';
        });
        faultB.forEach(target => {
            target.style.opacity = '0%';
        });
        successtext.forEach(target => {
            target.style.opacity = '100%';
        });
    },2000);
}

let A = true;

const Flickerfunction = () => {
    if (A) {
        faultA.forEach(target => {
            target.style.opacity = '100%';
        });
        faultB.forEach(target => {
            target.style.opacity = '0%';
        });
        A = false;
    }   
    else {
        faultA.forEach(target => {
            target.style.opacity = '0%';
        });
        faultB.forEach(target => {
            target.style.opacity = '100%';
        });
        A = true;
    }    
}

function RevertStyle() {
    fluttertext.forEach(target => {
        target.style.opacity = '100%';
    });
    faultA.forEach(target => {
        target.style.opacity = '0%';
    });
    faultB.forEach(target => {
        target.style.opacity = '0%';
    });
    successtext.forEach(target => {
        target.style.opacity = '0%';
    });
    transitionimga.style.display = 'none';
    transitionimgb.style.display = 'none';
    Turning = false;
}

function randomclip(target) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const w = Math.random() * 15 + 70;
    const h = Math.random() * 15 + 70;
    target.style.clipPath = `polygon(${x}% ${y}%, ${x + w}% ${y}%, ${x + w}% ${y + h}%, ${x}% ${y + h}%)`;
}

