import React from 'react'
import { Icon } from '@iconify/react'
import { useCssHandles } from 'vtex.css-handles'
import styles from './Services.css'

const CSS_HANDLES = [
  'services',
  'superIcons',
  'icon',
  'options',
  'servicesLabel',
  'subServicesLabel'
]

const Services = () => {
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <>
      <a href="/faq" className={styles.faq}>
        <button className={styles.services}>
          <div className={styles.superIcons}>
            <Icon className={styles.icon} icon="fluent:chat-12-regular" hFlip />
          </div>
          <div className={styles.options}>
            <span className={styles.servicesLabel}>Serviços e</span>
            <p className={styles.subServicesLabel}>Atendimento</p>
          </div>
        </button>
      </a>
    </>
  )
}

export default Services