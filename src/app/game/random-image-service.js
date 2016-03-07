const NO_IMAGE = null;

class RandomImage {
    constructor(settings, opencultuurdataResource) {
        this.settings = settings;
        this.opencultuurdataResource = opencultuurdataResource;
    }

    getImageUrl(openBeeld) {
        for (let media_url of openBeeld._source.media_urls) {
            if (media_url.content_type === 'image/png') {
                return media_url.url;
            }
        }
        return NO_IMAGE;
    }

    mapOpenBeeld(openBeeld) {
        return {
            title: openBeeld._source.title,
            description: openBeeld._source.description,
            url: this.getImageUrl(openBeeld)
        };
    }

    getRandomNumberBetween(minInclusive, maxExclusive) {
        return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
    }

    getRandomImage(query) {
        let _this = this;
        return new Promise(
            function (resolve, reject) {
                _this.opencultuurdataResource.getOpenBeelden(query)
                    .then(response => {
                        const size = response.data.hits.hits.length;
                        const randomNr = _this.getRandomNumberBetween(0, size);
                        resolve(_this.mapOpenBeeld(response.data.hits.hits[randomNr]));
                    })
                    .catch(response => {
                        reject(response);
                    });
            });
    }
}

RandomImage.$inject = ['settings', 'opencultuurdataResource'];

export default RandomImage;
