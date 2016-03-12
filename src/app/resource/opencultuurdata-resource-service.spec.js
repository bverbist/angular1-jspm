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
        const OPENBEELDEN_EMPTY_RESULT = {
            hits: {
                hits: [],
                max_score: null,
                total: 0
            },
            took: 14
        };

        it('does a REST POST where the input query param is placed in the payload', () => {
            const expectedPayload = {
                size: EXPECTED_SIZE,
                query: 'someInputValue'
            };

            $httpBackend
                .expectPOST(settings.BACKEND_BASE_URL + 'v0/openbeelden/search', expectedPayload)
                .respond(200, OPENBEELDEN_EMPTY_RESULT);

            const httpPromise = opencultuurdataResource.getOpenBeelden('someInputValue');

            expect(httpPromise.then).toBeDefined();
            expect(httpPromise.catch).toBeDefined();

            $httpBackend.flush();
        });

        it('takes auto as default query value in payload if not passed', () => {
            const expectedPayload = {
                query: 'auto',
                size: EXPECTED_SIZE
            };

            $httpBackend
                .expectPOST(settings.BACKEND_BASE_URL + 'v0/openbeelden/search', expectedPayload)
                .respond(200, OPENBEELDEN_EMPTY_RESULT);

            opencultuurdataResource.getOpenBeelden();

            $httpBackend.flush();
        });

        it('transforms the response so that only the hits are returned (and not the total available etc.)', () => {
            const expectedPayload = {
                query: 'auto',
                size: EXPECTED_SIZE
            };
            const expectedHits = [
                {someField: 'someValue'},
                {someField: 'otherValue'}
            ];
            const openbeeldenResult = {
                hits: {
                    hits: expectedHits,
                    max_score: 2.581289,
                    total: 226
                },
                took: 7
            };

            $httpBackend
                .expectPOST(settings.BACKEND_BASE_URL + 'v0/openbeelden/search', expectedPayload)
                .respond(200, openbeeldenResult);

            let actualResult;

            opencultuurdataResource.getOpenBeelden()
                .then(response => {
                    actualResult = response.data;
                });

            $httpBackend.flush();

            expect(actualResult).toEqual(expectedHits);
        });
    });

});
