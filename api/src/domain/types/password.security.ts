export interface userSecurity {
  password: string
  hashedPassword: string
}

export enum EncryptionType {
  ENCRYPT = 'ENCRYPT',
  DECRYPT = 'DECRYPT'
}
