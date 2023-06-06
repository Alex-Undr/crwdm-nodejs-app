---------------------------



const crowdin = require('@crowdin/crowdin-api-client');

// initialization of crowdin client
const {
    projectsGroupsApi,
    uploadStorageApi,
    sourceFilesApi,
    translationsApi
} = new crowdin.default({
    token: '22754843d2acc3a6783a8b1c98b02c49589906fbb340b956f3c5dbca66fb2e734ac6a4d829fdcddf',
    //organization: 'ogo'
});

// get project list
projectsGroupsApi.listProjects()
    .then(projects => console.log(projects))
    .catch(error => console.error(error));

// You can also use async/wait. Add `async` keyword to your outer function/method
async function getProjects() {
    try {
        const projects = await projectsGroupsApi.listProjects();
        console.log(projects);
    } catch (error) {
        console.error(error);
    }
}