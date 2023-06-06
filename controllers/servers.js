const Crowdin = require('@crowdin/crowdin-api-client').default;

async function fetchProjectTree(projectID, personalToken) {

    const client =  new Crowdin({
        token: personalToken,
    });

    try {
        const directoriesResponse = await client.sourceFilesApi.withFetchAll().listProjectDirectories(projectID);
        const filesResponse = await client.sourceFilesApi.withFetchAll().listProjectFiles(projectID);

        const directories = directoriesResponse.data.map((item) => ({
            id: String(item.data.id),
            type: null,
            parent_id: item.data.directoryId !== null ? String(item.data.directoryId) : "0",
            node_type: "0",
            extension: '',
            priority: String(item.data.priority),
            export_pattern: String(item.data.exportPattern),
            name: item.data.name || '',
            title: item.data.title !== null ? String(item.data.title) : '',
        }));

        const files = filesResponse.data.map((item) => ({
            id: String(item.data.id),
            type: item.data.type || null,
            status: String(item.data.status),
            parent_id: item.data.directoryId !== null ? String(item.data.directoryId) : "0",
            node_type: '1',
            extension: '',
            priority: String(item.data.priority),
            export_pattern: null,
            name: item.data.name || '',
            title: null,
            strings: item.data.stats && item.data.stats.strings !== undefined ? item.data.stats.strings : 0,
            words: item.data.stats && item.data.stats.words !== undefined ? item.data.stats.words : 0,
            has_files: false,
        }));

        const fileTree = [...directories, ...files];

        const filesData = {
            data: fileTree,
            request: null,
            version: '9',
        };
        return filesData;
    } catch (e) {
        return e;
    }

}
const getAll = (req, res) => {
    const {projectId, personalToken} = req.body;

    fetchProjectTree(projectId, personalToken)
        .then(result => {
            let resCode;
            if(result.code) {
                resCode = result.code;
            } else {
                resCode = 200;
            }
            return res.status(resCode).json(result);
        })
        .catch(error => {
            res.status(error.code).json("Error. Response code:"+ error.code);
        })
}

module.exports = getAll;