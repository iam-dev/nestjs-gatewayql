import { UserEntity } from './user.entity';

describe('UserEntiry class', () => {
  it('should make a user with no fields', () => {
    const user = new UserEntity();
    expect(user).toBeTruthy();
    expect(user.firstname).toBe('');
    expect(user.lastname).toBe('');
    expect(user.redirectUri).toBe('');
  });
  it('should make a user with firstname only', () => {
    const user = new UserEntity('Test');
    expect(user).toBeTruthy();
    expect(user.firstname).toBe('Test');
    expect(user.lastname).toBe('');
    expect(user.redirectUri).toBe('');
  });
  it('should make a user with firstname and lastname', () => {
    const user = new UserEntity('Test', 'Unit');
    expect(user).toBeTruthy();
    expect(user.firstname).toBe('Test');
    expect(user.lastname).toBe('Unit');
    expect(user.redirectUri).toBe('');
  });
  it('should make a user with firstname, lastname and redirectUri', () => {
    const user = new UserEntity('Test', 'Unit', 'http://localhost');
    expect(user).toBeTruthy();
    expect(user.firstname).toBe('Test');
    expect(user.lastname).toBe('Unit');
    expect(user.redirectUri).toBe('http://localhost');
  });

});