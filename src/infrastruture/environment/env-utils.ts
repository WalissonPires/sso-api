

export abstract class EnvUtils {

    public static isDev(): boolean {
        return process.env.NODE_ENV === 'development';
    }
}