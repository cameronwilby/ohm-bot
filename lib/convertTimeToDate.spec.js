const chai = require('chai');
const convertTimeToDate = require('./convertTimeToDate');
const moment = require('moment-timezone');

const { expect } = chai;

describe('convertTimeToDate', () => {
  it('should convert 7PM when pm not specified', () => {
    const date = convertTimeToDate('7PM');
    expect(date.toString()).to.equal(moment().startOf('day').add(19, 'hours').toDate().toString());
  });
  it('should convert 7PM when pm specified true', () => {
    const date = convertTimeToDate('7PM', true);
    expect(date.toString()).to.equal(moment().startOf('day').add(19, 'hours').toDate().toString());
  });
  // xit('should convert 7PM when pm specified false', () => {
  //   const date = convertTimeToDate('7PM', false);
  //   expect(date.toString()).to.equal(moment().startOf('day').add(7, 'hours').toDate().toString());
  // });
  it('should convert 7 correctly when pm not specified', () => {
    const date = convertTimeToDate('7');
    expect(date.toString()).to.equal(moment().startOf('day').add(7, 'hours').toDate().toString());
  });
  it('should convert 7 correctly when pm specified true', () => {
    const date = convertTimeToDate('7', true);
    expect(date.toString()).to.equal(moment().startOf('day').add(19, 'hours').toDate().toString());
  });
  it('should convert 7 correctly when pm specified false', () => {
    const date = convertTimeToDate('7', false);
    expect(date.toString()).to.equal(moment().startOf('day').add(7, 'hours').toDate().toString());
  });
});
