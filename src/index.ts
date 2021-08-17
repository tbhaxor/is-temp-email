import axios from 'axios'

function debounceDotIo(email: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    axios.get(`https://disposable.debounce.io/?email=${email}`, { responseType: 'json' }).then((r) => {
      const body: { disposable?: string } = r.data

      if (typeof body.disposable == 'undefined') resolve(false)
      else resolve(body.disposable === 'true')
    })
  })
}

function kickBoxDotCom(email: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    axios.get(`https://open.kickbox.com/v1/disposable/${email}`, { responseType: 'json' }).then((r) => {
      const body: { disposable?: boolean } = r.data

      if (typeof body.disposable == 'undefined') resolve(false)
      else resolve(body.disposable)
    })
  })
}
/**
 * Single email check
 *
 * @param {string} email Email address to check
 * @return {Promise<boolean>} Promise-like boolean flag. `true` means the email is temporary and `false` means it's legit
 */
export function single(email: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    // eslint-disable-next-line
    ;(async () => {
      const results = await Promise.all([debounceDotIo(email), kickBoxDotCom(email)])
      const result = results.findIndex((v) => v == true) != -1

      resolve(result)
    })()
  })
}

/**
 * Bulk emails check
 * @param {string[]} emails List of emails to check
 * @return {Promise<Record<string, boolean>>} Promise-like object. Where keys are the emails and values are the boolean flag for temporary email
 */
export function bulk(emails: string[]): Promise<Record<string, boolean>> {
  return new Promise<Record<string, boolean>>((resolve) => {
    const promises: Promise<boolean>[] = []

    for (const email of emails) promises.push(single(email))

    Promise.all(promises).then((temps) => {
      const data: Record<string, boolean> = {}

      for (let i = 0; i < emails.length; i++) data[emails[i]] = temps[i]
      resolve(data)
    })
  })
}
