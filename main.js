const axios = require('axios');
const fs = require('fs');

const loadNormalList = async (url) => {
    const resp = await axios.get(url);
    return resp.data;
}

const TRACKER_LIST_URL_ARRAY = [
    'https://cf.trackerslist.com/all.txt',
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/AT_all.txt'
]
Promise.all(TRACKER_LIST_URL_ARRAY.map(loadNormalList))
    .then(trackerListArray => {
        const htmlContent = `${trackerListArray.join('\n')}`;
        fs.writeFileSync('index.txt', htmlContent);
    })


