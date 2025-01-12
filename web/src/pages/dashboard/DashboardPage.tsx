import { AnimatePresence, motion } from 'framer-motion'
import { track } from 'insights-js'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { localization } from '../../assets/localization'
import { Footer } from '../../components/Footer'
import { Modal } from '../../components/Modal'
import { NavBar } from '../../components/Navbar'
import { useAppDispatch } from '../../hooks/hooks'
import { useTitle } from '../../hooks/useTitle'
import { useCurrentCharacter } from '../../slices/characters/charactersSelectors'
import { useCredentials } from '../../slices/credentials/credentialsSelectors'
import { usePreferences } from '../../slices/preferences/preferencesSelectors'
import { setDemoCompleted } from '../../slices/preferences/preferencesSlice'
import { basePath } from '../../utils/BasePath'

import { DemoCompletedModal } from './components/DemoCompletedModal'
import { ProfileCard } from './components/ProfileCard'
import { RevocationContainer } from './components/RevocationContainer'
import { UseCaseContainer } from './components/UseCaseContainer'

export const DashboardPage: React.FC = () => {
  useTitle(localization.pages.dashboard.title)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { issuedCredentials, revokableCredentials } = useCredentials()
  const { completedUseCaseSlugs, demoCompleted, completeCanceled, revocationEnabled } = usePreferences()
  const currentCharacter = useCurrentCharacter()
  const useCases = currentCharacter?.useCases

  useEffect(() => {
    if (completedUseCaseSlugs.length !== 0 && completedUseCaseSlugs.length === useCases?.length && !completeCanceled) {
      dispatch(setDemoCompleted(true))
    }
  }, [completedUseCaseSlugs, useCases])

  const ERROR_TITLE = localization.pages.dashboard.errorTitle
  const ERROR_DESCRIPTION = localization.pages.dashboard.errorDescription
  const routeError = () => {
    navigate(`${basePath}/demo`)
    dispatch({ type: 'demo/RESET' })
  }

  const completeDemo = () => {
    navigate(`${basePath}/`)
    dispatch({ type: 'demo/RESET' })

    if (currentCharacter) {
      track({
        id: 'demo-character-completed',
        parameters: {
          character: currentCharacter.name,
        },
      })
    }
  }

  const cancelCompleteDemo = () => {
    dispatch(setDemoCompleted(false))
  }

  return (
    <motion.div
      className="container flex flex-col h-screen justify-between"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="mx-8 my-4">
        <NavBar />
      </div>
      {currentCharacter ? (
        <>
          <div className="flex flex-col lg:flex-row mb-auto">
            <div className="w-full lg:w-2/3 order-last lg:order-first">
              <UseCaseContainer
                issuedCredentials={issuedCredentials}
                completedUseCaseSlugs={completedUseCaseSlugs}
                currentCharacter={currentCharacter}
              />
              {revokableCredentials.length > 0 && revocationEnabled && currentCharacter.revocationInfo && (
                <RevocationContainer
                  revocationInfo={currentCharacter.revocationInfo}
                  revocationRecord={revokableCredentials}
                />
              )}
            </div>
            <div className="flex flex-1 flex-col p-2 mx-2">
              <ProfileCard currentCharacter={currentCharacter} />
            </div>
          </div>
        </>
      ) : (
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          <Modal title={ERROR_TITLE} description={ERROR_DESCRIPTION} onOk={routeError} />
        </AnimatePresence>
      )}
      {demoCompleted && <DemoCompletedModal action={completeDemo} cancel={cancelCompleteDemo} />}
      <Footer />
    </motion.div>
  )
}
