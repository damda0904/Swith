import * as certifyRepository from '../data/certify.js';
import * as userRepository from '../data/user.js';

//인증하기
export async function certify(req, res) {
    const groupId = req.params.id;
    const userId = req.userId;
    const { title, achieve, notAchieve, certifiedImg, week } = req.body;

    const user = await userRepository.findById(id);

    const certifyId = await certifyRepository.certify(groupId,
        {
            title,
            achieve,
            notAchieve,
            certifiedImg,
            userId,
            username: user.username,
            week
        });


    res.status(201).json({ certifyId, success: true })
}