import dayjs from 'dayjs'
import { device, expect } from 'detox'

import { byRole, byText } from './matchers'

function generateTestUser() {
  const ts = dayjs().format('YYMMDD_HHmmss')
  const email = `prober+${ts}@audius.co`
  const password = 'Pa$$w0rdTest'
  const name = `Prober ${ts}`
  const handle = `p_${ts}`
  return {
    email,
    password,
    name,
    handle
  }
}

async function assertOnSignUp() {
  await expect(byRole('heading', { name: /sign up for audius/i })).toBeVisible()
}

describe('Sign up', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  afterEach(async () => {
    await device.reloadReactNative()
  })

  it('should open the sign up screen', async () => {
    await assertOnSignUp()
  })

  it('can navigate to sign-up from sign-in', async () => {
    await assertOnSignUp()

    await byRole('link', { name: /sign in/i }).tap()
    await expect(byText(/new to audius?/i)).toBeVisible()
    await byRole('link', { name: /sign up/i }).tap()

    await assertOnSignUp()
  })

  it.only('should create an account', async () => {
    const testUser = generateTestUser()
    const { email } = testUser
    await byRole('textbox', { name: /email/i }).typeText(email)
    await byRole('button', { name: /sign up free/i }).tap()

    await expect(
      byRole('heading', { name: /create your password/i })
    ).toBeVisible()
  })
})
