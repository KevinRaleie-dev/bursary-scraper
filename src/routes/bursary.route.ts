import express from "express";
import { find_month } from "../utils/findMonth";
import { get_bursary_data_by_month } from "../utils/getBursaryDataByMonth";
import { Data, get_data } from "../utils/getData";

const router = express.Router();

const cache = new Map<string, Data>();

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
        console.log("im in the cache");
        const data = cache.get(month);

        res.status(200).json({
          success: true,
          results: data?.bursaryList.length,
          time: cache_time_end,
          title: data?.title,
          bursaryList: data?.bursaryList,
        });
      } else {
        console.log("im not in the cache");
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
