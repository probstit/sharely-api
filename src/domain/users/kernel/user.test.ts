import 'mocha';
import { expect } from 'chai';
import { User } from './user';

describe('User class', () => {

  it('should make email lowercase', () => {
    const user = User.create({
        email: "John@gmail.com",
        password: "abracadabra",
        firstname: "Maria",
        lastname: "Antici"
    });

    expect(user.email).to.equal('john@gmail.com');
  });

  it('should remove whitespace from beginning of email', () => {
    const user = User.create({
        email: " john@gmail.com",
        password: "abracadabra",
        firstname: "Maria",
        lastname: "Antici"
    });

    expect(user.email).to.equal('john@gmail.com');
  });

  it('should remove whitespace from end of email', () => {
    const user = User.create({
        email: "john@gmail.com ",
        password: "abracadabra",
        firstname: "Maria",
        lastname: "Antici"
    });

    expect(user.email).to.equal('john@gmail.com');
  });

  it('should check if password is not saved as plain text', () => {
    const user = User.create({
        email: "john@gmail.com",
        password: "abracadabra",
        firstname: "Maria",
        lastname: "Antici"
    });

    expect(user.password).not.equal('abracadabra');
  });

  it('should check if password matches the saved one', () => {
    const user = User.create({
        email: "john@gmail.com",
        password: "abracadabra",
        firstname: "Maria",
        lastname: "Antici"
    });

    expect(user.doesPasswordMatch('abracadabra')).to.equal(true);
  });

  it('should make first letter of firstname uppercase and the others lowercase', () => {
    const user = User.create({
        email: "john@gmail.com",
        password: "abracadabra",
        firstname: "mARIA",
        lastname: "Antici"
    });

    expect(user.firstname).to.equal('Maria');
  });

  it('should make first letter of lastname uppercase and the others lowercase', () => {
    const user = User.create({
        email: "john@gmail.com",
        password: "abracadabra",
        firstname: "mARIA",
        lastname: "aNtIcI"
    });

    expect(user.firstname).to.equal('Maria');
  });

});