import { Deserializable } from './deserializable.model';

export class Dialog implements Deserializable {

    public title:string;  
    public body:Array<string>;
    public acceptText:string;
    public cancelText:string;

    /**
     * @author Jairo Juvenal Escobar Calzada
     * @description Object deserialization for any model
     * @param input JSON to be mapped on the model
     * @returns Dialog
     */ 
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}