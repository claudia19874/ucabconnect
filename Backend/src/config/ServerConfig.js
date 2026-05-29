class ServerConfig {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.apiPrefix = '/api';
    }
}

module.exports = new ServerConfig();