import { AnimatePresence, motion } from 'framer-motion'

import { standardFade, dropIn } from '../../../FramerAnimations'
import { baseUrl } from '../../../api/BaseUrl'
import appStore from '../../../assets/light/app-store-badge.svg'
import playStore from '../../../assets/light/google-play-badge.png'
import { localizationBC } from '../../../assets/localizationBC'
import { SmallButton } from '../../../components/SmallButton'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const QRCode = require('qrcode.react')
const localization = localizationBC.pages.onboarding.components.walletModal
export interface Wallet {
  id: number
  name: string
  icon: string
  url: string
  apple: string
  android: string
  ledgerImage?: string
}

export interface Props {
  isWalletModalOpen: boolean
  setIsWalletModalOpen: (open: boolean) => void
  wallet: Wallet
  onCompleted(): void
}

export const WalletModal: React.FC<Props> = ({ isWalletModalOpen, setIsWalletModalOpen, onCompleted }) => {
  function isMobile() {
    return window.innerWidth <= 760
  }
  return (
    <AnimatePresence>
      {isWalletModalOpen && (
        <motion.div
          variants={standardFade}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              onClick={() => setIsWalletModalOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-0"
              aria-hidden="true"
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />

            <motion.div
              variants={dropIn}
              initial="hidden"
              animate="show"
              exit="exit"
              className="bg-modal dark:bg-dark-modal text-modalText dark:text-dark-modalText z-40 inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
            >
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div className="px-2 md:px-6 pt-2 sm:mt-4 sm:pb-4">
                  <div className="mt-5">
                    <p className="font-semibold">
                      {localizationBC.pages.onboarding.components.walletModal.downloadBCWallet}
                    </p>
                    <p className="mt-5 mb-5">
                      {localizationBC.pages.onboarding.components.walletModal.toDownload}
                      {isMobile()
                        ? localizationBC.pages.onboarding.components.walletModal.selectAppStore
                        : localizationBC.pages.onboarding.components.walletModal.scanThisQR}
                      {localizationBC.pages.onboarding.components.walletModal.searchBCWallet}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: isMobile() ? 'column' : 'row',
                        marginBottom: '10px',
                      }}
                    >
                      <a href={localization.URL.appStore} target="_blank">
                        <img
                          src={appStore}
                          style={
                            isMobile()
                              ? { width: '200px', marginBottom: '10px' }
                              : { height: '50px', marginRight: '10px' }
                          }
                          alt="app store"
                        />
                      </a>
                      <a href={localization.URL.playStore} target="_blank">
                        <img
                          src={playStore}
                          style={isMobile() ? { width: '200px' } : { height: '50px' }}
                          alt="google play store"
                        />
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{localization.step2}</p>
                    <p className="mt-5">{localization.completeOnboarding}</p>
                  </div>
                </div>
                {!isMobile() && (
                  <div className="mt-10 mr-10">
                    <QRCode value={`${baseUrl}/qr`} size={125} />
                  </div>
                )}
              </div>
              <div className="px-4 pb-4 flex justify-end">
                <SmallButton onClick={onCompleted} text={localization.haveMyWallet} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
