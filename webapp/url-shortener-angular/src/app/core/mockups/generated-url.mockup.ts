import { Url } from "../../shared/models/url.model";
import { Visit } from '../../shared/models/visit.model';

let mockupGeneratedUrls:Array<Url>;
mockupGeneratedUrls = [
    new Url(),new Url()
]
mockupGeneratedUrls[0]= {
    _id:"",
    user:"",
    isCustom:true,
    removeToken:"ABCDEFG",
    createdAt:new Date(),
    removedAt:undefined,
    active:true,
    url:"http://site.com",
    shorten:"http://localhost/ABCDEFG",
    hash:"ABCDEFG",
    removeUrl:"http://localhost/ABCDEFG/remove/ABCDEFG",
    visits:new Array<Visit>(),
    visitCount:0,
    deserialize:undefined
}
mockupGeneratedUrls[1] = {
    _id:"",
    user:"",
    isCustom:true,
    removeToken:"ABCDEF1",
    createdAt:new Date(),
    removedAt:undefined,
    active:true,
    url:"http://sit2.com",
    shorten:"http://localhost/ABCDEF1",
    hash:"ABCDEFG",
    removeUrl:"http://localhost/ABCDEFG/remove/ABCDEF1",
    visitCount:1,
    visits:[],
    deserialize:undefined
}
export var MockupGeneratedUrls = mockupGeneratedUrls;