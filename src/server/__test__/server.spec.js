import 'babel-polyfill'
import request from "supertest";
import app from "../index";

describe("POST /test ", () => {
    test("It should responds with object contian data from the API", async () => {
        const response = await request(app).post("/test")
            .send({ url: "https://en.wikipedia.org/wiki/Samia_Suluhu" })


        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            "agreement": "DISAGREEMENT",
            "subjectivity": "SUBJECTIVE",
            "irony": "NONIRONIC",
        })
        expect(typeof response.body === "object").toBeTruthy()


    });
});

describe("GET /mock-api ", () => {
    test("It should respond with object contian this is message", async () => {
        const response = await request(app).get("/mock-api")
        expect(response.body).toEqual({
            title: 'test json response',
            message: 'this is a message',
            time: 'now'
        })
        expect(response.statusCode).toBe(200)

    });
});
