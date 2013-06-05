function AudioPlayer() {
  var self = this;
  var sfx = { };
  var music = { };
  var loaded = 0;
  var alreadyDone = false;
  var nowPlaying = null;

  var initSound = function(src) {
    loaded += 1;
    var el = new Audio(src);
    el.onload = function () {
      loaded -= 1;
    }
    el.load();
    return el;
  };

  var initMusic = function(src) {
    loaded += 1;
    var el = new Audio(src);
    el.onload = function () {
      loaded -= 1;
    }
    el.loop = true;

    el.load();
    return el;
  };

  self.init = function() {
    // stop all other sounds
    self.stopMusic();

    // HACK: stop loading shit again
    if (alreadyDone)
      return;


    sfx.punchMiss = initSound('audio/Weak Whiff.wav');
    sfx.punchHit = initSound('audio/Small Hit.wav');
    sfx.smashHit = initSound('audio/Smack.wav');
    sfx.death = initSound('audio/SuperScope Huge Shot.wav');
    sfx.jump = initSound('audio/Mario Super Jump.wav');

    music.snoop = initMusic('audio/kirbysnoop.mp3');
    music.slam = initMusic('audio/slam.mp3');
    //music.slam = initMusic('audio/Smack.wav');
    music.pokemon = initMusic('audio/pokemon.mp3');
    music.derezzed = initMusic('audio/derezzed.mp3');

    alreadyDone = true;
  };

  self.playSfx = function(sound) {
    sfx[sound].currentTime = 0;
    sfx[sound].src = sfx[sound].src;
    sfx[sound].play();
  };

  self.stopMusic = function() {
    for (var i in music) {
      music[i].pause();
      music[i].currentTime = 0;
    }
    nowPlaying = null;
  };

  self.playMusic = function(m) {
    if (nowPlaying) {
      return;
    }
    setTimeout(function() {
      music[m].currentTime = 0;
      music[m].src = music[m].src;
      music[m].loop = true;
      music[m].play();

      nowPlaying = music[m];
    }, 1000);
  };
};
