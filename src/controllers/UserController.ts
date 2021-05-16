import { Router, Request, Response, NextFunction, request, response } from "express"
import { User } from "../models/User"

export const UserController: Router = Router()

UserController.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await new User(req.body).save();
        res.send({ data: user._id })
    } catch (err) {
        next(err)
    }
})

UserController.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await User.find({})
        res.send({ data: data })
    } catch (err) {
        next(err)
    }
})

UserController.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await User.deleteOne({ _id: id })
        res.send({ data: result })
    } catch (err) {
        next(err)
    }
})

UserController.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body, () => {
            res.send({ message: "success" })
        })
    } catch (err) {
        next(err)
    }
})
