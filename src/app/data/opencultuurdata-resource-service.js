class OpencultuurdataResource {
    constructor($http, settings, httpConfigBuilder) {
        this.$http = $http;
        this.settings = settings;
        this.httpConfigBuilder = httpConfigBuilder;
    }

    getOpenBeelden(query) {
        var payload = {
            size: 100
        };

        if (typeof query !== 'undefined') {
            payload.query = query;
        }

        return this.$http.post(
            this.settings.BACKEND_BASE_URL + 'v0/openbeelden/search',
            payload,
            this.httpConfigBuilder.getHttpConfigForJsonResponse()
        );
    }
}

OpencultuurdataResource.$inject = ['$http', 'settings', 'httpConfigBuilder'];

export default OpencultuurdataResource;
