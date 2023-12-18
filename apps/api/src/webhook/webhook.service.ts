import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class WebhookService {
    constructor(private userService: UserService) {}

    createUser(data: CreateUserDto) {
        return this.userService.create({
            id: data.id,
            email: data.email,
        })
    }
}
