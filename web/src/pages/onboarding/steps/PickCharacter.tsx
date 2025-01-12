import type { CustomCharacter, TextWithImage } from '../../../slices/types'

import { motion } from 'framer-motion'
import { track } from 'insights-js'
import React from 'react'

import { fadeX } from '../../../FramerAnimations'
import { localization } from '../../../assets/localization'
import { useAppDispatch } from '../../../hooks/hooks'
import { setCharacter } from '../../../slices/characters/charactersSlice'
import { prependApiUrl } from '../../../utils/Url'
import { StepInformation } from '../components/StepInformation'

export interface Props {
  currentCharacter?: CustomCharacter
  characters: CustomCharacter[]
  title: string
  text: string
  textWithImage?: TextWithImage[]
}

export const PickCharacter: React.FC<Props> = ({ currentCharacter, characters, title, text, textWithImage }) => {
  const dispatch = useAppDispatch()
  const defaultTitle = localization.pages.onboarding.steps.pickCharacter.defaultTitle
  const defaultText = localization.pages.onboarding.steps.pickCharacter.defaultText
  const titleText = title
  const mainText = text

  const CharacterClickHandler = (char: CustomCharacter) => {
    dispatch(setCharacter(char))
    track({
      id: 'character-selected',
      parameters: {
        character: char.name,
      },
    })
  }

  const renderCharacters = characters.map((char: CustomCharacter) => {
    const cardStyleSelected = 'shadow-xl ring-4 ring-accent dark:ring-dark-accent'
    const cardStyleUnselected = 'ring-4 ring-background dark:ring-dark-background'

    return (
      <motion.button
        key={char.type}
        onClick={() => CharacterClickHandler(char)}
        whileHover={{ scale: 1.01 }}
        className="flex md:flex-row lg:flex-col"
        data-cy="select-char"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          className={`m-auto h-16 w-16 p-2 sm:h-20 sm:w-20 md:h-24 md:w-24 md:p-4 lg:h-36 lg:w-36 lg:p-8 rounded-full bg-background dark:bg-dark-background my-6 shadow ${
            currentCharacter?.type === char.type ? cardStyleSelected : cardStyleUnselected
          }`}
          src={prependApiUrl(char.image)}
          alt={char.name}
        />
        <div className="m-auto p-4 flex flex-1 flex-col text-left lg:text-center">
          <h2 className="font-bold">{char.name}</h2>
          <p>{char.type}</p>
        </div>
      </motion.button>
    )
  })

  return (
    <motion.div variants={fadeX} initial="hidden" animate="show" exit="exit">
      <StepInformation
        title={titleText === '' ? defaultTitle : titleText}
        text={mainText === '' ? defaultText : mainText}
        textWithImage={textWithImage}
      />

      <div className="flex flex-col lg:flex-row items-left lg:items-start justify-between px-8 h-full max-h-72 sm:max-h-96 overflow-y-scroll lg:overflow-y-hidden">
        {renderCharacters}
      </div>
    </motion.div>
  )
}
