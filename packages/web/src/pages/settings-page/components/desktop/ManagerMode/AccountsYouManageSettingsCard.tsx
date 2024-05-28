import { useCallback, useEffect, useState } from 'react'

import { Button, IconUserArrowRotate } from '@audius/harmony'

import { useHistoryContext } from 'app/HistoryProvider'
import { ACCOUNTS_YOU_MANAGE_SETTINGS_PAGE, doesMatchRoute } from 'utils/route'

import SettingsCard from '../SettingsCard'

import { AccountsYouManageSettingsModal } from './AccountsYouManageSettingsModal'

const messages = {
  accountsYouManageTitle: 'Accounts You Manage',
  accountsYouManageDescription:
    'Review the accounts you’re authorized to manage.',
  reviewAccountsButtonText: 'Review Accounts'
}

export const AccountsYouManageSettingsCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { history } = useHistoryContext()

  useEffect(() => {
    const match = doesMatchRoute(
      history.location,
      ACCOUNTS_YOU_MANAGE_SETTINGS_PAGE
    )
    if (match) {
      setIsModalOpen(true)
    }
  }, [history.location])

  const handleOpen = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <SettingsCard
        icon={<IconUserArrowRotate />}
        title={messages.accountsYouManageTitle}
        description={messages.accountsYouManageDescription}
      >
        <Button variant='secondary' onClick={handleOpen} fullWidth>
          {messages.reviewAccountsButtonText}
        </Button>
      </SettingsCard>
      <AccountsYouManageSettingsModal
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </>
  )
}
