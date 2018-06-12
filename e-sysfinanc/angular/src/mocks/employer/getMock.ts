import {Employer} from '../../app/modules/employer/interface/employer.interface';

export const getMock: Employer = {
  'id': 1,
  'social_name': 'string',
  'classification_tax': 'string',
  'legal_nature': 'string',
  'corporate': 'string',
  'construction': 'string',
  'sheet_discharge': 'string',
  'employee_electronic_record': 'string',
  'school_entity_code': 'string',
  'international_organizations': 'string',
  'complementary_info': 'string',
  'temporary_job_number': 'string',
  'temporary_job': 'string',
  'contact': {
    'id': 1,
    'name': 'string',
    'cpf': 'string',
    'phone': 'string',
    'mobile': 'string',
    'email': 'string'
  },
  'event': {
    'id': 1
  },
  'software_house': {
    'id': 1,
    'social_name': 'string',
    'name': 'string',
    'cnpj': 'string',
    'phone': 'string',
    'email': 'string'
  },
  'public_agency': {
    'id': 1,
    'siafi': 'string',
    'federally_responsible': {
      'indicative': 'string',
      'cnpj': 'string',
      'federative': {
        'name': 'string',
        'uf': 'string',
        'ibge': 'string',
        'regime_social_security': 'string',
        'subtetus': 'string'
      }
    },
    'displayPublicAgency': true
  },
  'period_start': '2017-01-05',
  'period_end': '2017-02-05',
  'new_validity': {
    'start': '2017-01-05',
    'end': '2017-02-05'
  }
};
