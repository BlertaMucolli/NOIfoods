const review = document.querySelector('h2');
const navigationControlRight = document.querySelector('.control-r');
const navigationControlLeft = document.querySelector('.control-l');



const Application = PIXI.Application;
const app = new Application({
    width: 1920,
    height: 1080
});

document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;

loader.add([
    'images/Review1.1.png',
    'images/Review2.1.png',
    'images/Review3.1.png',
    'images/Review4.1.png'
])

.load(setup);

function setup(loader, resources){
    const img1 = PIXI.Sprite.from(resources['images/Review1.1.png'].name);
    const img2 = PIXI.Sprite.from(resources['images/Review2.1.png'].name);
    const img3 = PIXI.Sprite.from(resources['images/Review3.1.png'].name);
    const img4 = PIXI.Sprite.from(resources['images/Review4.1.png'].name);



    const container = new PIXI.Container();
    container.addChild(img4, img3, img2, img1);
    app.stage.addChild(container);

    container.sortableChildren = true;

    const options = {
        amplitude: 300,
        wavelength: 0,
        speed: 700,
        brightness: 1,
        radius: -1
    }

    const shockwaveFilter = new PIXI.filters.ShockwaveFilter([
        app.screen.width / 2,
        app.screen.height / 2
    ],
    options, 0);

    container.filters = [shockwaveFilter];

    let currentReview = 1;
    let waveReady = true;
    navigationControlRight.addEventListener('click', function(){
        if((currentReview < 4) && (waveReady === true)){
            currentReview++;
            shockwaveFilter.wavelength = 300;
            switch(currentReview){
                case 1:
                    review.innerHTML = 'Customer: Olivia Wilson';
                    break;
                case 2:
                    review.innerHTML = 'Customer: Ella Adams';
                    app.ticker.add(slide1To2);
                    break;
                case 3:
                    review.innerHTML = 'Customer: Rina Will';
                    app.ticker.add(slide2To3);
                    break;
                case 4:
                    review.innerHTML = 'Customer: Will Marley';
                    app.ticker.add(slide3To4);
                }

            function slide1To2(){
                startAnimation(img1, img2);
                if(shockwaveFilter.time > 2){
                    endAnimation(img1, img2, slide1To2);
                }
            }
            function slide2To3(){
                startAnimation(img2, img3);
                if(shockwaveFilter.time > 2){
                    endAnimation(img2, img3, slide2To3);
                }
            }
            function slide3To4(){
                startAnimation(img3, img4);
                if(shockwaveFilter.time > 2){
                    endAnimation(img3, img4, slide3To4);
                }
            }
        }
    });

    navigationControlLeft.addEventListener('click', function(){
        if((currentReview > 1) && (waveReady === true)){
            currentReview--;
            shockwaveFilter.wavelength = 300;
            switch(currentReview){
                case 1:
                    review.innerHTML = 'Customer: Olivia Wilson';
                    app.ticker.add(slide2To1);
                    break;
                case 2:
                    review.innerHTML = 'Customer: Ella Adams';
                    app.ticker.add(slide3To2);
                    break;
                case 3:
                    review.innerHTML = 'Customer: Rina Will';
                    app.ticker.add(slide4To3);
                    break;
                case 4:
                    review.innerHTML = 'Customer: Will Marley';
                }

            function slide4To3(){
                startAnimation(img4, img3);
                if(shockwaveFilter.time > 2){
                    endAnimation(img4, img3, slide4To3);
                }
            }
            function slide3To2(){
                startAnimation(img3, img2);
                if(shockwaveFilter.time > 2){
                    endAnimation(img3, img2, slide3To2);
                }
            }
            function slide2To1(){
                startAnimation(img2, img1);
                if(shockwaveFilter.time > 2){
                    endAnimation(img2, img1, slide2To1);
                }
            }
        }
    });

    function startAnimation(image1, image2){
        shockwaveFilter.time += 0.01;
        image1.alpha -= 0.008;
        image2.alpha = 1;
        waveReady = false;
    }

    function endAnimation(image1, image2, tickerCallback){
        shockwaveFilter.time = 0;
        shockwaveFilter.wavelength = 0;
        image2.zIndex = 2;
        image1.zIndex = 1;
        image1.alpha = 0;
        waveReady = true;
        app.ticker.remove(tickerCallback);
    }
   
}