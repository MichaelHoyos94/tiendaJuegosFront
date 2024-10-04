export class GameGetDto {
    id:number;
    title:String;
    cover:String;
    description:String;
    price:Number;
    activated!:boolean;

    constructor(id:number, title:String, cover:String, description:String, price:Number){
        this.id = id;
        this.title = title;
        this.cover = cover;
        this.description = description;
        this.price = price
    }
}
