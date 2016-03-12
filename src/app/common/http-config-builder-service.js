const RESPONSE_TYPE_JSON = 'json';
const DEFAULT_REST_TIMEOUT_IN_MILLIS = 3000;

class HttpConfigBuilder {
    static aHttpConfig() {
        return new HttpConfigBuilder();
    }

    constructor() {
        this.config = {
            timeout: DEFAULT_REST_TIMEOUT_IN_MILLIS
        };
    }

    withTimeout(timeoutInMillis) {
        this.config.timeout = timeoutInMillis;
        return this;
    }

    withResponseType(responseType) {
        this.config.responseType = responseType;
        return this;
    }

    withHeader(name, value) {
        if (typeof this.config.headers === 'undefined') {
            this.config.headers = {};
        }
        this.config.headers[name] = value;
        return this;
    }

    withTransformResponse(transformResponseFunction) {
        this.config.transformResponse = transformResponseFunction;
        return this;
    }

    build() {
        return this.config;
    }
}

class HttpConfigBuilderWithDefaults {
    constructor(settings) {
        this.settings = settings;
    }

    aHttpConfig() {
        return HttpConfigBuilder.aHttpConfig().withTimeout(this.settings.REST_TIMEOUT_IN_MILLIS);
    }

    getHttpConfigDefault() {
        return this.aHttpConfig().build();
    }

    getHttpConfigForJsonResponse() {
        return this.aHttpConfig().withResponseType(RESPONSE_TYPE_JSON).build();
    }
}

HttpConfigBuilderWithDefaults.$inject = ['settings'];

export default HttpConfigBuilderWithDefaults;
