import { Controller, useForm } from 'react-hook-form'

import { Flex } from '@shared/ui/Flex'
import { NumberInput } from '@shared/ui/Inputs/NumberInput'

type Values = {
  width: number
  height: number
  rotation: number
  src: string
}

type Props = {
  values: Values

  onSave?: (values: Values) => void
}

export const InfoImage = ({ values, onSave }: Props) => {
  const {
    handleSubmit,
    formState: { isDirty },
    control,
  } = useForm<Values>({})

  return (
    <Flex asChild direction={'column'} gap={12} align={'start'}>
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values)
          onSave?.(values)
        })}
      >
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <NumberInput
                minValue={0}
                type='number'
                value={value ?? values.width}
                onChange={onChange}
              />
            )
          }}
          name={'width'}
        />

        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return <input type='text' value={value ?? values.src} onChange={onChange} />
          }}
          name={'src'}
        />

        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <NumberInput
                minValue={0}
                type='number'
                value={value ?? values.height}
                onChange={onChange}
              />
            )
          }}
          name={'height'}
        />

        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <NumberInput type='number' value={value ?? values.rotation} onChange={onChange} />
            )
          }}
          name={'rotation'}
        />

        {isDirty && <button type={'submit'}>Сохранить изменения</button>}
      </form>
    </Flex>
  )
}
