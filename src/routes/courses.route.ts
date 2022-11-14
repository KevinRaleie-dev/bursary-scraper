import express from "express";
import { course_tags } from "../utils/courseTags";
import { get_course_links } from "../utils/getCourseLinks";
import axios, { AxiosResponse } from "axios"
import { CoursesResponse } from "../dtos/courses.dto";
import { courses_store } from "../store"
import { randomNumber } from "../utils/randomNumber";

const router = express.Router()

router.get("/all", async (_, res: express.Response) => {
    const PORT = process.env.PORT
    try {
        if (courses_store.has("courseData")) {
            // respond with data from the Map
            res.status(200).json({
                data: courses_store.get("courseData")
            })

        } else {
            const links = await get_course_links()
            const tags = course_tags(links)
            const requests: Array<Promise<AxiosResponse<any, any>>> = []
            const coursesData: Array<CoursesResponse> = []
    
            // iterate over all tags and make request to fetch number of bursaries for each course
    
            for (const tag of tags) {
                const request = axios.get(`http://localhost:${PORT}/course/${tag}`)
                requests.push(request)
            }
    
            // run this on separate processes but will refactor later
            await Promise.all(requests).then((data) => {
                data.map(courseDataResponse => {
                    // generate a random number between 30 and 300
                    const generatedNumber = randomNumber(30, 300)

                    const { course, numberOfBursaries } = courseDataResponse.data
                    
                    const courseData: CoursesResponse = {
                        id: course,
                        label: course,
                        value: numberOfBursaries,
                        color: `hsl(${generatedNumber}, 70%, 30%)`
                    }

    
                    coursesData.push(courseData)
                })
            })

            courses_store.set("courseData", coursesData)
    
            res.status(200).json({
                data: coursesData
            })
        }
    } catch (error) {
        res.status(503).json({
            message: "An error occured",
            error: error
        })
    }

})



export default router;