import * as RainConfig from '../../assets/config/RainConfig'

export enum Rainfall{
    None = 0,
    Drizzle,
    Pouring
}

export class Cloud extends Phaser.GameObjects.Image{

    public raining : Rainfall = Rainfall.None;
    public rain : Phaser.GameObjects.Particles.ParticleEmitter;

    static preLoad(scene:Phaser.Scene) : void{
        scene.load.image('cloud', '../../assets/sprites/cloud.png');
        scene.load.image('rain', '../../assets/sprites/rain-drop-sm.png');
    }

    constructor(scene : Phaser.Scene){
        super(scene, 0, 0, 'cloud')
          
        this.initCloud();
        this.makeRain();
        this.initEvents();
        this.setInteractive();

        this.scene.add.existing(this);
        
    }

    private increaseRain(){
        this.raining = this.raining < Rainfall.Pouring
            ? this.raining + 1
            : Rainfall.None
    
        this.rain.setQuantity(Math.pow(this.raining, 2));
        this.emit('rain');

        console.log('cloud clicked');
    }

    private makeRain():void{
        
        const config = {
                "blendMode": 2,
                "gravityX": -600, //change for angle and intensity
                "gravityY": 800,
                "maxParticles": 0.9,
                "accelerationX": 0,
                "accelerationY": 100,
                "quantity": 0,
                "speed": 200,
                "scale": .3,
                x : 0,
                y : 0
            }
        
        config.x = this.x + (this.width / 3);
        config.y = this.displayHeight;
        config.quantity = this.raining;
        
        this.rain = this.scene.add
            .particles('rain')
            .createEmitter(config);
        ;
        this.rain.start();

    }
    private initCloud(): void {  
        this.setPosition(this.scene.sys.canvas.width - 250, 75)
        this.setScale(0.8);            
        this.setDisplaySize(250, 150);
        this.setSize(250, 150);      
        this.setAlpha(1);          
        this.setOrigin(0.4, 0.4);  
        this.setAngle(0);          

        console.log(this.eventNames())
    }   

    private initEvents(){
        
        this.on('pointerdown', this.increaseRain)
    }
    
    
}    