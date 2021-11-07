import * as certifyRepository from '../data/certify.js';

//인증하기
export async function certify(req, res) {
    const groupId = req.params.id;
    const userId = req.userId;
    const { achieve, notAchieve, certifiedImg, week } = req.body;

    const achieveLevel = (achieve.length / (achieve.length + notAchieve.length)) * 100

    if (achieveLevel < 50) {
        return res.status(202).json({ message: "인증 조건을 완료하지 못하여 인증되지 않았습니다.", success: true })
    }

    const certifyId = await certifyRepository.certify(userId, groupId,
        {
            achieve,
            notAchieve,
            certifiedImg,
            week
        });


    res.status(201).json({ certifyId, success: true })
}