import {getMock} from './getMock';
import {Paginator} from '../../app/shared/model/paginator.model';
import {Employer} from '../../app/modules/employer/interface/employer.interface';

export const getAllMock: Paginator<Employer> = {
  'data': [
    getMock
  ],
  page: 1,
  per_page: 3,
  total: 12,
  total_pages: 4
};
