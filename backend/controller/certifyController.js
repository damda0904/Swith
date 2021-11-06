import * as certifyRepository from '../data/certify.js';

//인증하기
export async function certify(req, res) {
    const groupId = req.params.id;
    const userId = req.userId;
    const { achieve, notAchieve, certifiedImg, week } = req.body;

    const certifyId = await certifyRepository.certify(userId, groupId,
        {
            achieve,
            notAchieve,
            certifiedImg,
            week
        });


    res.status(201).json({ certifyId, success: true })
}