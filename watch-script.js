
let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true
  });
  document.getElementById('video-container').appendChild(app.view);
  
  
  const videoPath = 'images/video6.mp4'; 
  const videoTexture = PIXI.Texture.from(videoPath);
  
  
  const videoSprite = new PIXI.Sprite(videoTexture);
  videoSprite.width = app.screen.width;
  videoSprite.height = app.screen.height;
  app.stage.addChild(videoSprite);
  
 
  const godrayFilter = new PIXI.filters.GodrayFilter();
  godrayFilter.gain = 0.6; 
  godrayFilter.lacunarity = 2.5;
  videoSprite.filters = [godrayFilter];
  
  
  videoTexture.baseTexture.resource.source.loop = true;
  videoTexture.baseTexture.resource.source.muted = true;
  videoTexture.baseTexture.resource.source.play();
  
 
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    videoSprite.width = app.screen.width;
    videoSprite.height = app.screen.height;
  });
  
  
  app.ticker.add((delta) => {
    godrayFilter.time += 0.01 * delta; 
  });