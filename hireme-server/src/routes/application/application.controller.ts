import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ZodResponse } from 'nestjs-zod';

import { MessageResDTO } from 'src/shared/dtos/response.dto';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';

import { ApplicationService } from './application.service';
import { GetApplicationDetailResDTO, GetApplicationParamsDTO, GetApplicationsQueryDTO, GetApplicationsResDTO, UpsertApplicationBodyDTO, UpsertApplicationResDTO } from './application.dto';

@Controller('applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService){}

    @Get()
    @ZodResponse({type: GetApplicationsResDTO})
    list(@Query() query: GetApplicationsQueryDTO, @ActiveUser('userId') userId: number){
        return this.applicationService.list({
            page: query.page,
            limit: query.limit,
            status: query.status,
            companyName: query.companyName,
            position: query.position,
            dateApplied: query.dateApplied,
            userId,
        })
    }

    @Get(':applicationId')
    @ZodResponse({type: GetApplicationDetailResDTO})
    findById(@Param() params: GetApplicationParamsDTO){
        return this.applicationService.findById(params.applicationId)
    }

    @Post()
    @ZodResponse({type: UpsertApplicationResDTO})
    create(@Body() body: UpsertApplicationBodyDTO){
        return this.applicationService.create({
            data: body,
        })
    }

    @Put(':applicationId')
    @ZodResponse({type: UpsertApplicationResDTO})
    update(@Body() body: UpsertApplicationBodyDTO, @Param() params: GetApplicationParamsDTO){
        return this.applicationService.update({
            data: body,
            id: params.applicationId,
        })
    }

    @Delete(':applicationId')
    @ZodResponse({type: MessageResDTO})
    delete(@Param() params: GetApplicationParamsDTO){
        return this.applicationService.delete({
            id: params.applicationId,
        })
    }
}
