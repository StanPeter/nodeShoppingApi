import { NextFunction, Request, Response } from "express";

exports.get404 = (_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).render("404", {
        pageTitle: "Page Not Found",
        path: "/404",
    });
};
