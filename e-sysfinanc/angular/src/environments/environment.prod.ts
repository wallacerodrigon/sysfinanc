export enum AuthMethod {
  NONE,
  KEYCLOAK
}

export const environment = {
  production: true,
  api: '/sysfinanc-api/rest/',
  theme: 'ebonyClay',
  themeAutoContraste: 'ebonyClayAutoContraste',
  keycloak: {
    script: null,
    logoutUrl: null,
    redirect_uri: null,
    config: null
  }
};
