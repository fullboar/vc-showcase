import { AnimatePresence, motion } from 'framer-motion'

import { standardFade, dropIn } from '../../../FramerAnimations'
import { localizationBC } from '../../../assets/localizationBC'
import { SmallButton } from '../../../components/SmallButton'
import { SmallButtonText } from '../../../components/SmallButtonText'
export interface Props {
  action(): void
  cancel?(): void
}

export const DemoCompletedModal: React.FC<Props> = ({ action, cancel }) => {
  const TITLE = localizationBC.pages.dashboard.components.demoCompletedModal.title
  const DESCRIPTION = localizationBC.pages.dashboard.components.demoCompletedModal.description

  return (
    <AnimatePresence>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true" />
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-modal dark:bg-dark-modal text-modalText dark:text-dark-modalText inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div className=" px-4 pt-2 mt-4 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h2 className="text-xl font-medium">{TITLE}</h2>
                  <div className="mt-2 text-sm">
                    <p>{DESCRIPTION}</p>

                    <a
                      href={localizationBC.pages.dashboard.components.demoCompletedModal.URL.submitDigitalGovBC}
                      target="_blank"
                    >
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        className={`bg-primaryBtn dark:bg-dark-primaryBtn text-primaryBtnText dark:text-dark-primaryBtnText font-semibold my-5 py-2.5 px-10 rounded transition duration-300 ease-in-out transform text-sm shadow-sm`}
                        data-cy="standard-button"
                      >
                        {localizationBC.pages.dashboard.components.demoCompletedModal.giveFeedback}
                      </motion.button>
                    </a>

                    <br />
                    <a href={localizationBC.pages.dashboard.components.demoCompletedModal.URL.animo}>
                      {localizationBC.pages.dashboard.components.demoCompletedModal.basedOnCodeBy}
                      <u>{localizationBC.pages.dashboard.components.demoCompletedModal.animoName}</u>
                    </a>
                    <br />
                    <a href={localizationBC.pages.dashboard.components.demoCompletedModal.URL.storyset}>
                      {localizationBC.pages.dashboard.components.demoCompletedModal.businessIllustrations}
                      <u>{localizationBC.pages.dashboard.components.demoCompletedModal.storyset}</u>
                    </a>
                    <div>
                      {localizationBC.pages.dashboard.components.demoCompletedModal.iconsMade}
                      <u>
                        <a
                          href={localizationBC.pages.dashboard.components.demoCompletedModal.URL.freepik}
                          title={localizationBC.pages.dashboard.components.demoCompletedModal.freepik}
                        >
                          {localizationBC.pages.dashboard.components.demoCompletedModal.freepik}
                        </a>
                      </u>
                      {localizationBC.pages.dashboard.components.demoCompletedModal.from}
                      <a
                        href={localizationBC.pages.dashboard.components.demoCompletedModal.URL.flaticon}
                        title={localizationBC.pages.dashboard.components.demoCompletedModal.flaticon}
                      >
                        <u>{localizationBC.pages.dashboard.components.demoCompletedModal.flaticonCom}</u>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 sm:px-6 sm:flex sm:flex-row-reverse">
              <SmallButton onClick={action} text={'FINISH'} disabled={false} />
              {cancel && <SmallButtonText onClick={cancel} text={'CANCEL'} disabled={false} />}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
