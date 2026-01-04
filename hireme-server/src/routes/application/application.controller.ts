import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ZodResponse } from 'nestjs-zod';

import { MessageResDTO } from 'src/shared/dtos/response.dto';
import { PaginationQueryDTO } from 'src/shared/dtos/pagination.dto';

import { ApplicationService } from './application.service';
import { GetApplicationDetailResDTO, GetApplicationParamsDTO, GetApplicationsResDTO, UpsertApplicationBodyDTO, UpsertApplicationResDTO } from './application.dto';

@Controller('applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService){}

    @Get()
    @ZodResponse({type: GetApplicationsResDTO})
    list(@Query() query: PaginationQueryDTO){
        return this.applicationService.list({
            page: query.page,
            limit: query.limit,
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
