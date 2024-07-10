export class Assistent {
    id;
    name;
    description;
    speak;

    get _id() { return this.id; }
    set _id(id) { this.id = id; }
    get _name() { return this.name; }
    set _name(name) { this.name = name; }
    get _description() { return this.description; }
    set _description(description) { this.description = description; }
    get _speak() { return this.speak; }
    set _speak(speak) { this.speak = speak; }

    constructor({
        id = 0,
        name = 'Assistent',
        description = 'Assistent',
        speak = () => { },
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.speak = (msg) => {
            console.log('speak(), msg: ', msg);
            return speak(msg);
        };
    }
}