const Crowdin = require('@crowdin/crowdin-api-client').default;

class downloadFilesController {
    async downloadFiles(req, res) {
        try{
            const { projectId, personalToken, selectedFile } = req.body;

            const client =  new Crowdin({
                token: personalToken,
            });

            const projectInfo = await client.projectsGroupsApi.getProject(projectId);
            const targetLanguageIds = projectInfo.data.targetLanguageIds;

            try{
                const translatedFile = await client.translationsApi.buildProjectFileTranslation(projectId, selectedFile, {
                    targetLanguageId: targetLanguageIds[0]
                });
                res.status(200).json({
                    url: translatedFile.data.url
                });
            } catch (e) {
                res.status(e.code).json({ error: e });
            }

        }catch (e) {
            console.log(e);
        }
    }
}

module.exports = new downloadFilesController();