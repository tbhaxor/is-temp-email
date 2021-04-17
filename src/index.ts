import https from 'https'

/**
 * Single email check
 *
 * @param {string} email Email address to check
 * @return {Promise<boolean>} Promise-like boolean flag. `true` means the email is temporary and `false` means it's legit
 */
export function single(email: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    https
      .get(`https://block-temporary-email.com/check/email/${email}`, (res) => {
        res.setEncoding('utf8')
        let body: string | Record<string, any> = ''
        res.on('data', (chunk) => (body += chunk.toString()))
        res.on('end', () => {
          body = JSON.parse(body as string) as Record<string, any>
          if (body.error) return reject(new Error(body.error))
          else return resolve(body.temporary)
        })
        res.on('error', reject)
      })
      .on('error', reject)
  })
}

/**
 * Bulk emails check
 * @param {string[]} emails List of emails to check
 * @return {Promise<Record<string, boolean>>} Promise-like object. Where keys are the emails and values are the boolean flag for temporary email
 */
export function bulk(emails: string[]): Promise<Record<string, boolean>> {
  return new Promise<Record<string, boolean>>((resolve, reject) => {
    const promises: Promise<boolean>[] = []

    for (const email of emails) promises.push(single(email))

    Promise.all(promises)
      .then((temps) => {
        const data: Record<string, boolean> = {}

        for (let i = 0; i < emails.length; i++) data[emails[i]] = temps[i]
        resolve(data)
      })
      .catch(reject)
  })
}
