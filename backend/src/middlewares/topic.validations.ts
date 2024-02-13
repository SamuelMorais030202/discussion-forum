import { NextFunction, Request, Response } from "express";
import ITopics from "../interfaces/topics/topics";

export default class TopicValidations {
  static createTopic(req: Request, res: Response, next: NextFunction): Response | void {
    const { name, type } = req.body;
    if (!name || !type) {
      return res.status(400).json({ message: 'All fields must be filled' });
    };

    next();
  }

  static getTopicByType(req: Request, res: Response, next: NextFunction) {
    const { type } = req.body;
    if (!type) {
      return res.status(400).json({ message: 'Type is required' });
    };

    next();
  };
}