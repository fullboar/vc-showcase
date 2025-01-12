import type { CustomCharacter } from '../../../slices/types'

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { characterFade, fadeExit } from '../../../FramerAnimations'
import { localization } from '../../../assets/localization'
import { prependApiUrl } from '../../../utils/Url'

export interface Props {
  character?: CustomCharacter
}

export const CharacterContent: React.FC<Props> = ({ character }) => {
  return (
    <motion.div variants={fadeExit} initial="hidden" animate="show" exit="exit" className="h-full">
      {character ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={character.type}
            variants={characterFade}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col h-full justify-around"
          >
            <div className="p-2 bg-accent dark:bg-dark-accent text-dark-text rounded-l-lg flex px-4 self-end">
              <p>{character.type}</p>
            </div>
            <img className="h-72" src={prependApiUrl(character.image)} alt={character.name} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <p className="flex h-full items-center justify-center">
          {localization.pages.onboarding.components.characterContent.select}
        </p>
      )}
    </motion.div>
  )
}
