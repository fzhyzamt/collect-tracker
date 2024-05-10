import * as fs from "fs";
import axios from "axios";

const loadNormalList = async (url: string): Promise<string> => {
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
        let trackerList = trackerListArray.map(s => s.split('\n')
            .map(line => line.trim())
            .filter(Boolean))
            .flat(1);
        trackerList = trackerList.filter((item, index, self) => {
            return index === self.indexOf(item);
        });
        console.log('tracker size: ', trackerList.length);

        const htmlContent = `${trackerList.join('\r\n')}`;
        if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist');
        }
        fs.writeFileSync('./dist/index.txt', htmlContent);
        console.log('write file done')
    })


