import groupUserModel from "../models/groupuser.model.js";

export const createGroup = async (req, res) => {
  try {
    const { groupName, groupMembers, createdBy } = req.body;
    const newGroup = new groupUserModel({
      groupName,
      groupMembers,
      createdBy,
    });

    if (newGroup) {
      await newGroup.save();
    }

    // console.log(newGroup, "from groupusercontroler 17");
    return res.status(200).json(newGroup);
  } catch (error) {
    console.log("error from creategroup controller", error);
    return res.status(500).json("Interanl Server Error");
  }
};

export const getAllgroups = async (req, res) => {
  try {
    const user = req.user._id.toString();
    // console.log(user);
    const groups = await groupUserModel.find();
    const whoiscreated = groups.flatMap((group) =>
      group.createdBy
        .filter((gcb) => gcb.id === user)
        .map((gcb) => {
          return group;
        })
    );
    const groupsforwhichuser = groups.flatMap((group) =>
      group.groupMembers
        .filter((ggm) => ggm.userId === user)
        .map((ggm) => {
          return group;
        })
    );
    // console.log("whoiscreated", whoiscreated)
    // console.log("groupsforwhichuser", groupsforwhichuser)
    res
      .status(200)
      .json({
        groupsforwhichuser: groupsforwhichuser,
        whoiscreated: whoiscreated,
      });
  } catch (error) {
    console.log("error from getAllGroups controller", error);
    return res.status(500).json("Interanl Server Error");
  }
};

export const getGroups = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { id: anotherUserId } = req.params;
    console.log(anotherUserId);
    const group = await groupUserModel.find({
      groupMembers: {
        $all: [
          {$elemMatch: {userId: userId}},
          {$elemMatch: {userId: anotherUserId}}
        ]
      }
    });
    // console.log(group.length);
    res.status(200).json({ group: group });
  } catch (error) {
    console.log("error from getGroups controller", error);
    return res.status(500).json("Interanl Server Error");
  }
};
