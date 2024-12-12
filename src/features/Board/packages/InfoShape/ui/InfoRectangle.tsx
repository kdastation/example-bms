import { Controller, useForm } from 'react-hook-form'

import { Flex } from '@shared/ui/Flex'
import { NumberInput } from '@shared/ui/Inputs/NumberInput'

type Values = {
  width: number
  height: number
  fill: string
  rotation: number
}

type Props = {
  values: Values

  onSave?: (values: Values) => void
}

export const InfoRectangle = ({ values, onSave }: Props) => {
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
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return <NumberInput minValue={0} value={value ?? values.width} onChange={onChange} />
          }}
          name={'width'}
        />

        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return <NumberInput minValue={0} value={value ?? values.height} onChange={onChange} />
          }}
          name={'height'}
        />

        <input type='color' {...register('fill')} defaultValue={values.fill} />

        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return <NumberInput value={value ?? values.rotation} onChange={onChange} />
          }}
          name={'rotation'}
        />

        {isDirty && <button type={'submit'}>Сохранить изменения</button>}
      </form>
    </Flex>
  )
}
