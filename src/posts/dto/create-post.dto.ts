export class CreatePostDto {
    readonly title: string;
    readonly content: string;

    // id лучше доставать из токена
    readonly userId: number;

}
