import {DisabledService} from './disabled.service';

describe('disabled.service', () => {
  const service = new DisabledService();

  it('init() deve lançar uma exceção', function () {
    expect(service.init).toThrow(new Error('Método de autenticação não suportado'));
  });

  it('login() deve lançar uma exceção', function () {
    expect(service.login).toThrow(new Error('Método de autenticação não suportado'));
  });

  it('logout() deve lançar uma exceção', function () {
    expect(service.logout).toThrow(new Error('Método de autenticação não suportado'));
  });

  it('isAuthenticate() deve lançar uma exceção', function () {
    expect(service.isAuthenticate).toThrow(new Error('Método de autenticação não suportado'));
  });

  it('getToken() deve lançar uma exceção', function () {
    expect(service.getToken).toThrow(new Error('Método de autenticação não suportado'));
  });


  it('getRoles() deve lançar uma exceção', function () {
    expect(service.getRoles).toThrow(new Error('Método de autenticação não suportado'));
  });

  it('getUsername() deve lançar uma exceção', function () {
    expect(service.getUsername).toThrow(new Error('Método de autenticação não suportado'));
  });

});
