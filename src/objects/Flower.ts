import { Sun, Shine } from "./Sun";
import { Cloud, Rainfall } from "./Cloud";

export enum Health {
    Poor = 0,
    Good,
    Great
}

export class Flower extends Phaser.GameObjects.Image{

    private rainThreshold:number = 8;
    private sunThreshold:number = 8;
    private rainConsumed:number = 0;
    private sunConsumed:number = 0;

    private size:number = 0.1;

    private sunshineTimer : Phaser.Time.TimerEvent;
    private rainTimer : Phaser.Time.TimerEvent;

    static preLoad(scene:Phaser.Scene) : void{
        scene.load.image('flower', '../../assets/sprites/flower.png');
    }

    constructor(scene : Phaser.Scene,private sun:Sun,private cloud:Cloud){
        super(scene, 0, 0, 'flower')

        this.initFlower();
        this.initRain();
        this.initSunshine();

        scene.add.existing(this);
    }

    private initFlower(): void {  
        this.setScale(this.size);            
        this.setDisplaySize(250, 150);
        this.setSize(250, 150);
          
        this.setAlpha(1);          
        //this.setOrigin(0.4, 0.4);  
        this.setAngle(0);          
        this.setPosition((this.scene.sys.canvas.width / 2) - (this.width / 2), this.scene.sys.canvas.height - this.displayHeight);
    }

    private initSunshine(){
        this.sunshineTimer = this.scene.time.addEvent({
            delay:1000, 
            callback : this.photoSynthesis,
            loop : true,
            callbackScope : this
        });
    }
            
    private initRain(){
        this.rainTimer = this.scene.time.addEvent({
            delay:1000, 
            callback : this.capillaryAction,
            loop : true,
            callbackScope : this
        });

    }
    
    private capillaryAction(){        
        const rainFall = this.cloud.raining;
        
        switch(rainFall){
            case Rainfall.None : 
                this.rainConsumed--;
                break;

            case Rainfall.Drizzle :
                this.rainConsumed++;
                break;

            case Rainfall.Pouring :
                this.rainConsumed += 2;
                break;
        }
        if(this.rainConsumed < 0)
            this.rainConsumed = 0;

        this.grow();
    }
        
    private photoSynthesis(){
        const shine : Shine = this.sun.shining;
        
        switch(shine){
            case Shine.None : 
                this.sunConsumed--;
                break;

            case Shine.Nice : 
                this.sunConsumed++;
                break;

            case Shine.Hot :
                this.sunConsumed += 2;
                break;
        }
        
        if(this.sunConsumed < 0)
            this.sunConsumed = 0;

        this.grow();
    }

    private getSunScale(){
        return this.scaleFactor(this.sun.shining);
    }

    private getRainScale(){
        return this.scaleFactor(this.cloud.raining);
    }

    private grow(){
        console.log("growing");
        
        const growth = this.getGrowthFactor();
        this.size += growth;


        if(this.rainThreshold < 0){
            this.rainThreshold = 0;
        }
        
        if(this.sunThreshold < 0){
            this.sunThreshold = 0;
        }
        
        if(this.size > 1)
            this.size = 1;

        if(this.size < 0.1)
            this.size = 0.1;
        
        this.setScale(this.size);
        this.setPosition((this.scene.sys.canvas.width / 2) - (this.width / 2), this.scene.sys.canvas.height);
        this.setOrigin(this.size, this.size);
        this.setDisplayOrigin((this.scene.sys.canvas.width / 2) - (this.width / 2), this.scene.sys.canvas.height)
    }

    private getGrowthFactor(){
        
        const growthFactor = 0;

        if(this.rainConsumed > this.minThreshold(this.rainThreshold)
            && this.sunConsumed > this.minThreshold(this.sunThreshold)
            && this.rainConsumed < this.maxThreshold(this.rainThreshold)
            && this.sunConsumed < this.maxThreshold(this.sunThreshold))
            {
                return growthFactor + 0.2;
            }

        return growthFactor - 0.1;
    }

    private maxThreshold(target:number){
        return target * 3.5;
    }

    private minThreshold(target:number){
        return target *  0.2;
    }

    private scaleFactor(factor : number) : number{
        return Math.pow(factor, 2) * 0.02;
    }
    
    public report(text : Array<string>){
        //text.push
        text.push('Growth Factor : ' + this.getGrowthFactor() );
        text.push('Size          : ' + this.size)
        text.push('Flower');
        text.push('\tRain');
        text.push('\t\tconsumed  : ' + this.rainConsumed);
        text.push('\t\tThreshold : ');
        text.push('\t\t\tmin : ' + this.minThreshold(this.rainThreshold));
        text.push('\t\t\tmax : ' + this.maxThreshold(this.rainThreshold));
        text.push('\t\ttime      : ' + this.rainTimer.getProgress().toString().substr(0, 4));

        text.push('\tSun');
        text.push('\t\tconsumed  : ' + this.sunConsumed);
        text.push('\t\tThreshold : ');
        text.push('\t\t\tmin : ' + this.minThreshold(this.sunThreshold));
        text.push('\t\t\tmax : ' + this.maxThreshold(this.sunThreshold))
        text.push('\t\ttime      : ' + this.sunshineTimer.getProgress().toString().substr(0, 4));
        
        
    }

}