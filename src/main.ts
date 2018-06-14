import 'phaser';

import MainScene from './scenes/MainScene';

const config:GameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1024,
    height: 600,
    resolution: 1, 
    backgroundColor: '#87ceeb',
    scene: [
      MainScene
    ]
};

new Phaser.Game(config);
