module.exports = class ErrorRes extends Error {

    constructor(message = 'Something went wrong.', status = 400, name = 'Thrown error') {
        super(message);
        this.status = status;
        this.name = name;
    }
}