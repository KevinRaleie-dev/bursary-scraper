import express from "express";
import { find_month } from "../utils/findMonth";
import { get_bursary_data_by_month } from "../utils/getBursaryDataByMonth";
import { get_data } from "../utils/getData";

const router = express.Router();

router.get(
  "/:bursaryMonthSearch",
  async (req: express.Request, res: express.Response) => {
    const search = req.params.bursaryMonthSearch;

    const month = find_month(search);

    if (!month) {
     res.status(400).json({
        success: false,
        message:
          "We could not find bursaries for the month you were looking for.",
      });
    }
      // fetch bursaries for the year 2022
	  try {

		const url = get_bursary_data_by_month(month);
		const start_time = Date.now();
		const { title, bursaryList } = await get_data(url);
		const end_time = Date.now() - start_time;

		if (title) {
			res.status(200).json({
				success: true,
				results: bursaryList.length,
				time: `${end_time} seconds`,
				title,
				bursaryList
			})
		}
		else {
			res.status(404).json({
				success: false,
				message: "Could not find what you were looking for"
			})
		}
	  }
	  catch(error) {
		res.status(500).json({
			success: false,
			message: error.message
		})
	  }
	  
  }
);

export default router;

