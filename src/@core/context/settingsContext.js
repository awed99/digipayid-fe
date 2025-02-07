'use client'

// ** React Imports
import { createContext, useState } from 'react'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

const initialSettings = {
  themeColor: themeConfig.themeColor,
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children }) => {
  const initialSettings = {
    themeColor: themeConfig.themeColor,
    mode: themeConfig.mode,
    contentWidth: themeConfig.contentWidth
  }

  console.log(initialSettings)

  // ** State
  const [settings, setSettings] = useState({ ...initialSettings })

  const saveSettings = updatedSettings => {
    setSettings(updatedSettings)
  }

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
