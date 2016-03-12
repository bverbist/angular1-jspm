const OPENBEELDEN_DEFAULT_QUERY = 'auto';
const OPENBEELDEN_DEFAULT_SIZE = 100;

class OpencultuurdataResource {
    constructor($http, settings, httpConfigBuilder) {
        this.$http = $http;
        this.settings = settings;
        this.httpConfigBuilder = httpConfigBuilder;
    }

    getOpenBeelden(query = OPENBEELDEN_DEFAULT_QUERY) {
        const payload = {
            query,
            size: OPENBEELDEN_DEFAULT_SIZE
        };
        const transformResponseFunction = data => data.hits.hits;

        return this.$http.post(
            this.settings.BACKEND_BASE_URL + 'v0/openbeelden/search',
            payload,
            this.httpConfigBuilder.aHttpConfig()
                .withResponseType('json')
                .withHeader('Content-Type', 'application/x-www-form-urlencoded')
                .withTransformResponse(transformResponseFunction)
                .build()
        );
    }
}

OpencultuurdataResource.$inject = ['$http', 'settings', 'httpConfigBuilder'];

export default OpencultuurdataResource;
