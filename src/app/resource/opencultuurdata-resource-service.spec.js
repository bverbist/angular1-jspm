'use strict';

describe('opencultuurdataResource:', () => {
    let opencultuurdataResource, $httpBackend, settings;

    beforeEach(() => {
        opencultuurdataResource = iceUnit.builder
            .service('app.resource', 'opencultuurdataResource')
            .build();

        $httpBackend = iceUnit.inject('$httpBackend');
        settings = iceUnit.inject('settings');
    });

    afterEach(() => {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('getOpenBeelden()', () => {
        const EXPECTED_SIZE = 100;

        it('does a REST POST where the input query param is placed in the payload', () => {
            const expectedPayload = {
                size: EXPECTED_SIZE,
                query: 'auto'
            };

            $httpBackend
                .expectPOST(settings.BACKEND_BASE_URL + 'v0/openbeelden/search', expectedPayload)
                .respond(200, {});

            const httpPromise = opencultuurdataResource.getOpenBeelden('auto');

            expect(httpPromise.then).toBeDefined();
            expect(httpPromise.catch).toBeDefined();

            $httpBackend.flush();
        });

        it('does not set query in payload if not passed', () => {
            const expectedPayload = {
                size: EXPECTED_SIZE
            };

            $httpBackend
                .expectPOST(settings.BACKEND_BASE_URL + 'v0/openbeelden/search', expectedPayload)
                .respond(200, {});

            opencultuurdataResource.getOpenBeelden();

            $httpBackend.flush();
        });
    });

});
