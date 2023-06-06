const Crowdin = require('@crowdin/crowdin-api-client').default;

class uploadFilesController {
    async uploadFiles(req, res) {
        try{
            const { projectId, personalToken, selectedDir } = req.body;

            const client =  new Crowdin({
                token: personalToken,
            });

            try {
                const { name, data, mimetype } = req.files.userfile;

                const storage= await client.uploadStorageApi.addStorage(name, data, mimetype);
                const file = await client.sourceFilesApi.createFile(projectId, { name, storageId: storage.data.id, directoryId: Number(selectedDir) })

                res.status(200).json({
                    result: "file saved"
                });
            } catch (e) {
                res.status(e.code).json({ error: e });
            }

        }catch (e) {
            console.log(e);
        }

    }
}

module.exports = new uploadFilesController();