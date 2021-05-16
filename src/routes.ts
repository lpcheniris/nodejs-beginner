import { Application, Router } from 'express';
import { UserController } from "./controllers/UserController";

const _routes: [string, Router][] = [
    ['/user', UserController]
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};