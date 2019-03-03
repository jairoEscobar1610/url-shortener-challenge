export interface Deserializable {
    /**
     * @description Object deserialization for any model
     * @param input JSON to be mapped on the model
     */
    deserialize(input: any): this;
}