
export interface IUseCase<TInput, TResult> {
    execute(input: TInput): Promise<TResult>;
}