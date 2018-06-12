import {async} from '@angular/core/testing';
import {CEP, CNPJ, CPF, RG, TELEFONE, UNMASK_NUMBER} from './mask';

describe('Mask constants core', () => {

  it('Remover máscara do cpf', async(() => {
    const cpf = '012.345.678-23';
    const cpf_unmask = cpf.replace(UNMASK_NUMBER, '');
    expect(cpf_unmask.length).toEqual(11);
  }));

  it('Remover máscara do cep', async(() => {
    const cep = '71750-000';
    const cepUnmask = cep.replace(UNMASK_NUMBER, '');
    expect(cepUnmask.length).toEqual(8);
  }));

  it('Verifica regex telefone oito digitos', function () {
    const regexOitoDigitos = TELEFONE('6133802222');
    expect(regexOitoDigitos.length).toEqual(14);
  });

  it('Verifica regex telefone nove digitos', function () {
    const regexNoveDigitos = TELEFONE('61338022221');
    expect(regexNoveDigitos.length).toEqual(15);
  });

  it('Verifica regex telefone vazio', function () {
    const regexVazio = TELEFONE();
    expect(regexVazio.length).toEqual(14);
  });

  it('Verifica regex RG', function () {
    const regexRG = RG;
    expect(regexRG.length).toEqual(10);
  });

  it('Verifica regex CPF', function () {
    const regexCPF = CPF;
    expect(regexCPF.length).toEqual(14);
  });

  it('Verifica regex CNPJ', function () {
    const regexCNPJ = CNPJ;
    expect(regexCNPJ.length).toEqual(18);
  });

  it('Verifica regex CEP', function () {
    const regexCEP = CEP;
    expect(regexCEP.length).toEqual(9);
  });

});
