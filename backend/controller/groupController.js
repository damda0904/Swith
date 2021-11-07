import { doesNotMatch } from 'assert';
import * as groupRepository from '../data/group.js';


//스터디 생성
export async function createGroup(req, res) {
    const { category, mainImage, title, description, startDate, endDate, keyword, faceToFace, personnel } = req.body;
    const userId = req.userId;
    const day = 24 * 60 * 60 * 1000;
    const totalDays = parseInt(((Date.parse(endDate) - Date.parse(startDate)) / day) + 1)
    const totalWeeks = Math.floor((totalDays + 6) / 7)

    const groupId = await groupRepository.createGroup({
        category,
        mainImage,
        title,
        description,
        startDate,
        endDate,
        keyword,
        faceToFace,
        personnel,
        leader: userId,
        recruit: true,
        achieve: [0],
        thisWeek: 0,
        totalWeeks: totalWeeks
    })
    console.log(groupId)
    res.status(201).json({ groupId, success: true });
}

//스터디 세부정보 보기
export async function getGroupInfo(req, res) {
    const id = req.params.id;
    const userId = req.userId;

    const group = await groupRepository.findById(id);
    let lead = false, follower = false;
    if (group.leader == userId) {
        lead = true;
    } else if (group.participants.find(userId)) {
        follower = true;
    }

    res.status(200).json(group)
    //res.status(200).json({ group, leading: lead, following: follower, success: true });
}

//참여중인 스터디 정보 보기
export async function getInfo(req, res) {
    const id = req.params.id;

    const group = await groupRepository.findById(id);

    res.status(200).json({ group, success: true });

}

//스터디 검색
export async function getGroups(req, res) {
    const category = req.query.category;
    const keyword = req.query.keyword;

    let group
    if (category && keyword) {
        group = await groupRepository.findGroupsByCK(category, keyword)
    }
    else if (category) {
        group = await groupRepository.findGroupsByCate(category)
    }
    else if (keyword) {
        group = await groupRepository.findGroupsByKey(keyword);
    }
    console.log(group)
    res.status(200).json({ group, success: true });
}

//스터디 지원
export async function apply(req, res) {
    const id = req.params.id;
    const userId = req.userId;

    console.log(userId);

    const groupId = await groupRepository.apply(id, userId);

    if (groupId == -1) {
        res.status(400).json({ message: "스터디 정원이 모두 찼습니다" })
    }
    else if (groupId == -2) {
        res.status(400).json({ message: "이미 지원한 스터디입니다" })
    }
    else {
        res.status(200).json({ groupId, success: true });
    }
}

//스터디 지원 취소
export async function cancel(req, res) {
    const id = req.params.id;
    const userId = req.params.userId;

    const groupId = await groupRepository.cancel(id, userId);

    if (!groupId) {
        res.status(400).json({ message: "신청하지 않은 스터디는 취소할 수 없습니다." })
    }
    else {
        res.status(200).json({ groupId, success: true });
    }
}

//스터디 정보 수정
export async function update(req, res) {
    const id = req.params.id;
    const { category, mainImage, title, description, startDate, endDate, keyword, faceToFace, personnel } = req.body;
    const userId = req.userId;
    const day = 24 * 60 * 60 * 1000;
    const totalDays = parseInt(((Date.parse(endDate) - Date.parse(startDate)) / day) + 1)
    const totalWeeks = (totalDays + 6) / 7

    const groupId = await groupRepository.update(id, {
        category,
        mainImage,
        title,
        description,
        keyword,
        faceToFace,
        personnel,
        leader: userId,
        recruit: true,
        achieve: [0],
        thisWeek: 0,
        totalWeeks: totalWeeks
    })

    res.status(200).json({ groupId, success: true });

}

//스터디 삭제
export async function remove(req, res) {
    const id = req.params.id;

    await groupRepository.remove(id);

    res.status(204).json({ success: true })
}