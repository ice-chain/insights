import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import type { WebhookEvent } from "@clerk/clerk-sdk-node"

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/clerk-user-created')
  createUser(@Body() data: WebhookEvent)  {
    if (data.type === 'user.created') {
      const {
        id,
        email_addresses,
        primary_email_address_id,
      } = data.data;

      this.webhookService.createUser({
        id,
        email: email_addresses.find(({id}) => id === primary_email_address_id).email_address
      });
    }
  }
}
