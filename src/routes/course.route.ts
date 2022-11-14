import express from "express";
import { get_courses_data } from "../utils/getData";
import { find_link } from "../utils/findLink";
import { Course } from "../dtos/course.dto"

const router = express.Router();

router.get(
  "/:course",
  async (req: express.Request<Course>, res: express.Response) => {
    try {
      const link = await find_link(req.params.course);
      if (link) {
        const data = await get_courses_data(link);
        res.status(200).json({
          course: req.params.course,
          numberOfBursaries: data.bursary_list.length,
          data,
        });
      } else {
        res.status(404).json({
          message: "Could not find courses for the specified tag",
        });
      }
    } catch (error) {
      res.status(503).json({
        message: error.message,
      });
    }
  }
);

export default router;
