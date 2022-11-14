import express from "express";
import { course_tags } from "../utils/courseTags";
import { get_course_links } from "../utils/getCourseLinks";
import axios, { AxiosResponse } from "axios"
import { Courses } from "../dtos/courses.dto";

const router = express.Router()


router.get("/all", async (_, res: express.Response) => {
    const PORT = process.env.PORT
    try {
        const links = await get_course_links()
        const tags = course_tags(links)
        const requests: Array<Promise<AxiosResponse<any, any>>> = []
        const coursesData: Array<Courses> = []

        // iterate over all tags and make request to fetch number of bursaries for each course

        for (const tag of tags) {
            const request = axios.get(`http://localhost:${PORT}/course/${tag}`)
            requests.push(request)
        }

        // run this on separate processes but will refactor later
        await Promise.all(requests).then((data) => {
            data.map(courseDataResponse => {
                const course: Courses = {
                    course: courseDataResponse.data.course,
                    numberOfBursaries: courseDataResponse.data.numberOfBursaries
                }

                coursesData.push(course)
            })
        })

        res.status(200).json({
            data: coursesData
        })
    } catch (error) {
        res.status(503).json({
            message: "An error occured",
            error: error
        })
    }

})



export default router;