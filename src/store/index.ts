import { CoursesResponse } from "../dtos/courses.dto"
import { Data } from "../utils/getData"


export const store = new Map<string, Data | any>() 
export const courses_store = new Map<string, Array<CoursesResponse>>()
