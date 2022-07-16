

export class ResponseNest {

    public statusCode: number | undefined;
    public url: string | undefined;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static WithStatusCode(statusCode: number) {

        const response = new ResponseNest();
        response.statusCode = statusCode;

        return response;
    }
}