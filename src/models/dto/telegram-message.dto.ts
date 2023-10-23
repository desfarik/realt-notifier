import { ApiProperty } from "@nestjs/swagger";

export class TelegramMessageDTO {
  @ApiProperty()
  realtObjectId: string;
}
