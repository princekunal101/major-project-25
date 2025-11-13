import { IsString, IsUUID } from "class-validator";

export class MemberRequestDto{
    @IsUUID()
    targetCommunityId: string
}