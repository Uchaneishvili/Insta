import { Router, Request, Response } from "express";
import { UserController } from "../controllers/userController";

export class UserRoutes {
  private userController: UserController = new UserController();
  public route(): Router {
    const router = Router();

    /**
     * @swagger
     *
     * /users:
     *   get:
     *     summary: get users
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: query
     *         name: search
     *         description: full text search, searches in ('userName')
     *         required: false
     *         type: string
     *     responses:
     *       200:
     *         description: get users
     */
    router.get("/", (req: Request, res: Response) => {
      return this.userController.getUsers(req, res);
    });

    /**
     * @swagger
     *
     * /users/login:
     *   get:
     *     summary: login
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: user
     *         required: true
     *         type: object
     *         schema:
     *           type: object
     *           properties:
     *             userName:
     *               type: string
     *             password:
     *               type: string
     *     responses:
     *       200:
     *         description: user can be logged in
     */
    router.get("/login", (req: Request, res: Response) => {
      return this.userController.login(req, res);
    });

    /**
     * @swagger
     * /users:
     *   post:
     *     description: create user
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: User
     *         description: add a new user
     *         schema:
     *           type: object
     *           properties:
     *             image:
     *               type: string
     *             type:
     *               type: number
     *               enum: [0, 1]
     *             userName:
     *               type: string
     *             name:
     *               type: string
     *             mediaCount:
     *               type: number
     *     responses:
     *       200:
     *         description: create user
     */
    router.post("/", (req: Request, res: Response) => {
      return this.userController.addUser(req, res);
    });

    /**
     *  @swagger
     *
     * paths:
     *   /users/{id}:
     *     put:
     *       description: Update a new user.
     *       tags: [Users]
     *       produces:
     *         - application/json
     *       parameters:
     *         - in: path
     *           name: id
     *           description: ID of the user
     *           required: true
     *         - in: body
     *           schema:
     *             type: object
     *             properties:
     *               image:
     *                 type: string
     *               type:
     *                 type: number
     *                 enum: [0,1]
     *               userName:
     *                 type: string
     *               name:
     *                 type: string
     *               mediaCount:
     *                 type: number
     *       responses:
     *         201:
     *           description: Created
     */
    router.put("/:id", (req: Request, res: Response) => {
      return this.userController.updateUsers(req, res);
    });

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     description: delete user
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         description: id of user
     *         required: false
     *         type: string
     *     responses:
     *       200:
     *         description: delete single user
     */
    router.delete("/:id", (req: Request, res: Response) => {
      return this.userController.deleteUser(req, res);
    });

    return router;
  }
}
