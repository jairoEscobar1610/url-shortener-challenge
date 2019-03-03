import { Deserializable } from './deserializable.model';

export class Visit implements Deserializable {

    public urlId:string;  
    public visitedAt:Date;

    /**
     * @author Jairo Juvenal Escobar Calzada
     * @description Object deserialization for any model
     * @param input JSON to be mapped on the model
     * @returns Visit
     */ 
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}