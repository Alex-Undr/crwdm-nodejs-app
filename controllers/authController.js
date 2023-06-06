const Crowdin = require('@crowdin/crowdin-api-client').default;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

/*const generateAccessToken = (project_id, personal_token) => {
    const payload {
        project_id,
        personal_token
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}*/

class authController {
    async login(req, res) {
        const { projectId, personalToken } = req.body;
        try {
            const client =  new Crowdin({
                token: personalToken,
            });

            await client.projectsGroupsApi.getProject(projectId);

            const hashPersonalToken = bcrypt.hashSync(personalToken, 7) ;
            const user = await User.create({project_id: projectId, access_token: hashPersonalToken});
            (await user).save({fields:[projectId, hashPersonalToken]})
                .then(() => {
                    console.log('user is inserted');
                });

                res.status(200).json({
                    projectId: projectId,
                    personalToken: personalToken
                });

        } catch (e) {
            console.log(e)
            res.status(e.code).json({message: 'Login error'});
        }
    }
}

module.exports = new authController();