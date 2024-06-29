import { SnowballChain } from '@snowballtools/js-sdk'

import { useSnowball } from '@/app/use-snowball'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { parseEther } from 'viem'

import styles from './index.module.css'

type NewUserFormData = {
  email: string
}
type VerifyEmailFormData = {
  code: string
}
type SendEthFormData = {
  to: string
  amount: string
}

export default function Home() {
  const snowball = useSnowball()
  const passkeyAuth = snowball.auth.passkey
  const wallet = passkeyAuth.wallet

  const newUserForm = useForm<NewUserFormData>()
  const verifyForm = useForm<VerifyEmailFormData>()
  const sendEthForm = useForm<SendEthFormData>({ defaultValues: { amount: '0.001' } })

  const submitEmail = async (data: NewUserFormData) => {
    newUserForm.clearErrors()
    const res = await passkeyAuth.sendOtp({ email: data.email })
    if (!res.ok) newUserForm.setError('email', { message: res.reason })
  }

  const submitOtp = async (data: VerifyEmailFormData) => {
    verifyForm.clearErrors()
    const res = await passkeyAuth.verifyOtp({ code: data.code })
    if (!res.ok) verifyForm.setError('code', { message: res.reason })
  }

  const createPasskey = async () => {
    const res = await passkeyAuth.createPasskey({
      name: process.env.NEXT_PUBLIC_PASSKEY_NAME_PREFIX || 'demo',
    })
    if (!res.ok) alert(`Error: ${res.reason}`)
  }

  const sendEth = async ({ to, amount }: SendEthFormData) => {
    if (!passkeyAuth.wallet) return
    if (!to.startsWith('0x')) {
      sendEthForm.setError('to', { message: 'Address must start with 0x' })
      return
    }
    const res = await passkeyAuth.wallet.sendTransaction({
      to: to as `0x${string}`,
      value: parseEther(amount),
    })
  }

  const walletTable = (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th className={styles.th}>Address</th>
          <th className={styles.th}>Type</th>
        </tr>
        {wallet?.account && (
          <tr>
            <td className={styles.td}>{wallet.account.address}</td>
            <td className={styles.td}>{wallet.account.type}</td>
          </tr>
        )}
      </tbody>
    </table>
  )

  const login = async () => {
    const res = await passkeyAuth.login()
    if (!res.ok) alert(res?.reason)
  }

  return (
    <main className={styles.main}>
      <div className={styles.chains}>
        {[SnowballChain.ethereum, SnowballChain.sepolia].map((chain) => (
          <button
            key={chain.chainId}
            onClick={() => snowball.switchChain(chain)}
            className={`${styles.smallButton} ${chain.chainId === snowball.chain.chainId ? styles.active : ''}`}
          >
            {chain.name}
            {chain.chainId === snowball.chain.chainId ? ' (current)' : ''}
          </button>
        ))}
      </div>

      {passkeyAuth.state.name === 'initializing' && (
        <div className={styles.base}>
          <h2 className={styles.prompt}>Loading...</h2>
        </div>
      )}

      {passkeyAuth.state.name === 'no-session' && (
        <div className={styles.base}>
          <h2 className={styles.prompt}>Create your account:</h2>
          <form className={styles.form} onSubmit={newUserForm.handleSubmit(submitEmail)}>
            <label className={styles.label}>
              Email
              <input
                className={styles.input}
                {...newUserForm.register('email')}
                placeholder="Email"
              />
            </label>
            {newUserForm.formState.errors.email && (
              <p className={styles.error}>{newUserForm.formState.errors.email.message}</p>
            )}
            <input className={styles.button} type="submit" value="Create new user" />
          </form>
          <br />
          <br />
          <div>OR</div>
          <h2 className={styles.prompt}>Already have an account? Login!</h2>
          <div className={styles.form}>
            <button onClick={login} className={styles.button} type="submit">
              Log back in
            </button>
          </div>
        </div>
      )}

      {passkeyAuth.state.name === 'waiting-for-otp' && (
        <div className={styles.base}>
          <h2 className={styles.prompt}>Create your account:</h2>
          <p>
            One-Time Password sent to <b>{newUserForm.getValues('email')}</b>
          </p>
          <form className={styles.form} onSubmit={verifyForm.handleSubmit(submitOtp)}>
            <label className={styles.label}>
              Enter the code here:
              <input
                className={styles.input}
                {...verifyForm.register('code')}
                placeholder="000000"
                autoComplete="one-time-code"
              />
            </label>
            <input className={styles.button} type="submit" value="Verify" />
          </form>
        </div>
      )}

      {passkeyAuth.state.name === 'authenticated-no-passkey' && (
        <div className={styles.base}>
          <h2 className={styles.prompt}>Create your account:</h2>
          <div className={styles.form}>
            <label className={styles.label}>
              Email verified! Now create a passkey to create your wallet:
            </label>
            <button className={styles.button} onClick={createPasskey}>
              Create passkey
            </button>
          </div>
        </div>
      )}

      {wallet && (
        <>
          <div className={styles.base}>
            <h2 className={styles.prompt}>
              ☃️ 🎉 <br />
              Success!
              <br />
              Here's your generated wallet,
              <br />
              secured by your passkey:
            </h2>
            {walletTable}
          </div>

          <div className={styles.logoutButton} style={{ padding: '20px 0' }}>
            <button
              className={styles.button}
              onClick={() => {
                passkeyAuth.logout()
              }}
            >
              Sign Out
            </button>
          </div>

          <form className={styles.base} onSubmit={sendEthForm.handleSubmit(sendEth)}>
            <h2 className={styles.prompt}>Send ETH</h2>
            <div>
              <label className={styles.label}>To</label>
              <input
                className={styles.input}
                placeholder="0x1234"
                {...sendEthForm.register('to')}
              />
            </div>
            <div>
              <label className={styles.label}>Amount</label>
              <input
                className={styles.input}
                placeholder="0.1"
                {...sendEthForm.register('amount')}
              />
            </div>
            <input type="submit" className={styles.button} value="Send" />
          </form>
        </>
      )}
    </main>
  )
}
