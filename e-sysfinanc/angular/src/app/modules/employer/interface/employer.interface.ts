export interface Contact {
  id?: number;
  name: string;
  cpf: string;
  phone: string;
  mobile: string;
  email: string;
}

export interface SoftwareHouse {
  id?: number;
  social_name: string;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
}

export interface PublicAgency {
  id?: number;
  siafi: string;
  federally_responsible: {
    indicative: string,
    cnpj: string,
    federative: {
      name: string;
      uf: string;
      ibge: string;
      regime_social_security: string;
      subtetus: string;
    }
  };
  displayPublicAgency: boolean;
}


export interface Employer {
  id?: any;
  social_name: string;
  classification_tax: string;
  legal_nature: string;
  corporate: string;
  construction: string;
  sheet_discharge: string;
  employee_electronic_record: string;
  school_entity_code: string;
  international_organizations: string;
  complementary_info: string;
  temporary_job_number: string;
  temporary_job: string;
  contact: Contact;
  event: {
    id: number
  };
  software_house: SoftwareHouse;
  public_agency: PublicAgency;
  period_start: any;
  period_end?: any;
  new_validity?: {
    start: any,
    end: any
  };
}
