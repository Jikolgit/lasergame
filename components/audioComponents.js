import {Howl, Howler} from 'howler';
let audioOn =true;
let audioSrc1 = new URL('../sound/lasershoot.ogg',import.meta.url);
let audioSrc2 = new URL('../sound/rotate.wav',import.meta.url);


let laserShootAudio = new Howl({
    src: [audioSrc1.href],
    sprite:{
      laser0:[0,400,false],
      laser1:[1000,2000,true]
    },
    
    volume:0.05
  });
let rotateAudio = new Howl({
  src: [audioSrc2.href],
  sprite:{
    rotate1:[500,500]
  },
  loop:true,
  volume:0.08
});

export class AudioManage{

    constructor(){

    }
   static  init(){}
   static soundONOFF(state)
   {


    if(state == 'ON_MENU')
    {
      audioOn = true;
      
    }
    else if(state =='OFF_MENU')
    {
      audioOn = false;
      
    }
   }
   static play(audio){
      if(audioOn)
      {
        if(audio=='laser-shoot'){laserShootAudio.play('laser0'),laserShootAudio.play('laser1')} // ici
        if(audio=='laser-shoot-stop'){laserShootAudio.stop()} // ici
        if(audio=='rotate-start'){rotateAudio.play('rotate1')} // ici
        if(audio=='rotate-stop'){rotateAudio.stop()} // ici
      }

    }
    static playAmbient(state)
    {
      if(audioOn)
      {
        // if(state == 'play')
        // {
        //   ambient.play()
        // }
        // else if(state == 'pause')
        // {
        //   ambient.pause()
        // }
        // else if(state=='stop')
        // {
        //   ambient.stop()
        // }
      }

      
    }
}