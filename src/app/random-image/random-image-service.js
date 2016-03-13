import _ from 'lodash';

const NO_IMAGE = null;

const getRandomNumberBetween = (minInclusive, maxExclusive) => {
    return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
};

const getImageUrl = openBeeld => {
    for (let media_url of openBeeld._source.media_urls) {
        if (media_url.content_type === 'image/png') {
            return media_url.url;
        }
    }
    return NO_IMAGE;
};

const mapOpenBeeld = openBeeld => {
    return {
        title: openBeeld._source.title,
        description: openBeeld._source.description,
        url: getImageUrl(openBeeld)
    };
};

class RandomImage {
    constructor(settings, opencultuurdataResource, $q) {
        this.settings = settings;
        this.opencultuurdataResource = opencultuurdataResource;
        this.$q = $q;
    }

    getRandomOpenBeelden(openBeelden, requestedSize) {
        const randomSample = _.sampleSize(openBeelden, requestedSize);
        return _.map(randomSample, mapOpenBeeld);
    }

    // uses es6 promise : $scope.$apply() needed aferwards!
    getRandomImage(query) {
        let _this = this;
        return new Promise(
            function (resolve, reject) {
                _this.opencultuurdataResource.getOpenBeelden(query)
                    .then(response => {
                        const size = response.data.length;
                        const randomNr = getRandomNumberBetween(0, size);
                        resolve(mapOpenBeeld(response.data[randomNr]));
                    })
                    .catch(response => {
                        reject(response);
                    });
            }
        );
    }

    // uses angular promise
    getRandomImages(query, requestedSize) {
        let _this = this;
        return this.$q(
            function(resolve, reject) {
                _this.opencultuurdataResource.getOpenBeelden(query)
                    .then(response => {
                        resolve(_this.getRandomOpenBeelden(response.data, requestedSize));
                    })
                    .catch(response => {
                        reject(response);
                    });
            }
        );
    }
}

RandomImage.$inject = ['settings', 'opencultuurdataResource', '$q'];

export default RandomImage;
