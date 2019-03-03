import { Deserializable } from './deserializable.model';
import { Visit } from './visit.model';

export class Url implements Deserializable {
    public _id:string;
    public url:string;   
    public user: string;
    public hash: string;
    public isCustom:boolean;
    public removeToken: string;
    public createdAt:Date;
    public removedAt:Date;
    public active:boolean;

    public shorten:string;
    public removeUrl:string;
    public visits:Visit;
    public visitCount:number;

    /**
     * @author Jairo Juvenal Escobar Calzada
     * @description Object deserialization for any model
     * @param input JSON to be mapped on the model
     * @returns Url
     */ 
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}