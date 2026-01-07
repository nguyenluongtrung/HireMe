import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ZodResponse } from 'nestjs-zod';

import { MessageResDTO } from 'src/shared/dtos/response.dto';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';

import { ApplicationService } from './application.service';
import { GetApplicationDetailResDTO, GetApplicationParamsDTO, GetApplicationsQueryDTO, GetApplicationsResDTO, GetApplicationStatisticsResDTO, UpsertApplicationBodyDTO, UpsertApplicationResDTO } from './application.dto';

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

    @Get('statistics')
    @ZodResponse({type: GetApplicationStatisticsResDTO})
    statisticsByStatus(@ActiveUser('userId') userId: number){
        return this.applicationService.statisticByStatus(userId)
    }

    @Get(':applicationId')
    @ZodResponse({type: GetApplicationDetailResDTO})
    findById(@Param() params: GetApplicationParamsDTO){
        return this.applicationService.findById(params.applicationId)
    }

    @Post()
    @ZodResponse({type: UpsertApplicationResDTO})
    create(@Body() body: UpsertApplicationBodyDTO, @ActiveUser('userId') userId: number){
        return this.applicationService.create({
            data: {
                ...body,
                userId,
            }
        })
    }

    @Patch(':applicationId')
    @ZodResponse({type: UpsertApplicationResDTO})
    update(@Body() body: UpsertApplicationBodyDTO, @Param() params: GetApplicationParamsDTO){
        return this.applicationService.update({
            data: body,
            id: Number(params.applicationId),
        })
    }

    @Delete(':applicationId')
    @ZodResponse({type: MessageResDTO})
    delete(@Param() params: GetApplicationParamsDTO){
        return this.applicationService.delete({
            id: Number(params.applicationId),
        })
    }
}
