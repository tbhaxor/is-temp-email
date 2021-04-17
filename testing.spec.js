const isTempEmail = require('./dist')
const { expect } = require('chai')

describe('Temporary email checker', function () {
  this.timeout(15000)

  it('should detect yopmail.com single email temporary', (done) => {
    isTempEmail
      .single('tbhaxor@yopmail.com')
      .then((r) => {
        expect(r).to.be.true
        done()
      })
      .catch(done)
  })

  it('should not detect zefara.com single email temporary', (done) => {
    isTempEmail
      .single('relor60727@zefara.com')
      .then((r) => {
        expect(r).to.be.false
        done()
      })
      .catch(done)
  })

  it('should do bulk detecting', (done) => {
    const emails = {
      'tbhaxor@yopmail.com': true,
      'tbhaxor@gmail.com': false,
      'relor60727@zefara.com': false,
    }
    isTempEmail
      .bulk(Object.keys(emails))
      .then((response) => {
        for (const email in emails) expect(emails[email]).to.be.equal(response[email])
        done()
      })
      .catch(done)
  })
})
