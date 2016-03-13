const settings = {
    BACKEND_BASE_URL: 'http://api.opencultuurdata.nl/',
    REST_TIMEOUT_IN_MILLIS: 5000,
    TIMEOUT_WRONGLY_MATCHED_CARDS_SHOWN_IN_MILLIS: 1500,
    DEFAULT_NR_OF_MEMORYCARD_DUPLICATES: 2,
    NR_OF_MEMORYCARD_DUPLICATES_POSSIBILITIES: [
        2,
        3,
        4
    ],
    DEFAULT_NR_OF_MEMORY_PAIRS: 4,
    NR_OF_MEMORY_PAIRS_POSSIBILITIES: [
        3,
        4,
        6,
        8
    ],
    MEMORY_QUERY_POSSIBILITIES: [
        'auto',
        'fiets',
        'oorlog'
    ]
};

export default settings;
