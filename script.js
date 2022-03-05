const $ = document.querySelector.bind(document);

const video = $('#video');
const canvas = $('#canvas');
const snap = $('#snap');
const errorMsg = $('#spanErrorMsg');
const stopbtn = $('#stop');
const hiddenbtn = $('#hidden');
const stoptoggle = $('#stoptoggle');
const hiddentoggle = $('#hiddentoggle');
const downloadbtn = $('#download');
const blurValue = $('#input--blur');
const constrastValue = $('#input--constrast');
const hueValue = $('#input--hue');
const sepiaValue = $('#input--sepia');
const brightnessValue = $('#input--brightness');
const saturateValue = $('#input--saturate');


const resetbtn = $('#resetbtn');
const context = canvas.getContext('2d');
const inputvalue = document.querySelectorAll('.input');

const constraint = {
    audio: false,
    video: {
        width:800,height:600
    }
};

let mirrorApp ={
  
    isStop: false,
    isHidden:false,

    //render webcame 
    render: function(){
        navigator.mediaDevices.getUserMedia(constraint)
        .then(function(mediaStream) {
          var video = document.querySelector('video');
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); }); 
    },

    handleEvent: function(){
        const _this = this;

    //capture image
    snap.addEventListener('click',function(){
    
        //set filter canvas
    context.filter = 'saturate(' + saturateValue.value+ '%' +')' + 'brightness(' + brightnessValue.value+ '%' +')' + 'blur(' + blurValue.value/10 + 'px' +')' + 'contrast(' + constrastValue.value+ '%' +')' +'hue-rotate(' + hueValue.value+ 'deg' +')' +'sepia(' + sepiaValue.value+ '%' +')';
      context.drawImage(video,0,0,640,480);  
        })

        
    stopbtn.addEventListener("click",function(){
            if(_this.isStop){
                video.play();
                _this.isStop = false;
                stoptoggle.innerHTML = "Stop";
            }
            else{
                video.pause();
                _this.isStop = true;
                stoptoggle.innerHTML  = "Play";
            }
            
            
    })

    hiddenbtn.addEventListener("click",function(){

            if(_this.isHidden){
                _this.render();
                _this.isHidden = false;
                hiddentoggle.innerHTML = "Hidden";
            }
            else{
                video.srcObject = null;
                _this.isHidden = true;
                hiddentoggle.innerHTML = "Show";
            }
            
        })

    downloadbtn.addEventListener("click",function(){
         
                var link = document.createElement('a');
                link.download = 'Image.png';
                link.href = canvas.toDataURL();
                link.click();
             
        });

       
        
        for(i=0;i<inputvalue.length;i++)
        {
         inputvalue[i].oninput = function(){
        video.style.filter = 'saturate(' + saturateValue.value+ '%' +')' + 'brightness(' + brightnessValue.value+ '%' +')' + 'blur(' + blurValue.value/10 + 'px' +')' + 'contrast(' + constrastValue.value+ '%' +')' +'hue-rotate(' + hueValue.value+ 'deg' +')' +'sepia(' + sepiaValue.value+ '%' +')';
            }
        }

        resetbtn.addEventListener('click', function(){
            blurValue.value = 0;
            constrastValue.value = 100;
            hueValue.value = 0;
            sepiaValue.value = 0;
            saturateValue.value = 100;
            brightnessValue.value = 100;
            video.style.filter ='none'
        });

    },

  
    

    start: function(){
        this.render();
        this.handleEvent();
    }
}

mirrorApp.start();




 

