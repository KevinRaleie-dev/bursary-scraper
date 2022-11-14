import express from "express";
import { store as cache } from "../store";
import { find_month } from "../utils/findMonth";
import { get_bursary_data_by_month } from "../utils/getBursaryDataByMonth";
import { get_bursaries_data as get_data } from "../utils/getData";

const router = express.Router();

router.get(
  "/:bursaryMonth",
  async (req: express.Request, res: express.Response) => {
    const param = req.params.bursaryMonth;

    const month = find_month(param);

    if (!month) {
      res.status(404).json({
        success: false,
        message:
          "We could not find bursaries for the month you were looking for.",
      });
    }
    try {
      const cache_time_start = Date.now();
      const check_cache = cache.has(month);
      const cache_time_end = Date.now() - cache_time_start;

      if (check_cache) {
        const data = cache.get(month);

        res.status(200).json({
          success: true,
          results: data?.bursaryList.length,
          time: `${cache_time_end} seconds`,
          title: data?.title,
          bursaryList: data?.bursaryList,
        });
      } else {
        const url = get_bursary_data_by_month(month);
        const start_time = Date.now();
        const { title, bursaryList, links } = await get_data(url);
        const end_time = Date.now() - start_time;

        cache.set(month, { title, bursaryList, links });

        res.status(200).json({
          success: true,
          results: bursaryList.length,
          time: `${end_time} seconds`,
          title: title,
          bursaryList: bursaryList,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

export default router;
