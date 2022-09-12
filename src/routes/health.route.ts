import express from "express";

const router = express.Router();

router.get("/", (_, res: express.Response) => {
  res.status(200).json({
    message: "Everything is looking good. 🚀",
  });
});

export default router;
