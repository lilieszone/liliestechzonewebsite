import { RichTextField } from 'payload'
import FaqComponent from './Component.client'

export interface FaqBlockProps {
  title: string
  question: questionsInt[]
  disableInnerContainer?: boolean
}
export interface questionsInt {
  Question: string
  answer: RichTextField
  links?: Array<{
    link: {
      type?: 'reference' | 'custom' | null
      newTab?: boolean | null
      url?: string | null
      label: string
      appearance?: 'default' | 'outline' | null
    }
    id?: string | null
  }> | null
}

export const FaqBlockComponent: React.FC<FaqBlockProps> = ({ title, question }) => {
  return <FaqComponent question={question} title={title} />
}
