import Player from '@vimeo/player';
import throttle from 'lodash.throttle';



const iframe = document.querySelector('iframe');
const player = new Player(iframe);



KEY_TIME = "videoplayer-current-time";
player.on('timeupdate', throttle(onPlay, 1000));



function onPlay({seconds}) {
localStorage.setItem(KEY_TIME, seconds);
}


player.setCurrentTime(localStorage.getItem(KEY_TIME) || 0)
.then(function(data) {
    console.log(data);
})
.catch(function (error)
{console.error(error)})