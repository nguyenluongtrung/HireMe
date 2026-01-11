import { Injectable } from '@nestjs/common';

import { GetApplicationsQueryType, UpsertApplicationBodyType } from './application.model';
import { ApplicationRepo } from './application.repo';
import { ApplicationAlreadyExistsException } from './application.error';

import { NotFoundRecordException } from 'src/shared/error';
import { isNotFoundPrismaError, isUniqueConstraintPrismaError } from 'src/shared/helpers';

@Injectable()
export class ApplicationService {
    constructor(
        private applicationRepo: ApplicationRepo
    ){}

    async list(pagination: GetApplicationsQueryType){
        const data = await this.applicationRepo.list(pagination)
        return data
    }

    async statisticByStatus(userId: number){
        const data = await this.applicationRepo.statisticByStatus(userId)
        return data
    }

    async findById(id: number){
        const application = await this.applicationRepo.findById(id)
        if(!application){
            throw NotFoundRecordException
        }
        return application
    }

    async create({data}: {data: UpsertApplicationBodyType}){
        try{
            const application = await this.applicationRepo.create({
                data
            })

            return application
        } catch(error){
            if(isUniqueConstraintPrismaError(error)){
                throw ApplicationAlreadyExistsException
            }
            throw error
        }
    }

    async update({id, data}: {id: number, data: UpsertApplicationBodyType}){
        try{
            const application = await this.applicationRepo.update({
                id, 
                data,
            })
            return application
        } catch(error){
            if (isNotFoundPrismaError(error)) {
                throw NotFoundRecordException
            }
            if (isUniqueConstraintPrismaError(error)) {
                throw ApplicationAlreadyExistsException
            }
            throw error
        }
    }

    async delete({id}: {id: number}){
        try{
            await this.applicationRepo.delete({
                id,
            })
            return {
                message: 'Delete successfully'
            }
        } catch(error){
            if (isNotFoundPrismaError(error)) {
                throw NotFoundRecordException
            }
            throw error
        }
    }
}
