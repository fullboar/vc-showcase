import type { CredentialData } from '../../../slices/types'

import { motion } from 'framer-motion'
import { startCase } from 'lodash'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'
import { StateIndicator } from '../../../components/StateIndicator'
import { isCredIssued } from '../../../utils/Helpers'
import { prependApiUrl } from '../../../utils/Url'

export interface Props {
  title: string
  data: CredentialData
  credential: any
}

export const Credential: React.FC<Props> = ({ title, credential, data }) => {
  const credentialIssued = isCredIssued(credential.state)
  return (
    <motion.div
      variants={fadeX}
      animate="show"
      exit="exit"
      className="flex flex-col bg-background dark:bg-dark-background m-4 px-4 py-2 w-72 md:w-96 h-28 rounded-lg shadow"
    >
      <div className="flex-1-1 title">
        <h1 className="font-semibold">{title}</h1>
        <hr className="text-separator dark:text-dark-separator" />
      </div>
      <div className="flex-1 flex flex-row items-center justify-between">
        <div className="bg-icon dark:bg-dark-icon rounded-lg p-2 w-12">
          <img className="h-8 m-auto" src={prependApiUrl(data.icon)} alt="icon" />
        </div>
        <div className="flex-1 px-4 justify-self-start">
          <p>{startCase(data.name)}</p>
        </div>
        <StateIndicator completed={credentialIssued} />
      </div>
    </motion.div>
  )
}
