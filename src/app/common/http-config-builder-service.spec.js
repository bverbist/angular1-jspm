import HttpConfigBuilder from './http-config-builder-service';
import settings from '../config/settings';

describe('HttpConfigBuilder:', () => {

    let httpConfigBuilder;

    beforeEach(() => {
        httpConfigBuilder = new HttpConfigBuilder(settings);
    });

    describe('aHttpConfig() returns a builder:', () => {
        let aHttpConfig;

        beforeEach(() => {
            aHttpConfig = httpConfigBuilder.aHttpConfig();
        });

        it('build() returns an httpConfig object with a default timeout if not overwritten', () => {
            const actual = aHttpConfig.build();

            expect(actual.timeout).toBe(settings.REST_TIMEOUT_IN_MILLIS);
        });

        it('withTimeout() sets the timeout field', () => {
            const actual = aHttpConfig
                .withTimeout(23190)
                .build();

            expect(actual.timeout).toBe(23190);
        });

        it('withResponseType() sets the responseType field', () => {
            const actual = aHttpConfig
                .withResponseType('abc')
                .build();

            expect(actual.responseType).toBe('abc');
        });
    });

    it('getHttpConfigDefault() returns an httpConfig object with only the default timeout set', () => {
        const actual = httpConfigBuilder.getHttpConfigDefault();

        expect(actual.timeout).toBe(settings.REST_TIMEOUT_IN_MILLIS);

        expect(actual.responseType).toBeUndefined();
        expect(actual.headers).toBeUndefined();
    });

    it('getHttpConfigForJsonResponse() returns an httpConfig object with the default timeout and json as responseType', () => {
        const actual = httpConfigBuilder.getHttpConfigForJsonResponse();

        expect(actual.timeout).toBe(settings.REST_TIMEOUT_IN_MILLIS);
        expect(actual.responseType).toBe('json');

        expect(actual.headers).toBeUndefined();
    });

});
