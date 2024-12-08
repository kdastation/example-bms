import { Controller, useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

import { type TextShape } from '@entities/Shape'

import { Flex } from '@shared/ui/Flex'
import { NumberInput } from '@shared/ui/Inputs/NumberInput'

type Values = {
  text: string
  color: string
  fontSize: number
}

type Props = {
  text: TextShape

  onSave?: (values: Values) => void
}

export const InfoText = ({ text, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    control,
  } = useForm<Values>({})

  return (
    <Flex asChild direction={'column'} gap={12} align={'start'}>
      <form
        onSubmit={handleSubmit((values) => {
          onSave?.(values)
        })}
      >
        <TextareaAutosize {...register('text')} defaultValue={text.text} />

        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <NumberInput
                minValue={8}
                maxValue={30}
                type='number'
                value={value ?? text.fontSize}
                onChange={onChange}
              />
            )
          }}
          name={'fontSize'}
        />

        <input type='color' {...register('color')} defaultValue={text.color} />

        {isDirty && <button type={'submit'}>Сохранить изменения</button>}
      </form>
    </Flex>
  )
}
