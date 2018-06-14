
export enum Shine{
    None = 0,
    Nice, 
    Hot 
}

export class Sun extends Phaser.GameObjects.Image{

    public sunshine:Phaser.GameObjects.Image;
    public shining : Shine;

    private xLocal: number = 50;
    private yLocal: number = 50;
    
    static preLoad(scene:Phaser.Scene) : void{
        scene.load.image('sun', '../../assets/sprites/sun.png')
        scene.load.image('sunshine', '../../assets/sprites/flare2.png');
    }

    constructor(scene : Phaser.Scene){
        super(scene, 0, 0, 'sun')
        
        this.initImage();
        this.initEvents();
        this.createSunshine();
        this.setInteractive();
        
        this.scene.add.existing(this);
    }

    private changeSunshine(){
        this.shining = this.shining < Shine.Hot 
            ? this.shining + 1
            : Shine.None;

        this.sunshine.setAlpha(Math.pow(this.shining, 2) * 0.2);

        this.emit("shine");
    }

    private createSunshine(){
    
        const scale = 1.8;
        this.sunshine = new Phaser.GameObjects.Image(this.scene, 0, 0, 'sunshine');
        this.sunshine.setPosition(this.xLocal - (this.xLocal * scale), this.yLocal - (this.yLocal * scale));
        this.sunshine.setAlpha(.5);           
        this.sunshine.setDisplaySize(200, 200)        
        this.sunshine.setSize(500, 500)        
        this.sunshine.setOrigin(0.4, 0.4);  
        this.sunshine.setScale(scale);
        this.sunshine.setAlpha(0);
        this.scene.add.existing(this.sunshine);
    }

    private initEvents(){
        this.on('pointerdown', this.changeSunshine);
    }

    private initImage(): void {  
        this.setPosition(this.xLocal, this.yLocal);
        this.setScale(0.8);        
        this.setDisplaySize(200, 200);
        this.setSize(100, 100);      
        this.setAlpha(1);          
        this.setFlip(false, false);
        this.setOrigin(0.4, 0.4);  
        this.setAngle(0); 
    }                        
}    