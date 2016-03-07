class OpencultuurdataResource {
    constructor($http, settings, httpConfigBuilder) {
        this.$http = $http;
        this.settings = settings;
        this.httpConfigBuilder = httpConfigBuilder;
    }

    getOpenBeelden(query) {
        var payload = {
            query,
            size: 100
        };

        return this.$http.post(
            this.settings.BACKEND_BASE_URL + 'v0/openbeelden/search',
            payload,
            this.httpConfigBuilder.aHttpConfig()
                .withResponseType('json')
                .withHeader('Content-Type', 'application/x-www-form-urlencoded')
                .build()
        );
    }
}

OpencultuurdataResource.$inject = ['$http', 'settings', 'httpConfigBuilder'];

export default OpencultuurdataResource;
