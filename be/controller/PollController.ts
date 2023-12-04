import { Request, Response } from "express";
import { Polls } from "../models";
import { IReqAuth } from "../utils";
import { io } from "..";
const PollController = {
  createPoll: async (req: IReqAuth, res: Response) => {
    try {
      const { title, options, author } = req.body;
      const existPoll = await Polls.findOne({ title });
      if (existPoll) return res.send({ msg: "Poll already create" });
      const newPoll = new Polls({
        author,
        title,
        options,
      });
      await newPoll.save();
      res.status(200).json({
        code: 200,
        newPoll,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ msg: error });
    }
  },
  getAllPoll: async (_req: Request, res: Response) => {
    try {
      const polls = await Polls.find().sort("-createdAt");
      if (!polls) return res.status(404).send({ msg: "Empty" });
      return res.status(200).json({ polls });
    } catch (error) {
      res.send({ msg: error });
    }
  },
  getPollById: async (req: Request, res: Response) => {
    try {
      const poll = await Polls.findById(req.params.id);
      if (!poll) return res.status(404).send({ msg: "not found" });
      return res.status(200).json({ poll });
    } catch (error) {
      res.send({ msg: error });
    }
  },
  updateVote: async (req: Request, res: Response) => {
    try {
      const { userId, optionsId } = req.body;
      const voted = await Polls.findOneAndUpdate(
        {
          _id: req.params.id,
          "options._id": optionsId,
        },

        {
          $inc: { "options.$.count": 1 },
        
          $addToSet: { user_voted: userId },
        },
        { new: true }
      );
      io.to(`${req.params.id}`).emit("voted", voted);
      res.json({ code: 200, voted });
    } catch (error) {
      res.send({ msg: error });
    }
  },
};
export default PollController;
