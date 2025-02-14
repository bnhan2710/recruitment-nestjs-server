import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './schemas/job.schema';
import { JobSchema } from './schemas/job.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema}])],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
